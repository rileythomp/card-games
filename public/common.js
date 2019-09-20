const ranks = {
    0: '2',
    1: '3',
    2: '4',
    3: '5',
    4: '6',
    5: '7',
    6: '8',
    7: '9',
    8: '10',
    9: 'J',
    10: 'Q',
    11: 'K',
    12: 'A',
}

const suits = {
    0: '♥',
    1: '♦',
    2: '♠',
    3: '♣'
}

let buttons = document.getElementsByTagName('button')
Array.from(buttons).forEach(function(button) {
    button.addEventListener('mousedown', highlight)
    button.addEventListener('mouseup', unhighlight)
    button.addEventListener('mouseout', unhighlight)
})

function highlight() {
    this.style.backgroundColor = '#D4D4D2'
}

function unhighlight() {
    this.style.backgroundColor = '#EDEDEC'
}

let cardDivs = document.getElementsByClassName('card')

Array.from(cardDivs).forEach(function(cardDiv) {
    cardDiv.addEventListener('mousedown', highlight)
    cardDiv.addEventListener('mouseup', unhighlight)
    cardDiv.addEventListener('mouseout', unhighlight)
})

document.getElementById('home').addEventListener('click', function() {
    document.location.href = '../index.html'
})

function gameOverDisplay() {
    document.getElementById('give-up').style.display = 'none'
    document.getElementById('play-again').style.display = 'block'
    document.getElementById('won').textContent = 'You lost'
    document.getElementById('won').style.display = 'block'
}

function clearGameOverDisplay() {
    document.getElementById('play-again').style.display = 'none'
    document.getElementById('won').style.display = 'none'
    document.getElementById('give-up').style.display = 'block'
}

function formatTime(time) {
    return (time > 9 ? time : '0' + time)
}

let t;
function timer() {
    t = setTimeout(addTime, 1000)
}

function idFromCard(object, value) {
    return Object.keys(object).find(key => object[key] === value);
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


