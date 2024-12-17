document.addEventListener("DOMContentLoaded", () => {

    let currentIndex = 0
    let score = 0
    let questions = []
    let counter = document.querySelector("#counter span")
    let options = document.querySelectorAll(".option")
    let content = document.getElementById("content")
    let answerArea = document.getElementById("answerArea")
    let img = document.getElementById("wonder")
    let tip = document.getElementById("tip")
    let funFact = document.getElementById("funFact")

    /* Haetaan json-tiedosto, virheenkäsittelyä*/
    fetch("../js/mia/attractions.json")
        .then(response => response.json())
        .then(data => initGame(data))
        .catch(error => console.error("Error loading JSON:", error))

    function initGame(data) {
        questions = shuffleArray(data)
        getQuestion()
    }

    /* Funktio, joka sekoittaa kysymysten järjestyksen */
    function shuffleArray(array) {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }

    /* Haetaan nykyistä indexiä vastaava kysymys, sijoitetaan tip spaniin vinkki, 
    määritellään kuvan lähde ja annetaan sille class, joka tyyleisssä tekee kuvasta epäselvän.
    Sijoitetaan vastausvaihtoehdot ja tapahtuma sen painamiseen. Tyhjennetään funfact span. 
    Määritetään painike, jolla pääsee seuraavaan kysymykseen, joka katoaa sitä painettaessa.*/
    function getQuestion() {
        const question = questions[currentIndex]
        tip.textContent = question.tip

        img.src = question.img
        img.classList.add("imgBeforeGuess")

        options.forEach((option, index) => {
            option.textContent = question.options[index]
            option.className = "option"
            option.onclick = () => checkAnswer(index)
        })

        funFact.textContent = ''

        const next = document.getElementById("nextQuestionBtn")
        if (next) next.remove()
    }

    /* Haetaan nykyistä indexiä vastaava kysymys. Määritellään oikean vastauksen indexi. 
    Annetaan oikealle ja väärälle vastaukselle classit, jotka css:ssä saavat värit vihreä ja punainen.
    Jos vastaus oikein, kasvatetaan scorea. 
    Poistetaan kuvasta class, jotta alkuperäinen kuva tulee näkyviin ja sijoitetaan hauska fakta nähtävyydestä funfact spaniin.
    Luodaan painike, joka ilmestyy vastauksen jälkeen ja vie seuraavaan kysymykseen.*/
    function checkAnswer(selectedIndex) {
        const question = questions[currentIndex]

        const correctIndex = parseInt(question.correct)

        options.forEach((option, index) => {
            option.onclick = null
            if (index === correctIndex) {
                option.classList.add("correct")
            } else if (index === selectedIndex) {
                option.classList.add("incorrect")
            }
        })

        if (selectedIndex === correctIndex) {
            score++
        }

        img.classList.remove("imgBeforeGuess")
        funFact.textContent = question.funFact

        const next = document.createElement("button")
        next.id = "nextQuestionBtn"
        next.className = "flex-direction row"
        next.textContent = "Seuraava"
        next.onclick = nextQuestion
        answerArea.appendChild(next)
    }

    /* Funktio, joka päivittää kuinka mones kysymys on menossa.*/
    function updateCounter() {
        if (counter) {
            let currentValue = parseInt(counter.textContent)
            counter.textContent = currentValue + 1
        }
    }
    
    /* Funktio joka hakee seuraavan kysymyksen ja pitää huolta siitä, että peli loppuu, kun kysymykset loppuvat.
    Jos kysymyksiä ei ole jäljellä, peli loppuu. */
    function nextQuestion() {
        currentIndex++
        updateCounter()
        if (currentIndex < questions.length) {
            getQuestion()
        } else {
            endGame()
        }
    }

     /* Funktio pelin päättymiseen. 
     Viedään pisteet sessionstorageen.
     Kerrotaan pelaajalle paljonko pisteitä hän sai ja luodaan painikkeet, joilla pääsee etusivulle, pelaamaan uudestaan tai seuraavaan peliin (liput).
     Määritellään, mitä tapahtuu kun painikkeita painetaan. */
    function endGame() {
        sessionStorage.setItem("peli3", score.toString())

        content.innerHTML = `
            <div class="end d-block my-auto">
                <h2>Peli päättyi!</h2>
                <p>Sait ${score} pistettä kymmenestä mahdollisesta.</p>
                <div class="buttons">
                    <button id="homeBtn">Etusivulle</button>
                    <button id="retryBtn">Uusi peli</button>
                    <button id="nextBtn">Seuraava peli</button>
                </div>
            </div>
        `
        document.getElementById("homeBtn").addEventListener('click', () => {
        window.location.href = "../index.html"
        })

        document.getElementById("retryBtn").addEventListener('click', () => {
            location.reload()
        })

        document.getElementById("nextBtn").addEventListener('click', () => {
            window.location.href = "../sivut/wilma.html"
            })
        }
})

//Tässä koodissa on hyödynnetty tekoälyn esimerkkejä ratkaisujen teossa (Chat GPT, Claude AI).