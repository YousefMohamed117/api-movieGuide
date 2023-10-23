let result = document.querySelector(".result");
let input = document.querySelector("input");
let button = document.querySelector("button");

button.addEventListener("click", () => {
  let url = `http://www.omdbapi.com/?t=${input.value}&apikey=${key}`;
  if (input.value != "") {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.Response == "False") {
          result.innerHTML = `<h1>${input.value} not found</h1>`;
        } else {
          result.innerHTML = `
        <div class="main">
            <img src="${data.Poster}" alt="" />
            <div class="info">
              <div class="name">${data.Title}</div>
              <div class="rating">
                <i class="fas fa-star"></i> <span class="rate">${
                  data.imdbRating
                }</span>
              </div>
              <div class="extra">
                <span class="">${data.Rated}</span>
                <span class="year">${data.Year}</span>
                <span class="duration">${data.Runtime}</span>
              </div>
              <div class="genres">
               <span> ${data.Genre.split(",").join(
                 "</span><span>"
               )}</span>               
              </div>
            </div>
          </div>
          <h3>plot</h3>
          <p class="plot">
            ${data.Plot}
          </p>
          <h3>cast</h3>
          <p class="cast">${data.Actors} </p>
        `;
        }
      })
     
  } else {
    result.innerHTML = `<h1>You know you should enter a name :\\ </h1>`;
  }
});

let ar = 'mo,jo,po'

ar = ar.split(',').join('</span><span>')
console.log(ar)