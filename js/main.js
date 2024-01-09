const header__btn = document.querySelector(".header__btn");
const card = document.querySelector(".card");
const option = document.querySelectorAll(".option");

const form = document.querySelector(".form");
const search = document.querySelector(".search");

const select = document.querySelector(".select");

const url = "https://restcountries.com/v3.1//all";

let count = 0;

let theme = localStorage.getItem("theme");
if (theme == "dark-theme") {
  document.body.classList.toggle("dark-theme");
  header__btn.classList.toggle("header__btn_second");
 if(count%2==0){
count+=1;
 }
}

header__btn.addEventListener("click", (e) => {
  document.body.classList.toggle("dark-theme");
  header__btn.classList.toggle("header__btn_second");
  console.log(count);
  if (count % 2 == 0) {
    localStorage.setItem("theme", "dark-theme");
  } else {
    localStorage.setItem("theme", "ligth-theme");
  }
  count++;
});

const render = async () => {
  try {
    const promis = await fetch("https://restcountries.com/v3.1//all");
    const data = await promis.json();
    Push(data, card);
  } catch (error) {}
};
render();

const Push = (data, nodeList) => {
  nodeList.innerHTML = data
    ?.map(
      (item) => `
    <a class="item" href="http://127.0.0.1:5501/about.html?id=${item.name.common}">
    <img src="${item.flags.png}" alt="">
    <div class="item_contentBox">
    <p class="item__title">${item.name.common}</p>
    <p class="item__text">Population: <span class="item__text_span">${item.population}</span></p>
    <p class="item__text">Region:<span class="item__text_span">${item.region}</span></p>
    <p class="item__text item__text_last">Capital:<span class="item__text_span">${item.capital}</span></p>
    </div>
    </a>
    `
    )
    .join("");
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(`https://restcountries.com/v3.1/name/${search.value}`)
    .then((res) => res.json())
    .then((data) => Push(data, card));
});

select.addEventListener("click", (e) => {
  let region = select.value;
  if (region != "Filter by Region") {
    found(region);
  } else {
    found("All");
  }
});

const found = async (region) => {
  try {
    const promis = await fetch("https://restcountries.com/v3.1//all");
    const data = await promis.json();
    console.log(region);
    let countries = data.filter((item) => item.region == region);
    if (region == "All") {
      Push(data, card);
    } else {
      Push(countries, card);
    }
  } catch (error) {}
};
