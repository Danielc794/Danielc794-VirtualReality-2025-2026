let rnd = (l,u) => Math.random() * (u-l) + l
let scene, camera, bullet = [], enemies = [], ammo_boxes = [], ammo_count = 5, enemy_killed = 0, game_time = 60;

window.addEventListener("DOMContentLoaded",function() {
  scene = document.querySelector("a-scene");
  camera = document.querySelector("a-camera");

  window.addEventListener("keydown",function(e){
    //User can only fire with they press the spacebar and have sufficient ammo
    if(e.key == " " && ammo_count > 0  ){
      let b = new Bullet();
      bullet.push(b);
      ammo_count--;
    }
  })

  //snowmans
  for(let i = 0; i < 50; i++){
    let x = rnd(-40,40);
    let z = rnd(-40,40);
    let snowman = new Snowman(x,z);
    enemies.push(snowman);
  }

  //ammo boxes
  for(let i = 0; i < 25; i++){
    let x = rnd(-30,30);
    let z = rnd(-30,30);
    let ammo = new Ammo(x,z);
    ammo_boxes.push(ammo);
  }

  setTimeout(loop,100);
  setTimeout(countdown,100);
})

function loop(){
  //bullet movement and collision detection
  for(let i = bullet.length - 1; i >= 0; i--){
    let b = bullet[i];
    b.fire();
    let hit = false;
    //check for collision with enemies
    for(let j = enemies.length - 1; j >= 0; j--){
      let snowman = enemies[j];
      let d = distance(b.obj,snowman.obj);
      if(d < 2.5){
        //remove enemy and bullet from scene
        scene.removeChild(snowman.obj);
        scene.removeChild(b.obj);
        enemies.splice(j,1);
        enemy_killed++;
        hit = true;
        break;
      }
    }
    if(!hit){
      let camera = document.querySelector("a-camera");
      let range = distance(b.obj,camera);
      if(range > 300){
        scene.removeChild(b.obj);
        bullet.splice(i,1);
      }
    }
    if(hit){
      bullet.splice(i,1);
    }
  }

  //check for collision and click with ammo boxes
  for(let i = ammo_boxes.length - 1; i >= 0; i--){
    let box = ammo_boxes[i];
    let d = distance(camera,box.obj);
    box.obj.addEventListener("click",function(){
      if(d < 5){
        scene.removeChild(box.obj);
        ammo_boxes.splice(i,1);
        ammo_count += 3;
      }
    })
  }
 
  window.requestAnimationFrame(loop);
}

function countdown(){
  game_time--;
  let hud = document.querySelector("#hud");
  if(hud){
    hud.setAttribute("text","value: Ammo: " + ammo_count + " | Killed: " + enemy_killed + " | Time: " + game_time);
  }
  if(game_time > 0){
    setTimeout(countdown,1000);
  } else {
    alert("Game Over! Enemies killed: " + enemy_killed);
  }
}

function distance(obj1,obj2){
  let x1 = obj1.object3D.position.x;
  let y1 = obj1.object3D.position.y;
  let z1 = obj1.object3D.position.z;
  let x2 = obj2.object3D.position.x;
  let y2 = obj2.object3D.position.y;
  let z2 = obj2.object3D.position.z;

  let d = Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2) + Math.pow(z1-z2,2));
  return d;
}