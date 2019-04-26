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
