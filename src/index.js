const toggle = document.getElementById('toggleDark');
const body = document.querySelector('body');

toggle.addEventListener('click', function(){
    this.classList.toggle('bi-moon');
    if(this.classList.toggle('bi-brightness-high-fill')){
        body.style.background = '#f0f0f0';
        body.style.color = '#2B1B17';
        body.style.transition = '2s';
       
    }else{
        body.style.background = '#2B1B17';
        body.style.color = '#f0f0f0';
        body.style.transition = '2s';
       
    }
});



const dropdown = document.getElementById('dropdown');
const searchInput = document.getElementById('input-search-bar');
const cardContainer = document.querySelector('.card-container');

// Load data from the API when the page loads
document.addEventListener('DOMContentLoaded', () => {
  fetchAndCreateCards();
});

// Add an event listener to the region dropdown
dropdown.addEventListener('change', () => {
  fetchAndCreateCards();
});

// Add an event listener to the search input
searchInput.addEventListener('input', () => {
  fetchAndCreateCardsBasedOnName();
});

// Function to fetch data from the API and create cards
function fetchAndCreateCards() {
  axios.get('https://restcountries.com/v3.1/all')
    .then(function (response) {
      const data = response.data;

      // Function to check for data based on region
      const selectedRegion = dropdown.value;
      const filteredData = data.filter(function (country) {
        if (selectedRegion === "") {
          return true;
        } else {
          return country.region === selectedRegion;
        }
      });

      createCards(filteredData);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}

// Function to fetch data from the API and create cards based on the country name
function fetchAndCreateCardsBasedOnName() {
  axios.get('https://restcountries.com/v3.1/all')
    .then(function (response) {
      const data = response.data;

      // Function to check for data based on name
      const selectedCountry = searchInput.value.toLowerCase(); // Convert to lowercase for case-insensitive search
      const filteredCountry = data.filter(function (country) {
        if (selectedCountry === "") {
          return true;
        } else {
          return country.name.common.toLowerCase().includes(selectedCountry);
        }
      });

      createCards(filteredCountry);
    });
}

// Function to create cards
function createCards(data) {
  cardContainer.innerHTML = ''; // Clear existing cards

  data.forEach((country) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <div class="card-body">
        <img src="${country.flags.png}" alt="${country.name.common}" />
      </div>
      <div class="card-footer">
      <h3> ${country.name.common}</h3>
      <p><span>Name</span>: ${country.name.common}</p>
      <p><span>Region</span>: ${country.region}</p>
      <p><span>Capital</span>: ${country.capital}</p>
      <p><span>Population</span>: ${country.population}</p>
    </div>
    `; // Add a click event listener to the card to toggle display
    card.addEventListener('click', function () {
      // Hide all cards
      const cards = document.querySelectorAll('.card');
      cards.forEach((card) => {
        card.style.display = 'none';
      });
     
      // Display the clicked card
      card.style.display = 'flex';
      
      card.innerHTML = `
      <div class="card-body">
      <img src="${country.flags.png}" alt="${country.name.common} flag">
      </div>
      <div class="card-footer">
        <h3> ${country.name.common}</h3>
        <p><span>Name</span>: ${country.name.common}</p>
        <p><span>Region</span>: ${country.region}</p>
        <p><span>Capital</span>: ${country.capital}</p>
        <p><span>Population</span>: ${country.population}</p>
      </div>
      <div class="additional-info">
        <h3>Additional iformation</h3>
        <p><span>Car sign</span>: ${country.car.signs}</p>
        <p><span>Timezones</span>: ${country.timezones}</p>
        <p><span>Sub-region</span>: ${country.subregion}</p>
        <p><span>Continents</span>: ${country.continents}</p>
      </div>
    `;
      // Apply flex display style
      card.style.flexDirection = 'row'; // Set flex direction to column
      card.style.alignItems = 'center'; // Center items vertically
      card.style.justifyContent = 'space-evenly';
      
       
      

      const cardFooter = card.querySelector('.card-footer');
      const additionalInfo = card.querySelector('.additional-info');
      cardFooter.style.marginLeft= '130px'; // Adjust this value as needed
      additionalInfo.style.marginLeft = '0px'
      cardFooter.style.paddingRight = '0px'; // Adjust this value as needed
      additionalInfo.style.paddingLeft = '0px'
      additionalInfo.style.height = '200px'
      additionalInfo.style.width = '100%'
       // Center items horizontally

      // Clear the card container and append the clicked card
      cardContainer.innerHTML = '';
      cardContainer.appendChild(card);
    });
  
    cardContainer.appendChild(card);
  });
}



//adding an event listener to an individual card with a class of card
 
