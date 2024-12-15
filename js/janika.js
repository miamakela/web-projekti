const cards = document.querySelectorAll(".card");

let matchedCard = 0; // Löydetyt parit
let cardOne = null, cardTwo = null;
let disableDeck = false; // Estää useamman kortin käännön samaan aikaan

const pairsFound = document.getElementById("pairs-found"); // Laskuri

const totalPairs = 8; // Pelin parimäärä

function updateCounter() {
    pairsFound.textContent = matchedCard; // Päivitä löydettyjen parien määrä
}

function flipCard(e) {
    const clickedCard = e.target.closest(".card"); // Etsitään klikattu kortti
    if (!clickedCard || clickedCard === cardOne || disableDeck || clickedCard.classList.contains("flip")) {
        return; // Estetään virheellinen toiminta
    }

    clickedCard.classList.add("flip"); // Käännä kortti

    if (!cardOne) {
        cardOne = clickedCard; // Ensimmäinen kortti
        return;
    }

    cardTwo = clickedCard; // Toinen kortti
    disableDeck = true; // Estetään lisää klikkauksia

    const cardOneImg = cardOne.querySelector(".back-view img").src; // Ensimmäisen kortin kuva
    const cardTwoImg = cardTwo.querySelector(".back-view img").src; // Toisen kortin kuva

    matchCards(cardOneImg, cardTwoImg);
}

function matchCards(img1, img2) {
    if (img1 === img2) {
        // Jos kortit ovat pari
        matchedCard++;
        updateCounter(); // Päivitä laskuri

        // Poistetaan kuuntelijat, jotta kortteja ei voi enää klikata
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);

        resetCards();

        if (matchedCard === totalPairs) {
            setTimeout(shuffleCard, 1000); // Peli loppuu
        }
    } else {
        // Kortit eivät ole pari, ravistetaan ja käännetään takaisin
        setTimeout(() => {
            cardOne.classList.remove("flip");
            cardTwo.classList.remove("flip");
            resetCards();
        }, 1200);
    }
}

function resetCards() {
    cardOne = null;
    cardTwo = null;
    disableDeck = false; // Palautetaan klikkausmahdollisuus
}

function shuffleCard() {
    matchedCard = 0; // Nollaa löydetyt parit
    updateCounter(); // Päivitä laskuri
    cardOne = cardTwo = null;

    const arr = [...Array(totalPairs).keys(), ...Array(totalPairs).keys()]; // Kuvapareja varten
    arr.sort(() => Math.random() > 0.5 ? 1 : -1); // Satunnainen järjestys

    cards.forEach((card, index) => {
        card.classList.remove("flip"); // Käännä kaikki kortit takaisin
        const frontImg = card.querySelector(".front-view img");
        const backImg = card.querySelector(".back-view img");

        // Etupuolen kuva pysyy "world.png"
        frontImg.src = "../img/janika/world.png";

        // Takapuolen kuva arvotaan
        backImg.src = `../img/janika/img${arr[index]}.png`;

        // Varmistetaan, että kortteja voi klikata
        card.addEventListener("click", flipCard);
    });
}

shuffleCard(); // Käynnistä peli
cards.forEach(card => {
    card.addEventListener("click", flipCard); // Lisää klikkauskuuntelijat kortteihin
});




