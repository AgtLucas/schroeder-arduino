#include <SPI.h>
#include <Ethernet.h>

byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
IPAddress ip(192,168,0,50);
EthernetClient client;
char server[] = "schroeder-arduino.herokuapp.com/";
unsigned long lastConnectionTime = 0;
boolean lastConnected = false;
const unsigned long postingInterval = 6000;

void setup() {
  Serial.begin(9600);
  delay(1000);
  Ethernet.begin(mac, ip);
  Serial.println(Ethernet.localIP());
}

void loop() {
  if (client.available()) {
    char c = client.read();
    Serial.print(c);
  }
  if (!client.connected() && lastConnected) {
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
