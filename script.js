const countryCardsContainer = document.getElementById("country-cards-container");
const searchInput = document.getElementById("search-input");
const regionFilter = document.getElementById("region-filter");
const populationFilter = document.getElementById("population-filter");
const showMoreBtn = document.getElementById("show-more-btn");

let displayCount = 12;
let countries = data; // Loaded from data.js

function populateCountryCards(countriesList) {
  countryCardsContainer.innerHTML = "";

  if (countriesList.length === 0) {
    countryCardsContainer.innerHTML = "<p>No country found matching the search criteria.</p>";
    showMoreBtn.style.display = "none";
    return;
  }

  const loopCounter = Math.min(displayCount, countriesList.length);

 for (let i = 0; i < loopCounter; i++) {
      const country = countriesList[i];

      const card = document.createElement("div");
      card.classList.add("country-card");

      // Register click event handler passing the clicked country object
      card.addEventListener("click", () => {
        countryCardHandler(country);
      });

      const flag = document.createElement("img");
      flag.src = country.flags.png;
      flag.alt = `${country.name.official} Flag`;

      const name = document.createElement("h3");
      name.innerHTML = country.name.official;

      const population = document.createElement("p");
      population.innerHTML = `<strong>Population:</strong>${country.population}`;

      const capital = document.createElement("p");
      capital.innerHTML = `<strong>Capital:</strong>${country.capital}`;

      const region = document.createElement("p");
      region.innerHTML = `<strong>Region:</strong>${country.region}`;

      card.appendChild(flag);
      card.appendChild(name);
      card.appendChild(population);
      card.appendChild(capital);
      card.appendChild(region);

      countryCardsContainer.appendChild(card);
    }

  // Show or hide the Show More button based on remaining undisplayed countries
  if (displayCount < countriesList.length) {
    showMoreBtn.style.display = "inline-block";
  } else {
    showMoreBtn.style.display = "none";
  }
}

function showMoreHandler() {
  displayCount += 10;
  populateCountryCards(countries);
}

function filterData() {
  const inputValue = searchInput.value.trim();
  const selectedRegion = regionFilter.value;
  const populationValue = Number(populationFilter.value);

  // 1. Pattern validation for country name
  let regex = new RegExp(/^[a-zA-Z -]*$/);
  if (!regex.test(inputValue)) {
    countryCardsContainer.innerHTML = "<p>Enter valid Country Name.</p>";
    showMoreBtn.style.display = "none";
    return false;
  }

  // 2. Maximum value validation for population
  if (populationValue > 1500000000) {
    countryCardsContainer.innerHTML = "<p>Country’s population cannot be greater than 1.5 billion.</p>";
    showMoreBtn.style.display = "none";
    return false;
  }

  // 3. Filter countries array based on valid inputs
  const searchLower = inputValue.toLowerCase();

  countries = data.filter((country) => {
    const matchesName =
      country.name.common.toLowerCase().includes(searchLower) ||
      country.name.official.toLowerCase().includes(searchLower);

    const matchesRegion =
      selectedRegion === "all" || country.region === selectedRegion;

    const matchesPopulation = populationValue <= country.population;

    return matchesName && matchesRegion && matchesPopulation;
  });

  // 4. Reset displayCount and re-render cards
  displayCount = 12;
  populateCountryCards(countries);
}

// Register event listeners
document.addEventListener("DOMContentLoaded", () => {
  populateCountryCards(countries);
});

searchInput.addEventListener("input", filterData);
regionFilter.addEventListener("change", filterData);
populationFilter.addEventListener("input", filterData);
showMoreBtn.addEventListener("click", showMoreHandler);

function getFormattedNames(itemsArray) {
  let formattedNames = "";

  for (let i = 0; i < itemsArray.length; i++) {
    formattedNames += itemsArray[i].name;
    if (i < itemsArray.length - 1) {
      formattedNames += ", ";
    }
  }

  return formattedNames;
}

function countryCardHandler(country) {
  let queryString =
    "?name=" +
    encodeURIComponent(country.name.official) +
    "&flag=" +
    encodeURIComponent(country.flags.svg) +
    "&population=" +
    country.population +
    "&region=" +
    country.region +
    "&subRegion=" +
    encodeURIComponent(country.subregion) +
    "&capital=" +
    encodeURIComponent(country.capital) +
    "&currencies=" +
    encodeURIComponent(getFormattedNames(country.currencies)) +
    "&languages=" +
    encodeURIComponent(getFormattedNames(country.languages));

  window.location.href = "detail.html" + queryString;
}
