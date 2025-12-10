class Ammo{
  constructor(x,z){
    this.obj = document.createElement("a-entity");
    this.obj.setAttribute("position",{x:x,y:0.5,z:z});
    
    // Main box body
    let body = document.createElement("a-box");
    body.setAttribute("position",{x:0,y:0,z:0});
    body.setAttribute("width",1.2);
    body.setAttribute("height",0.8);
    body.setAttribute("depth",1.2);
    body.setAttribute("color","#DAA520");
    this.obj.appendChild(body);
    
    // Box lid (top)
    let lid = document.createElement("a-box");
    lid.setAttribute("position",{x:0,y:0.5,z:0});
    lid.setAttribute("width",1.25);
    lid.setAttribute("height",0.15);
    lid.setAttribute("depth",1.25);
    lid.setAttribute("color","#B8860B");
    this.obj.appendChild(lid);
    
    // Metal corners (4)
    for(let i = 0; i < 4; i++){
      let corner = document.createElement("a-box");
      let cx = (i % 2 === 0) ? -0.5 : 0.5;
      let cz = (i < 2) ? -0.5 : 0.5;
      corner.setAttribute("position",{x:cx,y:0,z:cz});
      corner.setAttribute("width",0.15);
      corner.setAttribute("height",0.85);
      corner.setAttribute("depth",0.15);
      corner.setAttribute("color","#696969");
      this.obj.appendChild(corner);
    }
    
    // Label plate (front)
    let label = document.createElement("a-box");
    label.setAttribute("position",{x:0,y:0,z:0.62});
    label.setAttribute("width",0.8);
    label.setAttribute("height",0.4);
    label.setAttribute("depth",0.02);
    label.setAttribute("color","#FFFACD");
    this.obj.appendChild(label);
    
    // Handle (top)
    let handle = document.createElement("a-cylinder");
    handle.setAttribute("position",{x:0,y:0.55,z:0});
    handle.setAttribute("radius",0.08);
    handle.setAttribute("height",0.4);
    handle.setAttribute("rotation",{x:90,y:0,z:0});
    handle.setAttribute("color","#8B4513");
    this.obj.appendChild(handle);
    
    this.classList = "ammo_box";
    scene.appendChild(this.obj);
  }
}