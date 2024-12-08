// Canvas
const canvas = document.querySelector('#gameCanvas')
const ctx = canvas.getContext('2d')

// Tämä kesken, vaatii muokkausta!

document.addEventListener('DOMContentLoaded', () => {
    // Pelitiedot (lisätty värit)
    const games = [
        {
            images: ['../img/kulttuurit/Italia.png', '../img/kulttuurit/Espanja.png', '../img/kulttuurit/Ranska.png', '../img/kulttuurit/Saksa.png'],
            countries: ['Italia', 'Espanja', 'Ranska', 'Saksa'],
            colors: ['magenta', 'yellow', 'blue', 'orange']
        },
        {
            images: ['../img/kulttuurit/Yhdysvallat.png', '../img/kulttuurit/Meksiko.png', '../img/kulttuurit/Australia.png', '../img/kulttuurit/Brasilia.png'],
            countries: ['Yhdysvallat', 'Meksiko', 'Australia', 'Brasilia'],
            colors: ['purple', 'orange', 'teal', 'pink']
        },
        {
            images: ['../img/kulttuurit/Kiina.png', '../img/kulttuurit/Intia.png', '../img/kulttuurit/Egypti.png', '../img/kulttuurit/Etelä-Afrikka.png'],
            countries: ['Kiina', 'Intia', 'Egypti', 'Etelä-Afrikka'],
            colors: ['brown', 'cyan', 'magenta', 'lime']
        }
    ]

    let currentGameIndex = 0
    let pairs = [] // Tallentaa valitut parit (kuvan ja maan indeksit)
    let shuffledCountries = [] // Tallentaa sekoitetut maat
    let score = 0
    let isImageSelected = false // Pitää kirjaa siitä, onko kuva valittu

    const feedbackElement = document.getElementById('feedback')
    const gameRoundElement = document.getElementById('gameRound')
    const checkButton = document.getElementById('check-button')
    const nextButton = document.getElementById('next-button')
    const imageRow = document.getElementById('image-row')
    const countryRow = document.getElementById('country-row')
    const resetButton = document.getElementById('reset-button') // Uusi nappi

    // Päivitä peli
    function updateGame() {
        const game = games[currentGameIndex]

        // Päivitä kuvat
        const imageElements = imageRow.querySelectorAll('img')
        game.images.forEach((src, index) => {
            imageElements[index].src = src
            imageElements[index].style.border = '' // Poista valintojen rajat
        })

        // Sekoita maat ja päivitä taulukko
        shuffledCountries = game.countries.slice().sort(() => Math.random() - 0.5)
        const countryElements = countryRow.querySelectorAll('div')
        shuffledCountries.forEach((name, index) => {
            countryElements[index].textContent = name
            countryElements[index].style.border = '' // Poista valintojen rajat
        })

        // Päivitä kierrosteksti
        gameRoundElement.textContent = `Peli ${currentGameIndex + 1}/3`

        // Nollaa valinnat
        pairs = []
        isImageSelected = false // Nollaa tila
        checkButton.disabled = false
        nextButton.disabled = true
        resetButton.disabled = false; // Ota resetButton käyttöön

        // Päivitä palaute
        feedbackElement.textContent = 'Yhdistä kaikki kuvat ja maat.'
    }

    // Tyhjennä valinnat
    resetButton.addEventListener('click', () => {
        // Poista kaikki valinnat ja rajat
        const imageElements = imageRow.querySelectorAll('img')
        imageElements.forEach(img => img.style.border = '') // Poista rajat

        const countryElements = countryRow.querySelectorAll('div')
        countryElements.forEach(div => div.style.border = '') // Poista rajat

        pairs = [] // Tyhjennä valitut parit
        isImageSelected = false // Nollaa valinta

        feedbackElement.textContent = 'Yhdistä kaikki kuvat ja maat.' // Palauta alkuperäinen palaute
        checkButton.disabled = false
        nextButton.disabled = true
    })

    // Käsittele kuvan valinta
    imageRow.addEventListener('click', (event) => {
        if (isImageSelected) return // Estä usean kuvan valinta peräkkäin
        const clickedImage = event.target
        if (clickedImage.tagName === 'IMG') {
            const game = games[currentGameIndex]
            const index = Array.from(imageRow.querySelectorAll('img')).indexOf(clickedImage)
            const selectedColor = game.colors[index]

            clickedImage.style.border = `5px solid ${selectedColor}`
            pairs.push({ type: 'image', index, color: selectedColor })
            isImageSelected = true // Kuva on nyt valittu
        }
    })

    // Käsittele maan valinta
    countryRow.addEventListener('click', (event) => {
        if (!isImageSelected) return // Estä maan valinta ennen kuvan valintaa
        const clickedCountry = event.target
        // Varmista, että klikkaaja on div ja että se ei ole peliriviä
        if (clickedCountry.tagName === 'DIV' && clickedCountry.parentElement === countryRow) {
            const game = games[currentGameIndex]
            const index = Array.from(countryRow.querySelectorAll('div')).indexOf(clickedCountry)

            let associatedImage = pairs.find(pair => pair.type === 'image' && !pair.used)
            if (associatedImage) {
                clickedCountry.style.border = `5px solid ${associatedImage.color}`
                pairs.push({ type: 'country', index, color: associatedImage.color })
                associatedImage.used = true // Merkkaa kuva käytetyksi
                isImageSelected = false // Nyt voi valita seuraavan kuvan
            }
        }
    })

    // Tarkista vastaukset
    checkButton.addEventListener('click', () => {
        const game = games[currentGameIndex]
        const correctPairs = game.images.map((image, i) => ({
            image: i,
            country: shuffledCountries.indexOf(game.countries[i]) // Käytä sekoitettua järjestystä
        }))

        let correctCount = 0

        pairs.forEach(pair => {
            if (pair.type === 'image') return
            const associatedImage = pairs.find(p => p.type === 'image' && p.color === pair.color)
            if (associatedImage) {
                const isCorrect = correctPairs.some(cp => cp.image === associatedImage.index && cp.country === pair.index)
                if (isCorrect) {
                    correctCount++
                    // Merkitse oikeat vastaukset vihreäksi
                    const correctImage = imageRow.querySelectorAll('img')[associatedImage.index]
                    const correctCountry = countryRow.querySelectorAll('div')[pair.index]
                    correctImage.style.border = `5px solid green`
                    correctCountry.style.border = `5px solid green`
                } else {
                    // Merkitse väärät vastaukset punaiseksi
                    const incorrectImage = imageRow.querySelectorAll('img')[associatedImage.index]
                    const incorrectCountry = countryRow.querySelectorAll('div')[pair.index]
                    incorrectImage.style.border = `5px solid red`
                    incorrectCountry.style.border = `5px solid red`
                }
            }
        })

        score += correctCount

        feedbackElement.textContent = `Sait oikein ${correctCount}/${game.countries.length}!`
        checkButton.disabled = true
        nextButton.disabled = false
        resetButton.disabled = true
    })

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
