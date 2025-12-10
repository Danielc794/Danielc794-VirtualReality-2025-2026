let scene, car1, ufo;


window.addEventListener("DOMContentLoaded",function() {
  scene = document.querySelector("a-scene")
  car1 = new Car(-4,0,-5);
  ufo = new Ufo(0,15,-10,0.01);

      
  loop();
})

function loop(){
  car1.drive();
  ufo.invade();
    
  window.requestAnimationFrame(loop);
}