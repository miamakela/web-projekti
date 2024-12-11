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

    fetch("../js/mia/attractions.json")
        .then(response => response.json())
        .then(data => initGame(data))
        .catch(error => console.error("Error loading JSON:", error))

    function initGame(data) {
        questions = shuffleArray(data)
        getQuestion()
    }

    function shuffleArray(array) {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }

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

    function updateCounter() {
        if (counter) {
            let currentValue = parseInt(counter.textContent)
            counter.textContent = currentValue + 1
        }
    }

    function nextQuestion() {
        currentIndex++
        updateCounter()
        if (currentIndex < questions.length) {
            getQuestion()
        } else {
            endGame()
        }
    }

    function endGame() {
        sessionStorage.setItem("score", score)

        content.innerHTML = `
            <div class="end">
                <h2>Peli päättyi!</h2>
                <p>Sait ${score} pistettä kymmenestä mahdollisesta.</p>
                <button id="homeBtn">Etusivulle</button> <button id="retryBtn">Uusi peli</button>
            </div>
        `
    }

    document.getElementById("homeBtn").addEventListener('click', () => {
        window.location.href = "./index.html"
    })

    document.getElementById("retryBtn").addEventListener('click', () => {
        initGame()
    })
})