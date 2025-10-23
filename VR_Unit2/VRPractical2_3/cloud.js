class Cloud{
  constructor(x,y,z){
    this.obj = document.createElement("a-entity");

    let puff1 = document.createElement("a-sphere");
    puff1.setAttribute("color","white");
    puff1.setAttribute("position","0 0 0");
    puff1.setAttribute("radius","1");
    this.obj.append( puff1 );

    let puff2 = document.createElement("a-sphere");
    puff2.setAttribute("color","white");
    puff2.setAttribute("position","1 0.5 0");
    puff2.setAttribute("radius","1.25");
    this.obj.append( puff2 );

    let puff3 = document.createElement("a-sphere");
    puff3.setAttribute("color","white");
    puff3.setAttribute("position","-1 0.5 0");
    puff3.setAttribute("radius","1");
    this.obj.append( puff3 );

    this.obj.setAttribute("position",{x:x, y:y, z:z});
    scene.append( this.obj )
}
}