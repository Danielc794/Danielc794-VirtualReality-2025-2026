class Rocket{
  constructor(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;
    this.a = 0;
    this.da = 0.001;

    this.obj = document.createElement("a-entity");
    
    let body = document.createElement("a-cylinder");
    body.setAttribute("position", `${x} ${y} ${z}`);
    body.setAttribute("radius", "0.1");
    body.setAttribute("height", "1");
    body.setAttribute("color", "#FF0000");
    this.obj.append(body);
    
    let nose = document.createElement("a-cone");
    nose.setAttribute("position", `${x} ${y + 0.5} ${z}`);
    nose.setAttribute("radius-bottom", "0.1");
    nose.setAttribute("height", "0.3");
    nose.setAttribute("color", "#FFFF00");
    this.obj.append(nose);

    this.obj.setAttribute("position",{x:x, y:y, z:z});
    scene.append( this.obj )
  }

    launch(){
    this.a += this.da;
    this.obj.setAttribute("position", {x:0, y:this.a, z:0});
    }

}
