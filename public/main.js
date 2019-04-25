let ranks = {
    0: 'A',
    1: '2',
    2: '3',
    3: '4',
    4: '5',
    5: '6',
    6: '7',
    7: '8',
    8: '9',
    9: '10',
    10: 'J',
    11: 'Q',
    12: 'K'
}

let suits = {
    0: '♥',
    1: '♦',
    2: '♠',
    3: '♣'
}


let cards = [], deck = {}, flippedCard = {}, startedTimer = false, seconds = 0, minutes = 0, matches = 0

startGame()

function highlightCard() {
    this.style.backgroundColor = '#D4D4D2'
}

function unhighlightCard() {
    this.style.backgroundColor = '#EDEDEC'
}

function flipCard() {
    if (!startedTimer) {
        timer()
        startedTimer = true
    }

    let div = this
    let card = deck[div.id]
    this.innerHTML = `${ranks[card.rank]} <br> ${suits[card.suit]}`
    if (Object.entries(flippedCard).length) {
        if (flippedCard.rank == card.rank) {
            flippedCard = {}
            matches++
            console.log(matches)
            if (matches > 0) {
                clearTimeout(t)
                document.getElementById('play-again').style.display = 'block'
                document.getElementById('won').style.display = 'block'
            }
        } else {
            resetCards('', div)
        }
        return
    }
    flippedCard = card
}

function idFromCard(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

function resetCards(text, div) {
    setTimeout(function(div) {
        div.innerHTML = text
        document.getElementById(idFromCard(deck, flippedCard)).innerHTML = text
        flippedCard = {}
    }, 1000, div)
}

function formatTime(time) {
    return (time > 10 ? time : '0' + time)
}

function addTime() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0
        minutes++;
    }
    document.getElementById('timer').textContent = formatTime(minutes) + ':' + formatTime(seconds)
    timer()
}

function timer() {
    t = setTimeout(addTime, 1000)
}

function startGame() {
    cards = [], deck = {}, flippedCard = {}, startedTimer = false, seconds = 0, minutes = 0, matches = 0
    document.getElementById('cards').innerHTML = ''
    document.getElementById('timer').textContent = '00:00'
    for (let i = 0; i < 52; ++i) {
        cards.push({rank: i%13, suit: i%4})
    }

    for (let i = 0; i < 52; ++i) {
        let rand = Math.floor(Math.random() * (52 - i))
        deck[i] = cards[rand]
        cards.splice(rand, 1)

        let div = document.createElement('div')
        div.setAttribute('id', i)
        div.setAttribute('class', 'card')
        div.addEventListener('click', flipCard)
        div.addEventListener('mousedown', highlightCard)
        div.addEventListener('mouseup', unhighlightCard)
        div.addEventListener('mouseout', unhighlightCard)
        document.getElementById('cards').appendChild(div)
    }
}
