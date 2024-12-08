document.addEventListener("DOMContentLoaded", function() {
    const countries = [
        {src: './johannaimg/1.png', country: 'Espanja', correct: 'Espanja'},
        {src: './johannaimg/2.png', country: 'Japani', correct: 'Japani'},
        {src: './johannaimg/3.png', country: 'Islanti', correct: 'Islanti'},
        {src: './johannaimg/4.png', country: 'Yhdysvallat', correct: 'Yhdysvallat'},
        {src: './johannaimg/5.png', country: 'Australia', correct: 'Australia'},
        {src: './johannaimg/6.png', country: 'Kiina', correct: 'Kiina'},
        {src: './johannaimg/7.png', country: 'Arktinen alue', correct: 'Arktinen alue'},
        {src: './johannaimg/8.png', country: 'Suomi', correct: 'Suomi'},
        {src: './johannaimg/9.png', country: 'Sahara', correct: 'Sahara'},
        {src: './johannaimg/10.png', country: 'Afrikka', correct: 'Afrikka'}
    ];

    let currentImageIndex = 0;

    const countryContainer = document.getElementById("countries"); 
    const dropArea = document.getElementById("drop-area");
    const pageNumber = document.getElementById("page-number");

    function showImage() {
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

            currentImageIndex = (currentImageIndex + 1) % countries.length;
            showImage();
        } 
        else {
            alert("Nyt ei mennyt oikein. Yritä uudelleen.");
        }
    });

    showImage();
});
