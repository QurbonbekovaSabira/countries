let params = new URLSearchParams(document.location.search);
let urlname = params.get("id");
console.log(urlname);
const siteUrl = `https://restcountries.com/v3.1/name`;

const header__btn = document.querySelector(".header__btn");
const heroAbout__imgBox = document.querySelector(".heroAbout__imgBox");
const heroAbout__contentBox = document.querySelector(".heroAbout__contentBox");
const heroAbout__btnBox = document.querySelector(".heroAbout__btnBox");

const heroAbout__btnBox_content = document.querySelector(
  ".heroAbout__btnBox_content"
);

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
    const res = await fetch(`${siteUrl}/${urlname}`);
    const data = await res.json();
   
    Rend(data);
    console.log(data);
  } catch (error) {}
};
render();

let names = [];

const Rend = async (data) => {
  try {
    const promis = await fetch("https://restcountries.com/v3.1//all");
    const text = await promis.json();

    // const fff= data[0].currencies ?currencies[Object.keys(data[0].currencies)].name : "Null";
    //   console.log(fff);

    let borderCountries = data.map((item) =>
      item.borders ? item.borders : ""
    );
    const countriesName = text.map((item) => item.cca3);
    console.log(borderCountries);

    const train = [...borderCountries];
    if (borderCountries && countriesName) {
      for (let i = 0; i < countriesName.length; i++) {
        for (let j = 0; j < borderCountries[0].length; j++) {
          if (countriesName[i] == borderCountries[0][j]) {
            names.push(text[i]);
          }
        }
      }
    }

    heroAbout__imgBox.innerHTML = 
      // ?.map(
      //   (item) =>
          `<img src="${ data[0].flags.png ?  data[0].flags.png : "NOT"}" alt="Flag">`
      // )
      // .join("");
    console.log(data[0]);
    heroAbout__contentBox.innerHTML = 
    // data[0]
      // ?.map(
      //   (item) =>
         `
    <div >
    <h2 class="heroAbout__title">${
      data[0].name.common ?  data[0].name.common : ""
    }</h2>
    <div class="heroAbout__contentBox">
   <div class="heroAbout_textBox">   
            <p class="heroAbout_text">Population:<span>${
              data[0].population
            }</span></p> 
            <p class="heroAbout_text">Region:<span>${
              data[0].region ?  data[0].region : ""
            }</span> </p>
            <p class="heroAbout_text">Sub Region:<span> ${
              data[0].subregion ?  data[0].subregion : ""
            }</span></p>
            <p class="heroAbout_text">Capital:<span>${
              data[0].capital ?  data[0].capital : ""
            }</span> </p>
   </div>
   <div>
     <p class="heroAbout_text">Top Level Domain: <span>${
      data[0].tld ?  data[0].tld : ""
     }</span></p>

     <p class="heroAbout_text">Languages: <span>${
      data[0].demonyms.eng.f ?  data[0].demonyms.eng.f : ""
     }</span></p>
   </div>
   </div>
   
   </div>
    </div>
    `
      // )
      // .join("");
    console.log(data);
    heroAbout__btnBox.innerHTML = names
      .map(
        (item) =>
         `
    <p class="heroAbout__btnBox_text" data-set=${item.name.common}>${ item.name.common}</p>
    `
      )
      .join("");
  } catch (error) {}
};


heroAbout__btnBox.addEventListener("click", (e) => {
  const eventCountrie = e.target.id;
  console.log(eventCountrie);
  let name = [];
  name.push(names.find((item) => item.name.common === eventCountrie));

  Rend(name);
});
