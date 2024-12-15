document.addEventListener("DOMContentLoaded", function() {
    const countries = [
        {src: '../img/johanna/1.png', country: 'Espanja', correct: 'Espanja', hint: 'Suosittu lomakohde ja tunnettu tapaksesta.'},
        {src: '../img/johanna/2.png', country: 'Japani', correct: 'Japani', hint: 'Tunnettu kirsikankukista ja sushista.'},
        {src: '../img/johanna/3.png', country: 'Islanti', correct: 'Islanti', hint: 'Tyypillinen piirre on geoterminen lämpö ja tunnettu kuumista lähteistä.'},
        {src: '../img/johanna/4.png', country: 'Yhdysvallat', correct: 'Yhdysvallat', hint: 'Täällä on tunnettuja nähtävyyksiä kuten tämä Grand Canyon tai esimerkiksi Vapaudenpatsas'},
        {src: '../img/johanna/5.png', country: 'Australia', correct: 'Australia', hint: 'Upeita hiekkarantoja ja hyvät surffailu mahdollisuudet.'},
        {src: '../img/johanna/6.png', country: 'Kiina', correct: 'Kiina', hint: 'Tunnettu lohikäärmesymboleista ja keisareista.'},
        {src: '../img/johanna/7.png', country: 'Arktinen alue', correct: 'Arktinen alue', hint: 'Tunnettu äärimmäisestä kylmyydestä ja siellä sijaitsee pohjoisnapa.'},
        {src: '../img/johanna/8.png', country: 'Suomi', correct: 'Suomi', hint: 'Täällä tiedetään joulupukin asuvan.'},
        {src: '../img/johanna/9.png', country: 'Sahara', correct: 'Sahara', hint: 'Maailman suurin kuuma aavikko, jossa kameli on tärkeä kulkuväline.'},
        {src: '../img/johanna/10.png', country: 'Afrikka', correct: 'Afrikka', hint: 'Tämä maanosa on koti monille tunnetuille eläimille, kuten kuvassa oleville.'}
    ];

    let currentImageIndex = 0;
    let score = 0; 

    const countryContainer = document.getElementById("countries"); 
    const dropArea = document.getElementById("drop-area");
    const pageNumber = document.getElementById("page-number");
    const gameOverElement = document.getElementById("game-over");
    const finalScore = document.getElementById("final-score");

    function endGame() {
        sessionStorage.setItem("score", score)

    function showImage() {

        if (currentImageIndex >= countries.length) {

            const gameElement = document.getElementById("game"); 
            const imageNumberElement = document.getElementById("image-number");
            gameElement.style.display = "none";
            imageNumberElement.style.display = "none";
            gameOverElement.style.display = "block";
            finalScore.textContent = `Sait oikein ${score}/${countries.length}. Hyvin tehty!`;
            hintContainer.style.display = "none";
            return;
        }

        const countryImage = countries[currentImageIndex];

        dropArea.style.backgroundImage = `url(${countryImage.src})`;

        pageNumber.textContent = `Kuva ${currentImageIndex + 1}/10`;

        countryContainer.innerHTML = ''; 
        let options = new Set([countryImage]);      //vaihtoehdot https://www.w3schools.com/jsref/jsref_obj_set.asp
        while (options.size < 4) { 
            const randomCountry = countries[Math.floor(Math.random() * countries.length)];
            options.add(randomCountry); 
        }
        
        options = Array.from(options);   // sort-metodi https://www.w3schools.com/js/js_array_sort.asp#mark_sort
        options.sort(() => Math.random() - 0.5);

        options.forEach(countryItem => {
            const countryElement = document.createElement("div");
            countryElement.classList.add("country");
            countryElement.textContent = countryItem.country;
            countryElement.draggable = true;
        
            
            countryElement.addEventListener("dragstart", function(event) {
                event.dataTransfer.setData("text", countryItem.country);
            });
        
            countryContainer.appendChild(countryElement);
        });
        
    }

    dropArea.addEventListener("dragover", function(event) {
        event.preventDefault();   //w3school
    });

    dropArea.addEventListener("drop", function(event) {
        event.preventDefault();
        const countryName = event.dataTransfer.getData("text");
        const selectedCountry = countries.find(c => c.country === countryName);
        const currentCountry = countries[currentImageIndex];

        if (selectedCountry && selectedCountry.country === currentCountry.correct) {  //pekan materiaali
            alert("Hienosti! Valitsit oikein: " + selectedCountry.country);
            score++;

            const hintContainer = document.getElementById("hint");
            hintContainer.style.display = "none";

        } 
        else {
            alert("Nyt ei mennyt oikein. Oikea vastaus on: " + currentCountry.correct);

            const hintContainer = document.getElementById("hint");
            hintContainer.style.display = "none";
        }

        currentImageIndex++;
        showImage();
    });

    const hintButton = document.getElementById("hint-button");
    const hintText = document.getElementById("hint-text");
    const hintContainer = document.getElementById("hint");

    hintButton.addEventListener("click", function() {
        const currentCountry = countries[currentImageIndex];
        hintText.textContent = currentCountry.hint;  // Asetetaan vihje
        hintContainer.style.display = "block";  // Näytetään vihje
    });

    showImage();
});