
let data,songs;
function init(){
  $.ajaxSetup({async: false});
  
  let link= "http://localhost:8500"
  let route= "/songs";
  let songs = $.getJSON(link+route).responseJSON;
  
  generateCards(songs);
}


  // b) Write a function that accepts an array of JSON that contains song information, generates an info card for each track(song) and displays them on the webpage. Invoke(call) this function within the init() after getting the data. (See picture "WebPagePicture.PNG" to determine the types of HTML elements to use).
function generateCards(songs){
  let output = document.getElementById("output");
  let build ="";

  for(let i=0; i<songs.length; i++){
    let song = songs[i];
    build += `<div class="card" >`;
    build +=   `<h2>Song Name</h2>`;
    build +=   `<p>${song.Name}</p>`;
    build +=   `<h3> Album </h3>`;
    build +=   `<p>${song.Title}</p>`;
    build +=   `<h3> Composer </h3>`;
	  build +=   `<p>${song.Composer}</p>`;
	  build +=   `<hr>`;
    build += `</div>`;
  }

  output.innerHTML = build;
}
 





