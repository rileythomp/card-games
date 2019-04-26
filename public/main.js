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

document.getElementById('home').addEventListener('click', function() {
    document.location.href = "index.html"
})

function highlightCard() {
    this.style.backgroundColor = '#D4D4D2'
}

function unhighlightCard() {
    this.style.backgroundColor = '#EDEDEC'
}

let cardDivs = document.getElementsByClassName('card')

Array.from(cardDivs).forEach(function(cardDiv) {
    cardDiv.addEventListener('mousedown', highlightCard)
    cardDiv.addEventListener('mouseup', unhighlightCard)
    cardDiv.addEventListener('mouseout', unhighlightCard)
})
