function iniciar(){
  var estado = document.getElementById("estado").innerHTML;
  if(estado === "0"){
      document.getElementById("estado").innerHTML="1";
      document.getElementById("desligarbuzzer").style.display = "";
  } else {
      document.getElementById("estado").innerHTML="0";
      document.getElementById("ligarbuzzer").style.display = "";
  }
}

function acao(local, acao){
  var xmlhttp;
  if (window.XMLHttpRequest) {
    xmlhttp=new XMLHttpRequest();
  } else {
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      if(xmlhttp.responseText == "0"){
        return alert('Senha inválida!');
      }
      if(xmlhttp.responseText == "1"){
        window.location.href = local;
      }
    }
  }

  var password = document.getElementById("password").value;
  if(password == ""){
    return alert('Senha inválida!');
  }
  var url = 'http://schroeder-arduino.herokuapp.com/schroeder/autenticar/' + password;
  url = url + '?acao=' + acao;
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

function buzzerOn(){
   acao('/?ligar', 'Ligou o buzzer.');
};

function buzzerOff(){
  acao('/?desligar', 'Desligou o buzzer.');
};