let open = false;
function trigger(){
  if(open === true){
    open = false;

    document.getElementById('cover').style.display = "none";
    document.getElementById('sidenav').style.left = "-50vw";
  } else {
    open = true;

    document.getElementById('cover').style.display = "block";
    document.getElementById('sidenav').style.left = "0";
  }
}

document.onclick = (e) => {
  if(open === true){
    if(e.target.id != "sidenav"){
      trigger();
    }
  }

  if(e.target.id === 'open'){
    trigger();
  }
}