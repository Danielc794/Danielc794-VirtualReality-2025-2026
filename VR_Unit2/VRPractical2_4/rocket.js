class Rocket{
  constructor(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;
    this.a = 0;
    this.da = 0.01;

    this.obj = document.createElement("a-entity");
    
    let body = document.createElement("a-cylinder");
    body.setAttribute("position", `0 -1.5 -2`);
    body.setAttribute("radius", "0.5");
    body.setAttribute("height", "2");
    body.setAttribute("color", "gray");
    this.obj.append(body);
    
    let nose = document.createElement("a-cone");
    nose.setAttribute("position", `0 0 -2`);
    nose.setAttribute("radius-bottom", "0.5");
    nose.setAttribute("radius-top", "0");
    nose.setAttribute("height", "1");
    nose.setAttribute("color", "red");
    this.obj.append(nose);

    this.obj.setAttribute("position",{x:x, y:y, z:z});
    scene.append( this.obj )
  }

    launch(){
    this.a += this.da;
    this.obj.setAttribute("position", {x:0, y:this.a, z:0});
    }

}
