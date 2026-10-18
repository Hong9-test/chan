import zipfile,xml.etree.ElementTree as E,json,re,pathlib,sys
sys.stdout.reconfigure(encoding='utf-8')
root=pathlib.Path(r'C:/Users/mkoli/Downloads')
names=['[2024ver.] 안전 1학년 3단원[낯선사람] 정리게임.pptx','재난대피훈련(화재, 지진)+생존가방_시뮬레이션 게임.pptx','화재, 지진 탈출게임.pptx','[2024ver.] 1학년 안전 총정리 - 크리스마스 탈출 게임.pptx']
ns={'a':'http://schemas.openxmlformats.org/drawingml/2006/main','p':'http://schemas.openxmlformats.org/presentationml/2006/main'}
result=[]
for name in names:
 with zipfile.ZipFile(root/name) as z:
  slides=[]
  for f in sorted([s for s in z.namelist() if re.fullmatch(r'ppt/slides/slide\d+.xml',s)],key=lambda s:int(re.search(r'slide(\d+)',s)[1])):
   tree=E.fromstring(z.read(f));rels={};rf=f.replace('slides/','slides/_rels/')+'.rels'
   if rf in z.namelist():
    for r in E.fromstring(z.read(rf)):rels[r.attrib['Id']]=r.attrib.get('Target','')
   blocks=[]
   for shape in tree.findall('.//p:sp',ns):
    text=' '.join(t.text or '' for t in shape.findall('.//a:t',ns));links=[]
    for h in shape.findall('.//a:hlinkClick',ns):
     rid=h.attrib.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id');links.append(rels.get(rid,h.attrib.get('action','')))
    if text or links:blocks.append({'text':text,'links':links})
   slides.append({'slide':int(re.search(r'slide(\d+)',f)[1]),'blocks':blocks})
  result.append({'file':name,'count':len(slides),'slides':slides})
out=pathlib.Path('outputs/school-escape/docs/reference-extract.json');out.write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf8')
for deck in result:
 print('\nFILE',deck['file'],'SLIDES',deck['count'])
 for s in deck['slides']:
  text=' / '.join(b['text'] for b in s['blocks']);links=[(b['text'][:70],b['links']) for b in s['blocks'] if b['links']]
  if s['slide']<14 or len(links)>1 or re.search('성공|엔딩|탈출|실패|가방|획득',text):
   print(s['slide'],text[:220],('LINKS '+str(links)[:350]) if links else '')
