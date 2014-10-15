#include <SPI.h>
#include <Ethernet.h>

byte mac[] = { 0x90, 0xA2, 0xDA, 0x00, 0x9B, 0x36 };
byte ip[] = { 192, 168, 0, 99 };
byte gateway[] = { 192, 168, 0, 1 };
byte subnet[] = { 255, 255, 255, 0 };
EthernetServer server(80);

String readString;

const int buzzer = 9; 
boolean ligado = true;

void setup(){

  pinMode(buzzer, OUTPUT);
  Ethernet.begin(mac, ip, gateway, subnet);
  server.begin();
  Serial.begin(9600);
}

void loop(){
  EthernetClient client = server.available();
  if (client) {
    while (client.connected()) {
      if (client.available()) {
        char c = client.read();
        if (readString.length() < 100) {
          readString += c;
        }
        if (c == '\n') {
          if(readString.indexOf("?ligar") >0) {
            tone(buzzer,1500);   
            ligado = false;
          }
          else{
            if(readString.indexOf("?desligar") >0){
              noTone(buzzer);              
              ligado = true;
            }
          }
          readString="";
          client.println("HTTP/1.1 200 OK"); //send new page
          client.println("Content-Type: text/html");
          client.println();

          client.println("<html>");
          client.println("<head>");
          client.println("<title>RoboCore - Remote Automation</title>");
          client.println("<meta http-equiv='Content-Type' content='text/html; charset=ISO-8859-1'>");
          client.println("<link rel='stylesheet' type='text/css' href='http://www.robocore.net/upload/projetos/RemoteAutomationV1.0.css' />");
          client.println("<script type='text/javascript' src='http://www.robocore.net/upload/projetos/RemoteAutomationV1.0.js'></script>");
          client.println("</head>");
          client.println("<body>");
          client.println("<div id='wrapper'>RoboCore Remote Automation V1.1");
          client.print("<div id='rele'></div><div id='estado' style='visibility: hidden;'>");
          client.print(ligado);
          client.println("</div>");
          client.println("<div id='botao'></div>");
          client.println("</div>");
          client.println("<script>AlteraEstadoRele()</script>");
          client.println("</body>");
          client.println("</head>");

          delay(1);
          //stopping client
          client.stop();



        }
      }
    }
  }
}

