function backButtonHandler() {
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);

  let encodedName = params.get("name");
  let decodedName = encodedName ? decodeURIComponent(encodedName) : "";

  let encodedFlag = params.get("flag");
  let decodedFlag = encodedFlag ? decodeURIComponent(encodedFlag) : "";

  let encodedPopulation = params.get("population");
  let decodedPopulation = encodedPopulation ? decodeURIComponent(encodedPopulation) : "";

  let encodedRegion = params.get("region");
  let decodedRegion = encodedRegion ? decodeURIComponent(encodedRegion) : "";

  let encodedSubRegion = params.get("subRegion");
  let decodedSubRegion = encodedSubRegion ? decodeURIComponent(encodedSubRegion) : "";

  let encodedCapital = params.get("capital");
  let decodedCapital = encodedCapital ? decodeURIComponent(encodedCapital) : "";

  let encodedCurrencies = params.get("currencies");
  let decodedCurrencies = encodedCurrencies ? decodeURIComponent(encodedCurrencies) : "";

  let encodedLanguages = params.get("languages");
  let decodedLanguages = encodedLanguages ? decodeURIComponent(encodedLanguages) : "";

  const flagImg = document.getElementById("country-flag");
  if (flagImg) {
    flagImg.src = decodedFlag;
    flagImg.alt = `${decodedName} Flag`;
  }

  document.getElementById("country-name").textContent = decodedName;
  document.getElementById("country-population").textContent = decodedPopulation;
  document.getElementById("country-region").textContent = decodedRegion;
  document.getElementById("country-subregion").textContent = decodedSubRegion;
  document.getElementById("country-capital").textContent = decodedCapital;
  document.getElementById("country-currencies").textContent = decodedCurrencies;
  document.getElementById("country-languages").textContent = decodedLanguages;

  const backBtn = document.getElementById("back-btn");
  if (backBtn) {
    backBtn.addEventListener("click", backButtonHandler);
  }
});