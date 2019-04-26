let cards = [], deck = {}, flippedCard = {}, startedTimer = false, seconds = 0, minutes = 0, matches = 0

startGame()

function startGame() {
    cards = [], deck = {}, flippedCard = {}, startedTimer = false, seconds = 0, minutes = 0, matches = 0
    document.getElementById('cards').innerHTML = ''
    document.getElementById('timer').textContent = '00:00'
    document.getElementById('play-again').style.display = 'none'
    document.getElementById('won').style.display = 'none'
    document.getElementById('give-up').style.display = 'block'
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
        document.getElementById('cards').appendChild(div)
    }
}

function flipCard() {
    if (!startedTimer) {
        timer()
        startedTimer = true
    }
    let div = this
    let card = deck[div.id]
    this.innerHTML = `${ranks[card.rank]}<br>${suits[card.suit]}`
    if (Object.entries(flippedCard).length) {
        if (flippedCard.rank == card.rank) {
            handleMatch(div)
        } else {
            resetCards('', div)
        }
        return
    }
    flippedCard = card
}

function handleMatch(div) {
    matches++
    if (matches > 25) {
        clearTimeout(t)
        document.getElementById('won').textContent = 'You won!'
        document.getElementById('won').style.display = 'block'
        document.getElementById('play-again').style.display = 'block'
        document.getElementById('give-up').style.display = 'none'

    }
    div.style.borderColor = '#00aa00'
    document.getElementById(idFromCard(deck, flippedCard)).style.borderColor = '#00aa00'
    setTimeout(function() {
        div.style.borderColor = '#000000'
        document.getElementById(idFromCard(deck, flippedCard)).style.borderColor =  '#000000'
        flippedCard = {}
    }, 800)
}

function resetCards(text, div) {
    setTimeout(function(div) {
        div.innerHTML = text
        document.getElementById(idFromCard(deck, flippedCard)).innerHTML = text
        flippedCard = {}
    }, 1000, div)
}

function giveUp() {
    let divs = document.getElementsByClassName('card')
    Array.from(divs).forEach(function(div) {
        let card = deck[div.id]
        div.innerHTML = `${ranks[card.rank]}<br>${suits[card.suit]}`
    })
    clearTimeout(t)
    document.getElementById('give-up').style.display = 'none'
    document.getElementById('play-again').style.display = 'block'
    document.getElementById('won').textContent = 'You lost'
    document.getElementById('won').style.display = 'block'
}

function idFromCard(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

let t;
function timer() {
    t = setTimeout(addTime, 1000)
}

function addTime() {
    seconds++;
    if (seconds > 59) {
        seconds = 0
        minutes++;
    }
    document.getElementById('timer').textContent = formatTime(minutes) + ':' + formatTime(seconds)
    timer()
}

function formatTime(time) {
    return (time > 9 ? time : '0' + time)
}
