(function() {
    var minNumber = 1;
    var maxNumber = 100;
    var aiNumbersLength = 16;
    var userMaxNumbersLength = maxNumber - minNumber - aiNumbers + 1;

    var aiNumbers = [];
    var userNumbers = [];

    window.addEventListener("load", function() {
        createAiNumbers()

        renderUiBlocks()

        bindEvents()
    })

    function renderUiBlocks() {
        var boardElement = document.querySelector(".board");
        var elementsToAdd = []

        for (var i = minNumber; i <= maxNumber; i++) {
            var isBomb = aiNumbers.includes(i);
            var element = "<div class='single-field' data-bomb='" + isBomb + "' data-value='" + i + "'></div>";

            elementsToAdd.push(element)
        }

        boardElement.innerHTML = elementsToAdd.join("\n");
    }

    function bindEvents() {
        var boardElement = document.querySelector(".board");

        boardElement.addEventListener("click", onSingleElementClick)
    }

    function onSingleElementClick(event) {
        var target = event.target;
        var value = parseInt(target.dataset.value);

        // Se l'utente ha cliccato su un numero già selezionato, ignora il click
        if (userNumbers.includes(value)) {
            return
        }

        if (target.dataset.bomb === "true") {
            target.classList.add("bomb");
            return onGameOver(true)
        }

        userNumbers.push(value);
        target.classList.add("no-bomb")

        if (userNumbers.length === userMaxNumbersLength) {
            onGameOver()
        }
    }

    function onGameOver(isBomb) {
        var boardOverlay = document.querySelector(".board-overlay");
        var matchResultElement = boardOverlay.querySelector(".match-result");
        var message = "BOOM!!!<br>HAI PERSO!"

        if (!isBomb) {
            message = "COMPLIMENTI!!!<br>HAI VINTO!!!"
        }

        boardOverlay.style.display = "flex";
        matchResultElement.innerHTML = message;
    }

    /*
    Funzione che genera numeri random tra il min e il max passati come argomento
    */
    function genarateRandomNumbers(min, max) {
        return Math.floor(Math.random() * (max - min)) + min
    }

    /*
    Crea i numeir iniziali del computer
    Si assicura anche che i numeri non siano doppi
    */
    function createAiNumbers() {
        while (aiNumbers.length < aiNumbersLength) {
            var numeroRandom = genarateRandomNumbers(minNumber, maxNumber);

            if (aiNumbers.indexOf(numeroRandom) === -1) {
                aiNumbers.push(numeroRandom)
            }
        }

        console.log(aiNumbers);
    }
})()