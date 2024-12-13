document.addEventListener('DOMContentLoaded', () => {
    const games = [
        {
            images: ['../img/kulttuurit/Italia.png', '../img/kulttuurit/Espanja.png', '../img/kulttuurit/Ranska.png', '../img/kulttuurit/Saksa.png'],
            countries: ['Italia', 'Espanja', 'Ranska', 'Saksa'],
            colors: ['magenta', 'yellow', 'blue', 'orange'],
            popoverTexts: [
                'Italia! Italialainen kulttuuri on tunnettu historiastaan, taiteestaan, ruoastaan ja juhlaperinteistään. Ruoka on olennainen osa italialaista elämäntapaa, ja italialaisilla aterioilla nautitaan usein pizzaa, pastaa, risottoa ja herkullisia jälkiruokia kuten tiramisua, gelatoa ja cannoleja. Juomista suositaan espressoa, joka on vahva kahvi, sekä viiniä.',

                'Espanja! Espanjalainen kulttuuri on värikäs ja rikas, täynnä historiaa, taidetta ja perinteitä. Se tunnetaan flamenco-tanssista, härkätaisteluista ja juhlaperinteistä, kuten La Tomatinasta ja Feria de Abrilista. Ruoka on tärkeä osa kulttuuria, ja tunnettuja ruokia ovat paella, tapas ja churrot suklaakastikkeen kanssa. Espanja on myös viininviljelyn suurmaa. Musiikki, tanssi ja yhteisöllisyys ovat espanjalaisen elämäntavan ytimessä.',

                'Ranska! Ranskan kulttuuri on tunnettu eleganssistaan, taiteestaan ja historiastaan. Ranska on muodin, kulinaaristen herkkujen ja viininviljelyn keskus. Tunnettuja ruokia ovat patonki, croissant, juustot ja ratatouille, ja viinejä, kuten Bordeaux ja Champagne, arvostetaan ympäri maailmaa. Ranska on myös kuuluisa monumenteistaan, kuten Eiffel-torni ja Versailles, sekä taiteilijoistaan ja kirjailijoistaan. Juhlat ja perinteet, kuten Bastiljin päivä, yhdistävät ihmisiä.',

                'Saksa! Saksan kulttuuri on rikas ja monipuolinen, tunnettu historiastaan, tieteestään ja perinteistään. Se yhdistetään kuuluisaan musiikkiin, kuten Beethovenin ja Bachin teoksiin, sekä kirjallisuuteen ja filosofiaan. Saksassa juhlitaan perinteisiä tapahtumia, kuten Oktoberfestia, jossa korostuvat olutkulttuuri ja paikalliset ruoat, kuten pretzelit, bratwurst ja hapankaali. Arkkitehtuuri vaihtelee keskiaikaisista linnoista moderneihin kaupunkirakennuksiin, ja joulumarkkinat ovat suosittu osa talvikulttuuria.'
            ]
        },
        {
            images: ['../img/kulttuurit/Yhdysvallat.png', '../img/kulttuurit/Meksiko.png', '../img/kulttuurit/Australia.png', '../img/kulttuurit/Brasilia.png'],
            countries: ['Yhdysvallat', 'Meksiko', 'Australia', 'Brasilia'],
            colors: ['purple', 'orange', 'lime', 'pink'],
            popoverTexts: [
                'Yhdysvallat! Yhdysvaltain kulttuuri on monimuotoinen ja sekoitus eri maiden vaikutteita, sillä maa on muodostunut monista maahanmuuttajien ryhmistä. Se tunnetaan popkulttuuristaan, kuten Hollywood-elokuvista, musiikkityyleistä kuten jazz, rock ja hip-hop, sekä urheilulajeista, kuten amerikkalaisesta jalkapallosta ja baseballista. Ruokakulttuuriin kuuluvat hampurilaiset, hot dogit ja barbecue, mutta myös monien kansainvälisten keittiöiden vaikutteet. Yhdysvalloissa arvostetaan yksilönvapautta, innovaatioita ja yhteisöllisiä juhlia, kuten Kiitospäivää ja itsenäisyyspäivää.',

                'Meksiko! Meksikon kulttuuri on värikäs ja täynnä perinteitä, yhdistäen alkuperäiskansojen ja espanjalaisten vaikutteita. Se tunnetaan mariachi-musiikista, värikkäistä juhlista, kuten Día de los Muertos (Kuolleiden päivä), ja perinteisistä tansseista. Ruokakulttuuri on keskeinen osa elämää, ja suosittuja ruokia ovat taco, enchilada, guacamole ja tamale. Juomista tunnetaan erityisesti tequila ja horchata. Meksikossa arkkitehtuuri vaihtelee muinaisista mayojen ja atsteekkien temppeleistä siirtomaa-ajan rakennuksiin. Yhteisöllisyys ja perhe ovat kulttuurin ytimessä.',

                'Australia! Australian kulttuuri on monimuotoinen, yhdistäen alkuperäiskansojen, aboriginaalien, rikkaan perinnön ja maahanmuuton tuomat vaikutteet. Aboriginaalien taide, kuten maalaus ja didgeridoo-musiikki, on tärkeä osa maan historiaa. Australialaiset arvostavat ulkoilmaelämää, urheilua, kuten krikettiä ja australialaista jalkapalloa, sekä rentoa elämäntyyliä. Ruokakulttuurissa korostuvat grilliruoat, kuten "barbie", tuoreet merenelävät ja lamingtonit jälkiruokana. Yhteisöllisyys ja luonnon kunnioitus ovat keskeisiä piirteitä kulttuurissa.',

                'Brasilia! Brasilian kulttuuri on monimuotoinen ja rikas, yhdistäen alkuperäiskansojen, afrikkalaisten ja eurooppalaisten vaikutteita. Maa tunnetaan värikkäästä sambasta, karnevaaleista ja jalkapallosta, joka on brasilialaisten intohimo. Ruokakulttuuriin kuuluvat feijoada (pataruoka), pão de queijo (juustoleipä) ja tuoreet trooppiset hedelmät. Juomista suosittuja ovat caipirinha ja guaraná. Luonto ja yhteisöllisyys ovat tärkeä osa brasilialaista elämäntapaa, ja juhlat sekä musiikki ovat keskeisessä roolissa arjessa.',
            ]
        },
        {
            images: ['../img/kulttuurit/Kiina.png', '../img/kulttuurit/Intia.png', '../img/kulttuurit/Egypti.png', '../img/kulttuurit/Etelä-Afrikka.png'],
            countries: ['Kiina', 'Intia', 'Egypti', 'Etelä-Afrikka'],
            colors: ['brown', 'cyan', 'magenta', 'lime'],
            popoverTexts: [
                'Kiina! Kiinan kulttuuri on yksi maailman vanhimmista ja monimuotoisimmista, juontuen yli 5000 vuoden takaa. Se tunnetaan perinteisistä arvoistaan, kuten perhesiteistä, kunnioituksesta vanhempia kohtaan ja henkisyydestä. Kiinassa on rikas taideperinne, johon kuuluu maalausta, kalligrafiaa ja teatteria, kuten Peking-ooppera. Kiinalainen keittiö on monipuolinen ja mausteinen, ja tunnetuimpia ruokia ovat dim sum, pekonisiat, dumplingit ja riisiruokia. Kiinalainen uusi vuosi ja muut juhlapäivät, kuten Lantern-festivaali, ovat tärkeitä kulttuuriin kuuluvia tapahtumia.',

                'Intia! Intia on tunnettu värikkäistä perinteistään, juhlistaan ja henkisyydestään. Maa on koti jooga- ja meditaatioperinteille sekä monille uskonnollisille juhlapäiville, kuten Diwali ja Holi. Intialainen keittiö on mausteinen ja monipuolinen, suosittuja ruokia ovat curry, biryani, naan-leipä ja dosa. Juomista tunnetaan erityisesti chai (maustettu tee) ja lassi (jogurttijuoma). Taide, musiikki ja tanssit, kuten Bollywood-elokuvat, klassinen Bharatanatyam-tanssi ja hindulainen temppeliarkkitehtuuri, ovat tärkeä osa kulttuuria. Perhe ja yhteisöllisyys ovat kulttuurin ytimessä.',

                'Egypti! Egyptin kulttuuri on rikas ja historiallinen, juontuen muinaisen Egyptin ajoista. Maa tunnetaan pyramideistaan, sfinksistä ja Niilin merkityksestä. Perinteisiin kuuluu taide, kuten arabeskit ja kalligrafia, sekä musiikki ja tanssi, kuten perinteinen tanssi raqs sharqi. Egyptiläinen keittiö tarjoaa ruokia, kuten ful medames (pavut), koshari (riisi ja linssit) ja ta’amiyya (egyptiläinen falafel). Juomista suosittuja ovat karkade (hibiskustee) ja minttutee. Perhe ja uskonto ovat keskeisiä kulttuurissa, ja islamin ja kristinuskon vaikutukset näkyvät arjessa ja juhlapäivissä.',

                'Etelä-Afrikka! Etelä-Afrikan kulttuuri on monimuotoinen ja monikulttuurinen, sillä maassa asuu useita etnisiä ryhmiä, kuten zuluja, xhosa ja afrikanereita. Maan historiaan kuuluu apartheid, mutta tänä päivänä Etelä-Afrikka on tunnettu sen monikielisyydestä ja kansan yhtenäisyydestä. Taide, kuten musiikki (esim. jazz ja mbaqanga) ja tanssi, ovat tärkeä osa kulttuuria. Ruokakulttuuriin kuuluvat ruokalajit, kuten biltong (kuivattu liha), bobotie (liha- ja munakastike) ja braai (grilliruoka). Etelä-Afrikka on myös tunnettu luonnonkauniista maisemista ja villieläimistä, joita juhlistetaan safareilla ja luonnonpuistoissa.',
            ]  
        }
    ]

    let currentGameIndex = 0
    let pairs = []
    let shuffledCountries = []
    let score = 0
    let isImageSelected = false
    let isChecked = false


    const feedbackElement = document.getElementById('feedback')
    const gameRoundElement = document.getElementById('gameRound')
    const checkButton = document.getElementById('check-button')
    const nextButton = document.getElementById('next-button')
    const imageRow = document.getElementById('image-row')
    const countryRow = document.getElementById('country-row')
    const resetButton = document.getElementById('reset-button')
    // Valitse kaikki kuvat, joilla on tooltipejä
    const images = document.querySelectorAll('img')

    // Poista Bootstrap-tooltipit kaikista kuvista
    images.forEach(image => {
        image.removeAttribute('data-bs-toggle') // Jos käytetään Bootstrap v5+ tooltipejä
        image.removeAttribute('title') // Poistaa title-tekstin
    })


    // Poista kaikki popover-toiminnallisuudet alussa
    document.querySelectorAll('[data-bs-toggle="popover"]').forEach(el => {
    el.removeAttribute('data-bs-toggle')
    })
    
    function resetBorders() {
        const imageElements = imageRow.querySelectorAll('img')
        imageElements.forEach(img => img.style.border = '') // Poista kaikki rajat kuvista

        const countryElements = countryRow.querySelectorAll('div')
        countryElements.forEach(div => div.style.border = '') // Poista kaikki rajat maista
    }

    //Funktio pisteiden lisäykseen. Toimiiko?
    function addPoints(){
       sessionStorage.setItem('game2', score.toString())
    }
    
    // Päivitä peli
    function updateGame() {
        const game = games[currentGameIndex]

        resetBorders()

        // Päivitä kuvat
        const imageElements = imageRow.querySelectorAll('img')
        game.images.forEach((src, index) => {
            const img = imageElements[index]
            img.src = src
        });

        // Sekoita maat ja päivitä taulukko
        shuffledCountries = game.countries.slice().sort(() => Math.random() - 0.5)
        const countryElements = countryRow.querySelectorAll('div')
        shuffledCountries.forEach((name, index) => {
            countryElements[index].textContent = name
        });

        // Nollaa valinnat
        pairs = []
        isImageSelected = false
        isChecked = false
        checkButton.disabled = false
        nextButton.disabled = true
        resetButton.disabled = false

        // Päivitä kierrosteksti
        gameRoundElement.textContent = `Peli ${currentGameIndex + 1}/3`

        // Päivitä palaute
        feedbackElement.textContent = 'Yhdistä kaikki kuvat ja maat klikkaamalla ensin kuvaa ja sitten maan nimeä.'
    }

    // Tyhjennä valinnat
    resetButton.addEventListener('click', () => {
        const imageElements = imageRow.querySelectorAll('img')
        imageElements.forEach(img => img.style.border = '')

        const countryElements = countryRow.querySelectorAll('div')
        countryElements.forEach(div => div.style.border = '')

        pairs = []
        isImageSelected = false

        feedbackElement.textContent = 'Yhdistä kaikki kuvat ja maat klikkaamalla ensin kuvaa ja sitten maan nimeä.'
        checkButton.disabled = false
        nextButton.disabled = true
    })

    // Käsittele kuvan valinta
    imageRow.addEventListener('click', (event) => {
        if (isChecked || isImageSelected) return
        const clickedImage = event.target
        if (clickedImage.tagName === 'IMG') {
            const game = games[currentGameIndex]
            const index = Array.from(imageRow.querySelectorAll('img')).indexOf(clickedImage)
            const selectedColor = game.colors[index]
            clickedImage.style.border = `5px solid ${selectedColor}`

            // Varmistetaan, että värillä ei ole muuta käyttökohdetta. Jos väri on jo käytössä, estetään valinta
            if (pairs.some(pair => pair.color === selectedColor)) {
                return
            }

            pairs.push({ type: 'image', index, color: selectedColor })
            isImageSelected = true
        }
    })

    // Käsittele maan valinta
    countryRow.addEventListener('click', (event) => {
        if (isChecked || !isImageSelected) return
        const clickedCountry = event.target
        if (clickedCountry.tagName === 'DIV' && clickedCountry.parentElement === countryRow) {
            const game = games[currentGameIndex]
            const index = Array.from(countryRow.querySelectorAll('div')).indexOf(clickedCountry)
            let associatedImage = pairs.find(pair => pair.type === 'image' && !pair.used)
            if (associatedImage) {
                clickedCountry.style.border = `5px solid ${associatedImage.color}`
                pairs.push({ type: 'country', index, color: associatedImage.color })
                associatedImage.used = true
                isImageSelected = false
            }
        }
    })

    // Käsittele tarkistuspainikkeen toiminta
    checkButton.addEventListener('click', () => {
        const game = games[currentGameIndex]
        const correctPairs = game.images.map((image, i) => ({
            image: i,
            country: shuffledCountries.indexOf(game.countries[i])
        }))
    
        let correctCount = 0

        // Poista vanhat popoverit
        const imageElements = imageRow.querySelectorAll('img')
        imageElements.forEach((img) => {
            const instance = bootstrap.Popover.getInstance(img)
            if (instance) {
                instance.dispose()
            }
        })
    
        game.images.forEach((_, imageIndex) => {
            const imageElement = imageRow.querySelectorAll('img')[imageIndex];
            const correctCountryIndex = correctPairs.find(pair => pair.image === imageIndex).country
            const associatedPair = pairs.find(pair => pair.type === 'country' && pair.color === pairs.find(p => p.type === 'image' && p.index === imageIndex)?.color)
    
            if (associatedPair) {
                const isCorrect = associatedPair.index === correctCountryIndex
                const countryElement = countryRow.querySelectorAll('div')[associatedPair.index]
    
                if (isCorrect) {
                    correctCount++
                    imageElement.style.border = `5px solid green`
                    countryElement.style.border = `5px solid green`
                } else {
                    imageElement.style.border = `5px solid red`
                    countryElement.style.border = `5px solid red`
                }
            }
            // Luo popover tarkistuksen jälkeen
            const popover = new bootstrap.Popover(imageElement, {
                content: game.popoverTexts[imageIndex],
                trigger: 'click',
                placement: 'right',
                fallbackPlacements: ['bottom'] // Varmista selkeä asettelu
            })
        })
    
        score += correctCount;
        feedbackElement.textContent = `Sait oikein ${correctCount}/${game.countries.length}! Klikkaa kuvaa nähdäksesi oikea vastaus ja oppiaksesi lisää maan kulttuurista!`

        isChecked = true
        checkButton.disabled = true
        nextButton.disabled = false
        resetButton.disabled = true
    })  

    // SEURAAVA-PAINIKE -> Siirry seuraavaan peliin. Poista kaikki avoimet popoverit
    nextButton.addEventListener('click', () => {
    const imageElements = imageRow.querySelectorAll('img')
    imageElements.forEach((img) => {
        const instance = bootstrap.Popover.getInstance(img)
        if (instance) {
            instance.dispose()
        }
    })

        resetBorders()
        if (currentGameIndex < games.length - 1) {
            currentGameIndex++
            updateGame()
        } else {
            feedbackElement.textContent = `Peli päättyi! Kokonaispistemääräsi on: ${score}/${games.length * 4}`
            checkButton.disabled = true
            nextButton.disabled = true
        }
        addPoints() //Kokeilu, lisätään pisteet session storageen. Toimiiko?
    })

    // Käynnistä ensimmäinen peli
    updateGame()
})