import pathlib,struct,zlib,re,sys
sys.stdout.reconfigure(encoding='utf-8')
p=pathlib.Path('C:/Users/mkoli/Downloads/[8차시] 공부를 잘했는지 알아봅시다(암호문풀기).hwp');data=p.read_bytes()
u=lambda b,o:struct.unpack_from('<I',b,o)[0]
ss=1<<struct.unpack_from('<H',data,30)[0];ms=1<<struct.unpack_from('<H',data,32)[0]
def sector(i):return data[(i+1)*ss:(i+2)*ss]
dif=list(struct.unpack_from('<109I',data,76));nextdif=u(data,68)
for _ in range(u(data,72)):
 block=sector(nextdif);dif+=list(struct.unpack_from('<%dI'%(ss//4-1),block));nextdif=u(block,ss-4)
fat=[]
for i in dif:
 if i<0xfffffffa:fat+=list(struct.unpack('<%dI'%(ss//4),sector(i)))
def chain(start,table,get):
 out=bytearray();seen=set()
 while start<0xfffffffa:
  if start in seen or start>=len(table):raise ValueError('bad chain')
  seen.add(start);out+=get(start);start=table[start]
 return bytes(out)
directory=chain(u(data,48),fat,sector);entries=[]
for offset in range(0,len(directory),128):
 d=directory[offset:offset+128];n=struct.unpack_from('<H',d,64)[0]
 if n>=2:entries.append({'name':d[:n-2].decode('utf-16le'),'type':d[66],'start':u(d,116),'size':struct.unpack_from('<Q',d,120)[0]})
root=next(e for e in entries if e['type']==5);mini=chain(root['start'],fat,sector)[:root['size']]
mf=chain(u(data,60),fat,sector);minifat=list(struct.unpack('<%dI'%(len(mf)//4),mf))
def read(e):return (chain(e['start'],minifat,lambda i:mini[i*ms:(i+1)*ms]) if e['size']<u(data,56) else chain(e['start'],fat,sector))[:e['size']]
print('STREAMS',[(e['name'],e['size']) for e in entries if e['type']==2])
header=read(next(e for e in entries if e['name']=='FileHeader'));compressed=u(header,36)&1;texts=[]
for e in entries:
 if e['type']==2 and e['name'].startswith('Section'):
  d=read(e);d=zlib.decompress(d,-15) if compressed else d;pos=0
  while pos+4<=len(d):
   h=u(d,pos);pos+=4;tag=h&1023;size=h>>20
   if size==4095:size=u(d,pos);pos+=4
   payload=d[pos:pos+size];pos+=size
   if tag==67:
    # HWP extended controls occupy eight UTF-16 units, not printable text.
    vals=list(struct.unpack('<%dH'%(len(payload)//2),payload));clean=[];i=0
    while i<len(vals):
     v=vals[i]
     if v<32:
      clean.append(' ');i+=8 if v in [1,2,3,11,12,14,15,16,17,18,19,20,21,22,23] else 1
     else:clean.append(chr(v));i+=1
    texts.append(''.join(clean))
text='\n'.join(texts);pathlib.Path('outputs/school-escape/docs/math-hwp-extract.txt').write_text(text,encoding='utf8');print(text[:18000])
