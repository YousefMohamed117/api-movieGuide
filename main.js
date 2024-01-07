let showContainer = document.querySelector(".result");
let input = document.querySelector("input");
let button = document.querySelector("button");
let listContainer = document.getElementById('suggestions');

let apiKey = "e62be596";
function displayWords(value) {
  input.value = value;
  removeElements();
}

function removeElements() {
  listContainer.innerHTML = "";
}

input.addEventListener("keyup", async () => {
  removeElements();
  if (input.value.length < 3) {
    return false;
  }

  const url = `https://www.omdbapi.com/?s=${input.value}&apikey=${apiKey}`;

  const response = await fetch(url);
  const jsonData = await response.json();

  jsonData.Search.forEach((result) => {
    let title = result.Title;
    let div = document.createElement("div");
    div.style.cursor = "pointer";
    div.classList.add("autocomplete-items");
    div.setAttribute("onclick", "displayWords('" + title + "')");
    let word = "<b>" + title.substr(0, input.value.length) + "</b>";
    word += title.substr(input.value.length);
    div.innerHTML = `<p class="item">${word}</p>`;
    listContainer.appendChild(div);
  });
});

button.addEventListener("click", async () => {
  if (input.value.trim().length < 1) {
    alert("Input cannot be blank");
  }
  showContainer.innerHTML = "";
  const url = `https://www.omdbapi.com/?t=${input.value}&apikey=${apiKey}`;

  const response = await fetch(url);
  const jsonData = await response.json();

  if (jsonData.Response === "True") {
    showContainer.innerHTML = `<div class="card-container">
        <div class="container-character-image">
        <img src="${jsonData.Poster}"/></div>
        <div class="character-name">${jsonData.Title}</div>
        <div class="character-description">${jsonData.Plot}</div>
        </div>`;
  } else {
    showContainer.innerHTML = `<p>${input.value} not found</p>`;
  }
});

window.onload = () => {
  // getRsult(); // You can choose whether to fetch results on page load or not
};
