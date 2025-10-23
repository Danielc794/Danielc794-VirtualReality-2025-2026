class house{
  constructor(x,z){
    this.obj = document.createElement("a-entity");

    let base = document.createElement("a-box");
    base.setAttribute("color","beige");
    base.setAttribute("depth","2");
    base.setAttribute("height","1");
    base.setAttribute("width","2");
    base.setAttribute("position","0 0.5 0");
    this.obj.append( base );

    let roof = document.createElement("a-cone");
    roof.setAttribute("color","red");
    roof.setAttribute("height","1");
    roof.setAttribute("radius-bottom","1.5");
    roof.setAttribute("position","0 1.5 0");
    this.obj.append( roof );

    this.obj.setAttribute("position",{x:x, y:0.5, z:z});
    scene.append( this.obj )
  }
}
