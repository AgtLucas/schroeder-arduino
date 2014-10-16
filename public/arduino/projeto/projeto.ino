#include <SPI.h>
#include <Ethernet.h>

byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
IPAddress ip(192,168,0,50);
EthernetClient client;
char server[] = "schroeder-arduino.herokuapp.com/";
unsigned long lastConnectionTime = 0;
boolean lastConnected = false;
const unsigned long postingInterval = 6000;

int passou = 0;
String retorno = "";

//Posiçao dos sensores
const int idBuzzer = 0;

//Serial
const int Buzzer = 9;


void setup() {
  Serial.begin(9600);
  delay(1000);
  Ethernet.begin(mac, ip);
}
void loop() {
  String teste = "1-false;2-false";
  if(getValue(getValue(teste, ';', idBuzzer), '-', 1) == "true"){
    tone(Buzzer,1500);
  }else{
    noTone(Buzzer);
  }
  if (client.available()) {
    char c = client.read();
    Serial.println(c);
    if(c == '>'){
      passou = 0;
    }
    if(passou == 1){
      Serial.print(c); 
      retorno = retorno + c;
    } 
    if(c == '<'){
      passou = 1;
    }
  }
  if (!client.connected() && lastConnected) {
    Serial.println(retorno);
    retorno = "";
    client.stop();
  }
  if(!client.connected() && (millis() - lastConnectionTime > postingInterval)) {
    httpRequest();
  }
  lastConnected = client.connected();
}

void httpRequest() {
  if (client.connect(server, 80)) {
    String url = "/schroeder/configuracoes";
    client.println("GET " + url + " HTTP/1.0");
    client.println("Host: schroeder-arduino.herokuapp.com");
    client.println("Connection: close");
    client.println();

    lastConnectionTime = millis();
  }
}

String getValue(String data, char separator, int index){
  int found = 0;
  int strIndex[] = {
  0, -1  };
  int maxIndex = data.length()-1;
  for(int i=0; i<=maxIndex && found<=index; i++){
  if(data.charAt(i)==separator || i==maxIndex){
  found++;
  strIndex[0] = strIndex[1]+1;
  strIndex[1] = (i == maxIndex) ? i+1 : i;
  }
 }
  return found>index ? data.substring(strIndex[0], strIndex[1]) : "";
}
