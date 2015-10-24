__author__ = 'JORGELUIS'
#!/usr/bin/python

# Importamos la libreira de PySerial
import serial
import datetime

from firebase.firebase import FirebaseApplication, FirebaseAuthentication

# Abrimos el puerto del arduino a 9600
PuertoSerie = serial.Serial('COM14', 9600)

SECRET = '0N3Ti2UVYXMvsNMyJSbHvAVxTcqdldSg3Bb4CW4C'
DSN = 'https://ejemplox.firebaseio.com'
EMAIL = 'jorgeluisdc_07@hotmail.com'
authentication = FirebaseAuthentication(SECRET,EMAIL, True, True)
firebase = FirebaseApplication(DSN, authentication)

# Creamos un buble sin fin
while 1:

  try:
    # leemos hasta que encontarmos el final de linea
    tupla = PuertoSerie.readline()
    # Eliminamos el salto de linea del final
    tupla= tupla.rstrip('\n')

    time=datetime.datetime.now()
    #print(time);
    #dividir en ,
    cadena=tupla.split(",")
    data = {'flama': int(cadena[0]),'humedad': int(cadena[1]),'distancia':int(cadena[2]),'alcohol':int(cadena[3]), 'hora': int(cadena[1]),'luz':int(cadena[4]),'time':time}
    #el snapshot te devuelve el valor id de firebase del dato enviado
    snapshot = firebase.post('/datos', data)
  except:
   print('Data could not be read')