const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  // my favorite temples...
  {
    templeName: "Arequipa Peru",
    location: "Arequipa, Perú",
    dedicated: "2019, December, 15",
    area: 26969,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/arequipa-peru-temple/arequipa-peru-temple-7276.jpg"
  },
  {
    templeName: "Trujillo Peru",
    location: "Trujillo, Perú",
    dedicated: "2015, June, 21",
    area: 28200,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/trujillo-peru-temple/trujillo-peru-temple-3712.jpg"
  },
  {
    templeName: "Salt Lake",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 382207,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-6816.jpg"
  }
];


const cardsContainer = document.querySelector("#temple-cards");
const filterHeading = document.querySelector("#current-filter");
const navButtons = document.querySelectorAll("nav button");


function getDedicatedYear(temple) {
  return parseInt(temple.dedicated.split(",")[0]);
}

function renderTemples(list) {
  cardsContainer.innerHTML = ""; // clear previous cards

  list.forEach((temple) => {
    const article = document.createElement("article");
    article.classList.add("temple-card");

    const h3 = document.createElement("h3");
    h3.textContent = temple.templeName;

    const locationPara = document.createElement("p");
    locationPara.innerHTML = `<strong>Location:</strong> ${temple.location}`;

    const dedicatedPara = document.createElement("p");
    dedicatedPara.innerHTML = `<strong>Dedicated:</strong> ${temple.dedicated}`;

    const areaPara = document.createElement("p");
    areaPara.innerHTML = `<strong>Area:</strong> ${temple.area.toLocaleString()} sq ft`;

    const img = document.createElement("img");
    img.src = temple.imageUrl;
    img.alt = temple.templeName;
    img.loading = "lazy";

    article.appendChild(h3);
    article.appendChild(locationPara);
    article.appendChild(dedicatedPara);
    article.appendChild(areaPara);
    article.appendChild(img);

    cardsContainer.appendChild(article);
  });
}

function applyFilter(filter) {
  let filteredTemples = temples;
  let headingText = "All Temples";

  switch (filter) {
    case "old":
      filteredTemples = temples.filter((t) => getDedicatedYear(t) < 1900);
      headingText = "Old Temples (before 1900)";
      break;
    case "new":
      filteredTemples = temples.filter((t) => getDedicatedYear(t) > 2000);
      headingText = "New Temples (after 2000)";
      break;
    case "large":
      filteredTemples = temples.filter((t) => t.area > 90000);
      headingText = "Large Temples (> 90,000 sq ft)";
      break;
    case "small":
      filteredTemples = temples.filter((t) => t.area < 10000);
      headingText = "Small Temples (< 10,000 sq ft)";
      break;
    case "home":
    default:
      headingText = "All Temples";
      break;
  }

 
  navButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.filter === filter);
  });

  filterHeading.textContent = headingText;
  renderTemples(filteredTemples);
}

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    applyFilter(filter);
  });
});

applyFilter("home");

document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;
