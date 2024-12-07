
// Canvas
const canvas = document.querySelector('#gameCanvas')
const ctx = canvas.getContext('2d')


//Tämä kesken, vaatii muokkausta!

document.addEventListener('DOMContentLoaded', () => {
    // Pelitiedot (lisätty värit) Täytyy muokata kuvia, maita ja värejä
    const games = [
        {
            images: ['../img/kulttuurit/Italia.png', '../img/kulttuurit/Espanja.png', '../img/kulttuurit/Ranska.png', '../img/kulttuurit/Saksa.png'],
            countries: ['Italia', 'Espanja', 'Ranska', 'Saksa'],
            colors: ['red', 'yellow', 'blue', 'green']
        },
        {
            images: ['../img/kulttuurit/Japani.png', '../img/kulttuurit/Intia.png', '../img/kulttuurit/Kiina.png', '../img/kulttuurit/Korea.png'],
            countries: ['Japani', 'Intia', 'Kiina', 'Korea'],
            colors: ['purple', 'orange', 'teal', 'pink']
        },
        {
            images: ['../img/kulttuurit/Yhdysvallat.png', '../img/kulttuurit/Meksiko.png', '../img/kulttuurit/Canada.png', '../img/kulttuurit/Brasilia.png'],
            countries: ['Yhdysvallat', 'Meksiko', 'Kanada', 'Brasilia'],
            colors: ['brown', 'cyan', 'magenta', 'lime']
        }
    ];

    let currentGameIndex = 0
    let pairs = []; // Tallentaa valitut parit (kuvan ja maan indeksit)
    let score = 0;

    const feedbackElement = document.getElementById('feedback')
    const gameRoundElement = document.getElementById('gameRound')
    const checkButton = document.getElementById('check-button')
    const nextButton = document.getElementById('next-button')
    const imageRow = document.getElementById('image-row')
    const countryRow = document.getElementById('country-row')

    // Päivitä peli
    function updateGame() {
        const game = games[currentGameIndex]

        // Päivitä kuvat
        const imageElements = imageRow.querySelectorAll('img')
        game.images.forEach((src, index) => {
            imageElements[index].src = src
            imageElements[index].style.border = '' // Poista valintojen rajat
        })

        // Päivitä maat
        const countryElements = countryRow.querySelectorAll('div')
        game.countries.forEach((name, index) => {
            countryElements[index].textContent = name
            countryElements[index].style.border = '' // Poista valintojen rajat
        });

        // Päivitä kierrosteksti
        gameRoundElement.textContent = `Peli ${currentGameIndex + 1}/3`

        // Nollaa valinnat
        pairs = [];
        checkButton.disabled = false
        nextButton.disabled = true

        // Päivitä palaute
        feedbackElement.textContent = 'Yhdistä kaikki kuvat ja maat.'
    }

    // Käsittele kuvan valinta
    imageRow.addEventListener('click', (event) => {
        const clickedImage = event.target
        if (clickedImage.tagName === 'IMG') {
            const game = games[currentGameIndex]
            const index = Array.from(imageRow.querySelectorAll('img')).indexOf(clickedImage)
            const selectedColor = game.colors[index]

            clickedImage.style.border = `3px solid ${selectedColor}`
            pairs.push({ type: 'image', index, color: selectedColor })
        }
    })

    // Käsittele maan valinta
    countryRow.addEventListener('click', (event) => {
        const clickedCountry = event.target
        if (clickedCountry.tagName === 'DIV') {
            const game = games[currentGameIndex]
            const index = Array.from(countryRow.querySelectorAll('div')).indexOf(clickedCountry)

            let associatedImage = pairs.find(pair => pair.type === 'image' && !pair.used)
            if (associatedImage) {
                clickedCountry.style.border = `3px solid ${associatedImage.color}`
                pairs.push({ type: 'country', index, color: associatedImage.color })
                associatedImage.used = true // Merkkaa kuva käytetyksi
            }
        }
    });

    // Tarkista vastaukset
    checkButton.addEventListener('click', () => {
        const game = games[currentGameIndex]
        const correctPairs = game.images.map((image, i) => ({
            image: i,
            country: game.countries.indexOf(game.countries[i])
        }));

        let correctCount = 0

        pairs.forEach(pair => {
            if (pair.type === 'image') return
            const associatedImage = pairs.find(p => p.type === 'image' && p.color === pair.color)
            if (associatedImage) {
                const isCorrect = correctPairs.some(cp => cp.image === associatedImage.index && cp.country === pair.index)
                if (isCorrect) correctCount++;
            }
        })

        score += correctCount;

        feedbackElement.textContent = `Sait oikein ${correctCount}/${game.countries.length}!`
        checkButton.disabled = true
        nextButton.disabled = false
    });

    // Siirry seuraavaan peliin
    nextButton.addEventListener('click', () => {
        if (currentGameIndex < games.length - 1) {
            currentGameIndex++
            updateGame()
        } else {
            feedbackElement.textContent = `Peli päättyi! Kokonaispistemääräsi on: ${score}/${games.length * 4}`
            checkButton.disabled = true
            nextButton.disabled = true
        }
    })

    // Käynnistä ensimmäinen peli
    updateGame()
})