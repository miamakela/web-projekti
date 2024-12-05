
// Canvas
const canvas = document.querySelector('#gameCanvas')
const ctx = canvas.getContext('2d');

//Parien valinta

const games = {
    images: ["Italia.png", "Ranska.png", "Espanja.png", "Saksa.png"],
    countries: ["Italia", "Ranska", "Espanja", "Saksa"],
    answers: ["Italia", "Ranska", "Espanja", "Saksa"],
}

//Muuttujat
let currentGame = 0; //Pidetään kirjaa, mikä peli on käynnissä (0 ensimmäinen peli, 1 toinen jne.).
let selectedPairs = []; //Pelaajan valitsemat yhdistelmät (kuva + maa).
let score = 0; //Pelaajan kokonaispistemäärä.

//Haetaan elementit
const imagesContainer = document.getElementById('image-row');
const countriesContainer = document.getElementById('country-row');
const checkBtn = document.getElementById('check-button');
const nextBtn = document.getElementById('next-button');
const feedback = document.getElementById('feedback');
const roundNumber = document.getElementById('game-round-row');