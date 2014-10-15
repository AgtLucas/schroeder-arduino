function iniciar(){
  var estado = document.getElementById("estado").innerHTML;
  if(estado === "0"){
      document.getElementById("estado").innerHTML="1";
      document.getElementById("desligarrele").style.display = "";
  } else {
      document.getElementById("estado").innerHTML="0";
      document.getElementById("ligarrele").style.display = "";
  }
};

function acao(acaoExecutar){
  alert(acaoExecutar);
};