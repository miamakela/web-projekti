document.addEventListener('DOMContentLoaded', () => {
    const games = [
        {
            images: ['../img/kulttuurit/Italia.png', '../img/kulttuurit/Espanja.png', '../img/kulttuurit/Ranska.png', '../img/kulttuurit/Saksa.png'],
            countries: ['Italia', 'Espanja', 'Ranska', 'Saksa'],
            colors: ['magenta', 'yellow', 'blue', 'orange'],
            popoverTexts: [
                'Italia: Kuuluisa pastastaan ja pizzastaan!',
                'Espanja: Flamenco ja härkätaistelut.',
                'Ranska: Eiffel-torni ja croissantit.',
                'Saksa: Teknologia ja Oktoberfest.'
            ],
            answerTexts: [
                'Oikea vastaus on Italia!',
                'Oikea vastaus on Espanja!',
                'Oikea vastaus on Ranska!',
                'Oikea vastaus on Saksa!'
            ]
        },
        {
            images: ['../img/kulttuurit/Yhdysvallat.png', '../img/kulttuurit/Meksiko.png', '../img/kulttuurit/Australia.png', '../img/kulttuurit/Brasilia.png'],
            countries: ['Yhdysvallat', 'Meksiko', 'Australia', 'Brasilia'],
            colors: ['purple', 'orange', 'teal', 'pink'],
            popoverTexts: [
                'Yhdysvallat:',
                'Meksiko:',
                'Australia:',
                'Brasilia:',
            ],
            answerTexts: [
                'Oikea vastaus on Yhdysvallat!',
                'Oikea vastaus on Meksiko!',
                'Oikea vastaus on Australia!',
                'Oikea vastaus on Brasilia!'
            ]
        },
        {
            images: ['../img/kulttuurit/Kiina.png', '../img/kulttuurit/Intia.png', '../img/kulttuurit/Egypti.png', '../img/kulttuurit/Etelä-Afrikka.png'],
            countries: ['Kiina', 'Intia', 'Egypti', 'Etelä-Afrikka'],
            colors: ['brown', 'cyan', 'magenta', 'lime'],
            answerTexts: [
                'Oikea vastaus on Kiina!',
                'Oikea vastaus on Intia!',
                'Oikea vastaus on Egypti!',
                'Oikea vastaus on Etelä-Afrikka!'
            ],
            popoverTexts: [
                'Kiina:',
                'Intia:',
                'Egypti:',
                'Etelä-Afrikka:',
            ]  
        }
    ];

    let currentGameIndex = 0;
    let pairs = [];
    let shuffledCountries = [];
    let score = 0;
    let isImageSelected = false;
    let isChecked = false;
    let popoverVisible = false; // Aluksi popoverit eivät ole näkyvissä

    const feedbackElement = document.getElementById('feedback');
    const gameRoundElement = document.getElementById('gameRound');
    const checkButton = document.getElementById('check-button');
    const nextButton = document.getElementById('next-button');
    const imageRow = document.getElementById('image-row');
    const countryRow = document.getElementById('country-row');
    const resetButton = document.getElementById('reset-button');
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

    // Poista kaikki popover-toiminnallisuudet alussa
    document.querySelectorAll('[data-bs-toggle="popover"]').forEach(el => {
    el.removeAttribute('data-bs-toggle'); // Poista Bootstrapin hover-toiminnallisuus
    })

    function resetBorders() {
        const imageElements = imageRow.querySelectorAll('img');
        imageElements.forEach(img => img.style.border = ''); // Poista kaikki rajat kuvista

        const countryElements = countryRow.querySelectorAll('div');
        countryElements.forEach(div => div.style.border = ''); // Poista kaikki rajat maista
    }
    
    // Päivitä peli
    function updateGame() {
        const game = games[currentGameIndex];

        resetBorders();

        // Päivitä kuvat
        const imageElements = imageRow.querySelectorAll('img');
        game.images.forEach((src, index) => {
            const img = imageElements[index];
            img.src = src;
        });

        // Sekoita maat ja päivitä taulukko
        shuffledCountries = game.countries.slice().sort(() => Math.random() - 0.5);
        const countryElements = countryRow.querySelectorAll('div');
        shuffledCountries.forEach((name, index) => {
            countryElements[index].textContent = name;
        });

        // Nollaa valinnat
        pairs = [];
        isImageSelected = false;
        isChecked = false;
        checkButton.disabled = false;
        nextButton.disabled = true;
        resetButton.disabled = false;

        // Päivitä kierrosteksti
        gameRoundElement.textContent = `Peli ${currentGameIndex + 1}/3`;

        // Päivitä palaute
        feedbackElement.textContent = 'Yhdistä kaikki kuvat ja maat klikkaamalla ensin kuvaa ja sitten maan nimeä.';
    }

    // Tyhjennä valinnat
    resetButton.addEventListener('click', () => {
        const imageElements = imageRow.querySelectorAll('img');
        imageElements.forEach(img => img.style.border = '');

        const countryElements = countryRow.querySelectorAll('div');
        countryElements.forEach(div => div.style.border = '');

        pairs = [];
        isImageSelected = false;

        feedbackElement.textContent = 'Yhdistä kaikki kuvat ja maat klikkaamalla ensin kuvaa ja sitten maan nimeä.';
        checkButton.disabled = false;
        nextButton.disabled = true;
    });

    // Käsittele kuvan valinta
    imageRow.addEventListener('click', (event) => {
        if (isChecked || isImageSelected) return;
        const clickedImage = event.target;
        if (clickedImage.tagName === 'IMG') {
            const game = games[currentGameIndex];
            const index = Array.from(imageRow.querySelectorAll('img')).indexOf(clickedImage);
            const selectedColor = game.colors[index];
            clickedImage.style.border = `5px solid ${selectedColor}`;

            // Varmista, että värillä ei ole muuta käyttökohdetta
            if (pairs.some(pair => pair.color === selectedColor)) {
                return; // Jos väri on jo käytössä, estetään valinta
            }

            pairs.push({ type: 'image', index, color: selectedColor });
            isImageSelected = true;
        }
    });

    // Käsittele maan valinta
    countryRow.addEventListener('click', (event) => {
        if (isChecked || !isImageSelected) return;
        const clickedCountry = event.target;
        if (clickedCountry.tagName === 'DIV' && clickedCountry.parentElement === countryRow) {
            const game = games[currentGameIndex];
            const index = Array.from(countryRow.querySelectorAll('div')).indexOf(clickedCountry);
            let associatedImage = pairs.find(pair => pair.type === 'image' && !pair.used);
            if (associatedImage) {
                clickedCountry.style.border = `5px solid ${associatedImage.color}`;
                pairs.push({ type: 'country', index, color: associatedImage.color });
                associatedImage.used = true;
                isImageSelected = false;
            }
        }
    });

    // Käsittele tarkistuspainikkeen toiminta
    checkButton.addEventListener('click', () => {
        const game = games[currentGameIndex];
        const correctPairs = game.images.map((image, i) => ({
            image: i,
            country: shuffledCountries.indexOf(game.countries[i])
        }));
    
        let correctCount = 0;

        // Poista vanhat popoverit
        const imageElements = imageRow.querySelectorAll('img');
        imageElements.forEach((img) => {
            const instance = bootstrap.Popover.getInstance(img);
            if (instance) {
                instance.dispose(); // Poista popover
            }
        });
    
        game.images.forEach((_, imageIndex) => {
            const imageElement = imageRow.querySelectorAll('img')[imageIndex];
            const correctCountryIndex = correctPairs.find(pair => pair.image === imageIndex).country;
            const associatedPair = pairs.find(pair => pair.type === 'country' && pair.color === pairs.find(p => p.type === 'image' && p.index === imageIndex)?.color);
    
            if (associatedPair) {
                const isCorrect = associatedPair.index === correctCountryIndex;
                const countryElement = countryRow.querySelectorAll('div')[associatedPair.index];
    
                if (isCorrect) {
                    correctCount++;
                    imageElement.style.border = `5px solid green`;
                    countryElement.style.border = `5px solid green`;
                } else {
                    imageElement.style.border = `5px solid red`;
                    countryElement.style.border = `5px solid red`;
                }
            }
            // Luo popover tarkistuksen jälkeen
            const popover = new bootstrap.Popover(imageElement, {
                content: game.popoverTexts[imageIndex],
                trigger: 'manual',
                placement: 'top',
        });

        popover.show(); // Näytä popover
        });
    
        score += correctCount;
        feedbackElement.textContent = `Sait oikein ${correctCount}/${game.countries.length}!`

        isChecked = true;
        checkButton.disabled = true;
        nextButton.disabled = false;
        resetButton.disabled = true;
    })  

    // SEURAAVA-PAINIKE -> Siirry seuraavaan peliin
    nextButton.addEventListener('click', () => {
        // Poista kaikki avoimet popoverit
    const imageElements = imageRow.querySelectorAll('img');
    imageElements.forEach((img) => {
        const instance = bootstrap.Popover.getInstance(img);
        if (instance) {
            instance.dispose(); // Sulje ja poista popover
        }
    });

        resetBorders()
        if (currentGameIndex < games.length - 1) {
            currentGameIndex++;
            updateGame()
        } else {
            feedbackElement.textContent = `Peli päättyi! Kokonaispistemääräsi on: ${score}/${games.length * 4}`
            checkButton.disabled = true
            nextButton.disabled = true
        }
    })

    // Käynnistä ensimmäinen peli
    updateGame();
})