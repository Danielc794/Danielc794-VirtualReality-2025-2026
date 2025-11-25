class Car{
    constructor(x, y, z){  
        this.x = x;
        this.y = y;
        this.z = z;
        this.dx = 0.1;
        this.move = false;
        this.obj = document.getElementById("car").cloneNode(true);

        this.obj.addEventListener("click",()=>{
            console.log("Car clicked");
            this.move = true;
        });

        this.obj.setAttribute("position", {x: this.x, y: this.y, z: this.z});
        scene.append(this.obj);
    }

    drive(){
        if(this.move){
            this.x += this.dx;
            this.obj.setAttribute("position", {x: this.x, y: this.y, z: this.z});
        }
    }

}