let scene, car1;


window.addEventListener("DOMContentLoaded",function() {
  scene = document.querySelector("a-scene")
  car1 = new Car(-4,0,-5);


      
  loop();
})

function loop(){
  car1.drive();
    
  window.requestAnimationFrame(loop);
}