var table = document.getElementById('star_table');
var stars = table.getElementsByTagName('img');
var url = '/collaboration';
var params = "/collaboration";
var id;
var status;

table.addEventListener("click", setParams, false);
setInterval(setStars, 1000);


function setParams(event) {
  if(event.target.tagName !== 'IMG') return;
    for(var i = 0; i<100; i++){
      if(event.target === stars[i]){
      id = i;
      }
    }
     if(event.target.getAttribute('SRC') === "star_off.gif"){
      status = 1;
     }
      else {
        status = 0;
      }
   params =  'n=' + encodeURIComponent(id) +
  '&s=' + encodeURIComponent(status);
   setStars();
}

function setStars(){
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(params);
  xhr.onreadystatechange = function() {
      if (this.readyState != 4) return;
    if (this.status != 200) {
      alert( 'ошибка: ' + (this.status ? this.statusText : 'запрос не удался'));
      return;
    }
    for(var i = 0; i<100; i++){
      if(xhr.response[i] == 0){
        stars[i].setAttribute ("src", "star_off.gif");
      }
      if(xhr.response[i] == 1){
        stars[i].setAttribute ("src", "star_on.gif");
      }
    }
  }
}



