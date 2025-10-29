let rnd = (l,u) => Math.floor(Math.random()*(u-l) + l);
let scene;

window.addEventListener("DOMContentLoaded",function() {
  scene = document.querySelector("a-scene"); 
  for(let i=0; i<100; i++){
		let rocket = new Rocket(rnd(-50,50), rnd(-1,-5), rnd(-50,50));
		scene.appendChild(rocket.obj);
	}

  loop();
})

function loop(){

  for(let rocket of rockets){
    rocket.launch();
  }

  window.requestAnimationFrame( loop );
}
