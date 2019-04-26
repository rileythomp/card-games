let cards = [], deck = []

for (let i = 0; i < 52; ++i) {
    cards.push({rank: i%13, suit: i%4})
}

for (let i = 0; i < 52; ++i) {
    let rand = Math.floor(Math.random() * (52 - i))
    deck.push(cards[rand])
    cards.splice(rand, 1)
}

document.getElementById('computer').removeEventListener('click', function() {console.log('removed cpu card click')})

let playerDeck = deck.slice(0, 26)
let computerDeck = deck.slice(26, 52)

document.getElementById('player').addEventListener('click', function () {
    let playerCard = playerDeck.shift()
    let computerCard = computerDeck.shift()

    document.getElementById('player-show').innerHTML = `${ranks[playerCard.rank]}<br>${suits[playerCard.suit]}`
    document.getElementById('computer-show').innerHTML = `${ranks[computerCard.rank]}<br>${suits[computerCard.suit]}`
    document.getElementById('player-show').style.display = 'grid'
    document.getElementById('computer-show').style.display = 'grid'

    setTimeout(function() {
        if (playerCard.rank > computerCard.rank) {
            document.getElementById('player-show').style.borderColor = '#00aa00'
        }
        else if (computerCard.rank > playerCard.rank) {
            document.getElementById('computer-show').style.borderColor = '#00aa00'
        }
        else {
            // handle war
        }
    }, 500)

    setTimeout(function() {
        if (playerCard.rank > computerCard.rank) {
            playerDeck.push(playerCard, computerCard)
        } 
        else if (computerCard.rank > playerCard.rank) {
            computerDeck.push(playerCard, computerCard)
        } 
        else {
            // handle war
        }

        updateCardCounts()
        
        document.getElementById('player-show').style.display = 'none'
        document.getElementById('computer-show').style.display = 'none'
        document.getElementById('player-show').style.borderColor = '#000000'            
        document.getElementById('computer-show').style.borderColor = '#000000'
    }, 1500)
})

function updateCardCounts() {
    document.getElementById('player-count').textContent = playerDeck.length
    document.getElementById('computer-count').textContent = computerDeck.length
}
