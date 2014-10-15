function iniciar(){
  var estado = document.getElementById("estado").innerHTML;
  if(estado === "0"){
      document.getElementById("estado").innerHTML="1";
      document.getElementById("desligarbuzzer").style.display = "";
  } else {
      document.getElementById("estado").innerHTML="0";
      document.getElementById("ligarbuzzer").style.display = "";
  }

  /*var xmlhttp;
  if (window.XMLHttpRequest) {
    xmlhttp=new XMLHttpRequest();
  } else {
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      if(xmlhttp.responseText == "0"){

      }
    }
  }

  var password = document.getElementById("password").value;
  if(password == ""){
    password = "0000"
  }
  var url = "http://schroeder-arduino.herokuapp.com/schroeder/autenticar/" + password;
  url = url + "?acao=Entrou%20no%20escrit%C3%B3rio";
  xmlhttp.open("GET", url, true);
  xmlhttp.send();*/

}

function acao(acao, descricao){
  alert(descricao);
  window.location.href = acao;
};