(function () {
    var minNumber = 1;
    var maxNumber = 100;
    var aiNumbersLength = 10;
    var userMaxNumbersLength = maxNumber - minNumber - aiNumbers + 1;

    var aiNumbers = [];
    var userNumbers = [];

    window.addEventListener("load", function () {
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

        // ecco la mia funzione all'opera!!!
        var numero = nearBomb(value)

        if (numero === 0) {
            target.classList.add("no-bomb")
        } else {
            target.innerHTML = numero
            target.classList.add("near-bomb")
        }

        if (userNumbers.length === userMaxNumbersLength) {
            onGameOver()
        }
    }

    function nearBomb(clickedValue) {
        // variabili interne alla funzione
        var mybomb
        var counter = 0;

        // casi speciali
        var bordoSx = [];
        var bordoDx = [];

        // questo seerve nel caso voglia un quadrato di lato diverso da 10
        var lato = Math.sqrt(maxNumber, 2);


        // pusho nell' Array di bordi laterali (casi speciali)
        for (var index = 1; index < maxNumber; index = index + lato) {
            bordoSx.push(parseInt(index));
        }
        for (var indice = lato; indice <= maxNumber; indice = indice + lato) {
            bordoDx.push(indice);
        }

        // per ogni bomba
        // cerco i valori vicini -  le variabili "vicino alla bomba" assumono valori numerici
        for (var index = 0; index < aiNumbers.length; index++) {
            mybomb = aiNumbers[index];
            mybomb = parseInt(mybomb);
            var primaDellaBomba = (mybomb - 1);
            var dopoLabomba = (mybomb + 1);
            var sopraLaBomba = (mybomb - (maxNumber / lato));
            var sottolaBomba = (mybomb + (maxNumber / lato));
            var diagSxSopraBomba = (primaDellaBomba - (maxNumber / lato));
            var diagDxSopraBomba = (dopoLabomba - (maxNumber / lato));
            var diagSxSottoBomba = (primaDellaBomba + (maxNumber / lato));
            var diagDxSottoBomba = (dopoLabomba + (maxNumber / lato));


            // escludo i bordi
            if (bordoSx.includes(mybomb) || bordoDx.includes(clickedValue) && (mybomb === (clickedValue + 1))) {
                primaDellaBomba = false;
                diagSxSopraBomba = false;
                diagSxSottoBomba = false;
            }
            if (bordoDx.includes(mybomb) || bordoSx.includes(clickedValue) && (mybomb === (clickedValue - 1))) {
                dopoLabomba = false;
                diagDxSopraBomba = false;
                diagDxSottoBomba = false;
            }


            //  mettto in un Array i valori vicini alle bombe generate
            var nearBombs = [primaDellaBomba, dopoLabomba, sopraLaBomba, sottolaBomba, diagSxSopraBomba, diagDxSopraBomba, diagSxSottoBomba, diagDxSottoBomba];


            // se il valore del click è incluso nell'Array "vicino alle bombe" inietto nel Div il valore del counter
            if (nearBombs.includes(clickedValue)) {
                counter += 1;
                //target.innerHTML = (counter);
            }
        }

        return counter
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
    Crea i numeri iniziali del computer
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



