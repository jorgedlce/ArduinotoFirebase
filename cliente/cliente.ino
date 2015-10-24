int flama;
int humedad;
int alcohol;
int luz;
int distance;
void setup() {
        // Se establece la conexión serial
  Serial.begin(9600);
}
 
void loop(){
  //sensor de flama o fuego
  flama=analogRead(5); // Signal wire(green one) connect to analog pin 5. Red one connect to VCC and black one connect to GND.
  Serial.print(flama,DEC );
  
  //sensor de humedad
  humedad=analogRead(A0);
  Serial.print(",");    
  Serial.print(humedad);  

  //sensor de disancia
  float volts = analogRead(1)*0.0048828125;   // value from sensor * (5/1024) - if running 3.3.volts then change 5 to 3.3
  distance = 65*pow(volts, -1.10);          // worked out from graph 65 = theretical distance / (1/Volts)S - luckylarry.co.uk
  Serial.print(",");
  Serial.print(distance);                       

  //sensor de alcohol
  alcohol=analogRead(2); 
  Serial.print(",");
  Serial.print(alcohol);  
                       
  //sensor de luz ambiental
  luz=analogRead(3);
  Serial.print(",");
  Serial.println(luz);                       
  
  delay(1000);
}
