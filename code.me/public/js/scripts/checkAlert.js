function checkAlert(){
  var msg = document.getElementById('flash-messages');
  if(msg){
    setTimeout(function(){
        msg.classList.add('hidee');
        setTimeout(function(){
          document.getElementById('body').removeChild(msg);
        },300)
    },3000)
  }
}
checkAlert();
