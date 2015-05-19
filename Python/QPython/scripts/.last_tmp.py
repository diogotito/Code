#-*-coding:utf8;-*-
#qpy:2
#qpy:console

from PIL import Image

img = Image.open("/sdcard/PC/oxygen.png")
pixels = [0]

#map(pixels.append, filter(lambda pix: pix != pixels[-1] and pix[0] == pix[1] == pix[2] , map(lambda pos: img.getpixel(pos)[0], zip(range(0,629), [50]*629))))

print len([pixels.append(p[0]) for p in [img.getpixel((x,50)) for x in range(0,629,1)] if p[0] != pixels[-1] and p[0] == p[1] == p[2]])

#print pixels
such_smart = ''.join(map(chr, pixels[1:]))
print such_smart
#print "".join(map(chr, eval(such_smart[such_smart.find('['):])))
lvl = eval(such_smart[such_smart.find('['):])
print ''.join(chr(c) if c >= 100 else chr(c+100) for c in lvl)