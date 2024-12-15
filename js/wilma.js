window.onload = function() {
    const questions = ['Kumpi lipuista on Brazilian lippu?', 'Kumpi lipuista on Suomen lippu?', 'Kumpi lipuista on Ranskan lippu?', 'Kumpi lipuista on Saksan Lippu?', 'Kumpi lipuista on Italian lippu?', 'Kumpi lipuista on Japanin lippu?', 'Kumpi lipuista on Ruotsin lippu?', 'Kumpi lipuista on Englannin lippu?', 'Kumpi lipuista on Amerikan lippu?', 'Kumpi lipuista on Kanadan lippu?'];
    const answers = ['a', 'a', 'b', 'a', 'b', 'b', 'a', 'a', 'b', 'b'];
    const correctAnswers = [
        'Bulgarian lippu.',
        'Intian lippu.',
        'Israelin lippu.',
        'Sudanin lippu.',
        'Turkin lippu.',
        'Vietnamin lippu.',
        'Islannin lippu.',
        'Tanskan lippu.',
        'Kuuban lippu.',
        'Latvian lippu.',
    ];
    let index = 0;
    const maxindex = questions.length - 1;

    const images = document.getElementsByTagName('img');
    const questionHeader = document.getElementById('question');
    const scoreDisplay = document.getElementById('scoreDisplay');

 
    images[1].style.display = 'block';
    images[2].style.display = 'block';


    const replayButton = document.createElement('button');
    replayButton.textContent = 'Pelaa uudelleen';
    replayButton.style.display = 'none';
    replayButton.classList.add('replay-button');
    document.body.appendChild(replayButton);


    replayButton.addEventListener('click', function () {
        index = 0;
        currentScore = 0;
        replayButton.style.display = 'none';
        setImages();
        setQuestion();
        scoreDisplay.textContent = '0/' + questions.length;
        images[1].style.display = 'block';
        images[2].style.display = 'block';
    });

    images[1].addEventListener('click', imageClicked);
    images[2].addEventListener('click', imageClicked);

    setImages();
    setQuestion();

    function setImages() {
        images[1].src = '../img/wilma/' + index + 'a.png';
        images[2].src = '../img/wilma/' + index + 'b.png';
    }

    function setQuestion() {
        questionHeader.textContent = questions[index];
    }

    function imageClicked(event) {
        if (event.currentTarget.name == answers[index]) {
            alert('Oikea vastaus!');
            updateScore();
        } else {
            alert(`Väärin meni. Tämä lippu on ${correctAnswers[index]}`);
        }
        nextQuestion();
    }

    function nextQuestion() {
        index++;
        if (index > maxindex) {
            console.log('game over');
            endGame();
            images[1].style.display = 'none';
            images[2].style.display = 'none';
            replayButton.style.display = 'block';
            questionHeader.textContent = `Hyvin pelattu! Pistemääräsi on ${currentScore}/${maxScore}`;
        } else {
            setImages();
            setQuestion();
        }
    }

    let currentScore = 0;
    const maxScore = questions.length;


    function updateScore() {
        currentScore++;
        scoreDisplay.textContent = `${currentScore}/${maxScore}`;
    }
    
    function endGame() {
        sessionStorage.setItem("pisteet", currentScore)
    }
}