const API_KEY = import.meta.env.VITE_NASA_API_KEY;

document.querySelector("#app").innerHTML = `
  <div class="clock">
    9:10 PM
  </div>
  <div class="date">
    Sat, Aug 22
  </div>
  <div class="search">
    <input type="text" placeholder="Search Google">
  </div>
  <div class="shortcuts">
   <div class="shortcut">
    <div class="shortcut-icon">G</div>
    <div class="shortcut-name">Google</div>
   </div>
   <div class="shortcut">
    <div class="shortcut-icon">Y</div>
    <div class="shortcut-name">Youtube</div>
   </div>
   <div class="shortcut">
    <div class="shortcut-icon">G</div>
    <div class="shortcut-name">GitHub</div>
   </div>
   <div class="shortcut">
    <div class="shortcut-icon">+</div>
    <div class="shortcut-name">Add new shortcut</div>
   </div>
  </div>
`;

// document.querySelector("#app").innerHTML = "<p>loading</p>";

// fetch(`https://api.nasa.gov/planetary/apod?date=2026-01-01&api_key=${API_KEY}`).
//   then(response => response.json()).then(data => {
//     let media;
//     if (data.media_type === "image") {
//         media = `<img src="${data.url}"/>`;
//     } else {
//         media = `<video src="${data.url}" controls></video>`;
//     }
//     document.querySelector("#app").innerHTML = `
//     <h1>${data.title}</h1>
//     ${media}
//     <p>${data.explanation}</p>
//     `;
//   }).catch(err => {
//     document.querySelector("#app").innerHTML = `<p>Error: ${err}</p>`;
//   })