function iniciar(){
  var estado = document.getElementById("estado").innerHTML;
  if(estado === "0"){
      document.getElementById("estado").innerHTML="1";
      document.getElementById("desligarrele").style.display = "";
  } else {
      document.getElementById("estado").innerHTML="0";
      document.getElementById("ligarrele").style.display = "";
  }

  var xmlhttp;
  if (window.XMLHttpRequest) {
    xmlhttp=new XMLHttpRequest();
  } else {
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }

  xmlhttp.onreadystatechange = function() {
    //if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      console.log(xmlhttp.responseText);
    //}
  }

  xmlhttp.open("GET", "http://schroeder-arduino.herokuapp.com/schroeder/autenticar/S?acao=Entrou%20no%20escrit%C3%B3rio", true);
  xmlhttp.send();

}

function acao(acaoExecutar){
  alert(acaoExecutar);
};