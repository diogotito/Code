# DESENHAR UM RECTA QUE PASSE EM DOIS PONTOS DISTINTOS 
# NOTA: SE OS PONTOS FOREM IGUAIS DESENHA UM PONTO

import pygame, sys
from random import randint

#COMEÇAR PYGAME
pygame.init()

#DEFINIR AS CONSTANTES
SCREEN_SIZE = ( 600 , 600 )
SCREEN_MIDLE = ( SCREEN_SIZE[0] / 2 , SCREEN_SIZE[1] / 2 )

#CORES EM RGB E CONVERSOR DE HEX PARA RGB FEITO PELO TITO
#A LISTA SERVE PARA ESCOLHER UMA COR AO ACASO MAIS TARDE
class Cores:
    preto     = (0,0,0)
    branco    = (255,255,255)
    vermelho  = (255,0,0)
    verde     = (0,255,0)
    azul      = (0,0,255)
    mangenta  = (255,0,255)
    amarelo   = (255,255,0)
    ciano     = (0,255,255)
    lista     = [preto,branco,vermelho,verde,azul,mangenta,ciano,amarelo]

    def hex_to_rgb (color):
        return color >> 16, (color & 0x00FF00) >> 8, color & (0x0000FF)

#FUNÇÃO PARA A RECTA A PASSAR POR 2 PONTOS
def Recta ( surface , color , pointA , pointB , width ):
    vectorAB = ( pointB[0] - pointA[0] , pointB[1] - pointA[1])
    endpoint, point = ( 0 , 0 ), ( 0 , 0 )
    if(vectorAB == ( 0 , 0 )):
        point = pointA
        endpoint = pointA
    elif vectorAB[0]==0:
        point = ( pointA[0] , 0 )
        endpoint = ( pointA[0] , SCREEN_SIZE[1] )
    elif vectorAB[1]==0:
        point = ( 0 , pointA[1] )
        endpoint = ( SCREEN_SIZE[0] , pointA[1] )
    else:
        k = 1
        while point == ( 0 , 0 ):
            if( pointA[0] - vectorAB[0]*k <= 0 or pointA[0] - vectorAB[0]*k >= SCREEN_SIZE[0] ):
                point = ( pointA[0] - vectorAB[0]*k , pointA[1] - vectorAB[1]*k )
            k+=1
        k=1
        while endpoint == ( 0 , 0 ):
            if( pointA[0] + vectorAB[0]*k <= 0 or pointA[0] + vectorAB[0]*k >= SCREEN_SIZE[0]):
                endpoint = ( pointA[0] + vectorAB[0]*k , pointA[1] + vectorAB[1]*k )
            k+=1
    return pygame.draw.line ( ecran, color, point, endpoint, width )

ecran = pygame.display.set_mode ( SCREEN_SIZE )
pygame.display.set_caption('Doodling with pygame')

#VARIAVEL i PARA DEPOIS MEXER NA LISTA doodling
i=0
doodling = []
#doodling = [
#    [(10,100),(10,300)],
#    [(200,500),(250,500)],
#    [(400,400),(600,700)]
#    ]
for e in range(0,SCREEN_SIZE[0],5):
    doodling.append([(0,SCREEN_SIZE[0]-e),(e,0)])
for e in range (10,SCREEN_SIZE[0],10):
    doodling.append([(e,e),(e,e)])
    
#A LISTA TEM VÁRIAS LISTAS LÁ DENTRO COM 2 TUPLES
#CADA TUPLE É UM PONTO E AS LISTAS SERVEM PARA MAIS TARDE DESENHAR AS RECTAS A PASSAREM POR ESSES DOIS PONTOS

while 1:
    for e in pygame.event.get():
        if e.type == pygame.QUIT:
            pygame.quit()
            sys.exit()
    #DESENHAR UMA RECTA QUE PASSA PELO CENTRO E PELA POSIÇÃO DO RATO
    Recta ( ecran , Cores.lista[randint(1,len(Cores.lista)-1)], SCREEN_MIDLE , pygame.mouse.get_pos() , 4)
    #DESENHAR O QUE ESTÁ EM doodling
    if( i<len(doodling)):
        pontos = doodling[i]
        Recta ( ecran, Cores.lista[randint(1,len(Cores.lista)-1)], pontos[0] , pontos[1] , 1)
        pygame.draw.line(ecran,Cores.branco, pontos[0],pontos[0], 4)
        pygame.draw.line(ecran,Cores.branco, pontos[1],pontos[1], 4)
        i+=1
        
    pygame.display.flip()
    pygame.time.delay( int( (1000/52)+(5/9) ) ) 
    #5/9 serve para arredondar o valor correctamente 5/9 = 0.(5) - By Almiro and that other strange guy with a name of a tree