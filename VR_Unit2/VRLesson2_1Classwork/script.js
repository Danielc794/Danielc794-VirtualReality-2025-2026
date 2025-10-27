window.addEventListener("DOMContentLoaded",function() {
  //Challenge 1: Create a variable scene for the <a-scene> component in the HTML
  let scene = document.querySelector("a-scene");

  //Challenge 2: Create a variable for <a-dodecahedron> and create it.
  let dodecahedron = document.createElement("a-dodecahedron");
  
  //Challenge 3: Change the <a-dodecahedron>'s position, radius and color
  dodecahedron.setAttribute("position", {x: 0, y: 2, z: -5});
  dodecahedron.setAttribute("radius", 1);
  dodecahedron.setAttribute("color", "blue");

  //Challenge 4: Add the <a-dodecahedron> to the scene
  scene.appendChild(dodecahedron);

  /* Challenge Bonus
  1) Use a for loop to create a lot of <a-dodecahedron> 
  2) Change each <a-dodecahedron>'s position to a random x, y, and z location
  3) Change each <a-dodecahedron>'s to a random color.  Hint: Use rgb( ) and string interpolation 
  */
  for (let i = 0; i < 20; i++) {
    let dodecahedron = document.createElement("a-dodecahedron");
    let randomX = Math.random() * 20 - 10; // Random x between -10 and 10
    let randomY = Math.random() * 10;       // Random y between 0 and 10
    let randomZ = Math.random() * -20;      // Random z between -20 and 0
    dodecahedron.setAttribute("position", {x: randomX, y: randomY, z: randomZ});
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    dodecahedron.setAttribute("color", `rgb(${r}, ${g}, ${b})`);
    scene.appendChild(dodecahedron);
  }
  

})