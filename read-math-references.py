import zipfile,xml.etree.ElementTree as E,pathlib,re,json,sys,zlib,struct,importlib.util
sys.stdout.reconfigure(encoding='utf-8')
root=pathlib.Path('C:/Users/mkoli/Downloads');out=pathlib.Path('outputs/school-escape/docs')
p=root/'(2학년 수업놀이) 수학 3단원 5차시 - 미션수학암호.pptx'
rows=[]
with zipfile.ZipFile(p) as z:
 for f in sorted([n for n in z.namelist() if re.fullmatch(r'ppt/slides/slide\d+.xml',n)],key=lambda n:int(re.search(r'slide(\d+)',n)[1])):
  tree=E.fromstring(z.read(f));texts=[t.text for t in tree.iter() if t.tag.endswith('}t') and t.text]
  rows.append({'slide':int(re.search(r'slide(\d+)',f)[1]),'text':' | '.join(texts)})
(out/'math-ppt-extract.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2),encoding='utf8')
print('PPT SLIDES',len(rows))
for r in rows:print(r['slide'],r['text'][:1800])
print('OLEFILE_AVAILABLE',bool(importlib.util.find_spec('olefile')))
if importlib.util.find_spec('olefile'):
 import olefile
 p=root/'[8차시] 공부를 잘했는지 알아봅시다(암호문풀기).hwp'
 with olefile.OleFileIO(p) as ole:
  print('HWP_STREAMS',ole.listdir())
  header=ole.openstream('FileHeader').read();flags=struct.unpack_from('<I',header,36)[0];print('HWP_FLAGS',flags)
  texts=[]
  for name in ole.listdir():
   if len(name)==2 and name[0]=='BodyText' and name[1].startswith('Section'):
    data=ole.openstream(name).read()
    if flags&1:data=zlib.decompress(data,-15)
    pos=0
    while pos+4<=len(data):
     h=struct.unpack_from('<I',data,pos)[0];pos+=4;tag=h&1023;size=h>>20
     if size==4095:size=struct.unpack_from('<I',data,pos)[0];pos+=4
     payload=data[pos:pos+size];pos+=size
     if tag==67:
      text=payload.decode('utf-16le',errors='replace');text=re.sub(r'[\x00-\x1f]',' ',text);texts.append(text)
  text='\n'.join(texts);(out/'math-hwp-extract.txt').write_text(text,encoding='utf8');print('HWP_TEXT',text[:14000])
