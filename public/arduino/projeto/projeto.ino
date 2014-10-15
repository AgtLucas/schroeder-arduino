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
          if(readString.indexOf("?ligar") > 0) {
            tone(buzzer,1500);
            ligado = false;
          }
          else{
            if(readString.indexOf("?desligar") > 0){
              noTone(buzzer);
              ligado = true;
            }
          }
          readString="";
          client.println("HTTP/1.1 200 OK");
          client.println("Content-Type: text/html");
          client.println();
          client.println("<html n>");
          client.println("<head>");
          client.println("<meta charset='utf-8'>");
          client.println("<title>Arduino</title>");
          client.println("<meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1'>");
          client.println("<meta name='viewport' content='width=device-width, initial-scale=1'>");
          client.println("<link rel='stylesheet' type='text/css' href='http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css' />");
          client.println("<script type='text/javascript' src='http://schroeder-arduino.herokuapp.com/arduino/js/app.js'></script>");
          client.println("</head>");
          client.println("<body>");
          client.println("<div class='container'>");
          client.println("<div class='row'>");
          client.println("<div class='col-lg-4 text-center'>");
          client.println("</div>");
          client.println("<div class='col-lg-4 text-center'>");
          client.println("<h1><input type='password' class='form-control text-center' value='' id='password' placeholder='Senha do cliente'></h1>");
          client.println("</div>");
          client.println("<div class='col-lg-4 text-center'>");
          client.println("</div>");
          client.println("</div>");
          client.println("<div class='row'>");
          client.println("<div class='col-lg-4 text-center'>");
          client.println("</div>");
          client.println("<div class='col-lg-4 text-center'>");
          client.println("<h1>Buzzer</h1>");
          client.println("<a class='btn btn-lg btn-success' href='javascript:buzzerOn()' id='ligarbuzzer' style='display: none'><i class='glyphicon glyphicon-thumbs-up'></i>&nbsp;&nbsp;Ligar</a>");
          client.println("<a class='btn btn-lg btn-danger' href='javascript:buzzerOff()' id='desligarbuzzer' style='display: none'><i class='glyphicon glyphicon-off'></i>&nbsp;&nbsp;Desligar</a>");
          client.println("</div>");
          client.println("<div class='col-lg-4 text-center'>");
          client.println("</div>");
          client.println("</div>");
          client.println("</div>");
          client.print("<div id='rele'></div><div id='estado' style='visibility: hidden;'>");
          client.print(ligado);
          client.println("</div>");
          client.println("<div id='botao'></div>");
          client.println("<script>iniciar()</script>");
          client.println("</body>");
          client.println("</head>");
          delay(100);
          client.stop();
        }
      }
    }
  }
}
