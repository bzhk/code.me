
document.getElementById('menuBtn').addEventListener("click", function(){
  var menu = document.getElementById('m-menu');
  if(menu.classList.contains('slide_Down')){
    menu.classList.remove('slide_Down')
    menu.classList.add('slide_Up')
  }else{
    menu.classList.remove('slide_Up')
    menu.classList.add('slide_Down')

  }
});
