let cards = [], deck = [], playerDeck = [], computerDeck = [], playerCard = {}, computerCard = {}

startGame()

function startGame() {
    cards = [], deck = [], playerDeck = [], computerDeck = [], playerCard = {}, computerCard = {}

    for (let i = 0; i < 52; ++i) {
        cards.push({rank: i%13, suit: i%4})
    }
    
    for (let i = 0; i < 52; ++i) {
        let rand = Math.floor(Math.random() * (52 - i))
        deck.push(cards[rand])
        cards.splice(rand, 1)
    }
    
    playerDeck = deck.slice(0, 26)
    computerDeck = deck.slice(26, 52)

    document.getElementById('play-again').style.display = 'none'
    document.getElementById('won').style.display = 'none'
    document.getElementById('give-up').style.display = 'block'
    document.getElementById('player-count').textContent = 26
    document.getElementById('computer-count').textContent = 26
    let warDivs = document.getElementsByClassName('war-cards')
    Array.from(warDivs).forEach(function(warDiv) {
        warDiv.innerHTML = ''
    })
}

function updateCardCounts() {
    document.getElementById('player-count').textContent = playerDeck.length
    document.getElementById('computer-count').textContent = computerDeck.length
}

function checkWin(n) {
    if (playerDeck.length < n) {
        document.getElementById('player-show').style.display = 'none'
        document.getElementById('computer-show').style.display = 'none'
        document.getElementById('player-show').style.borderColor = '#000000'            
        document.getElementById('computer-show').style.borderColor = '#000000'
        document.getElementById('won').textContent = 'You lost'
        document.getElementById('won').style.display = 'block'
        document.getElementById('play-again').style.display = 'block'
        document.getElementById('give-up').style.display = 'none'
    }
    else if (computerDeck.length < n) {
        document.getElementById('player-show').style.display = 'none'
        document.getElementById('computer-show').style.display = 'none'
        document.getElementById('player-show').style.borderColor = '#000000'            
        document.getElementById('computer-show').style.borderColor = '#000000'
        document.getElementById('won').textContent = 'You won!'
        document.getElementById('won').style.display = 'block'
        document.getElementById('play-again').style.display = 'block'
        document.getElementById('give-up').style.display = 'none'
        let warDivs = document.getElementsByClassName('war-cards')
        Array.from(warDivs).forEach(function(warDiv) {
            warDiv.innerHTML = ''
        })
    }
}

function giveUp() {
    document.getElementById('give-up').style.display = 'none'
    document.getElementById('won').textContent = 'Game over'
    document.getElementById('won').style.display = 'block'
    document.getElementById('play-again').style.display = 'block'

}

let inWar = false
let warCards = []

document.getElementById('player').addEventListener('click', function () {
    playerCard = playerDeck.shift()
    computerCard = computerDeck.shift()

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
    }, 500)

    setTimeout(function() {
        if (playerCard.rank > computerCard.rank) {
            playerDeck.push(playerCard, computerCard)
            if (inWar) { playerDeck = playerDeck.concat(warCards) }
            inWar = false
            warCards = []
            let warDivs = document.getElementsByClassName('war-cards')
            Array.from(warDivs).forEach(function(warDiv) {
                warDiv.innerHTML = ''
            })
        } 
        else if (computerCard.rank > playerCard.rank) {
            computerDeck.push(playerCard, computerCard)
            if (inWar) { computerDeck = computerDeck.concat(warCards) }
            inWar = false
            warCards = []
            let warDivs = document.getElementsByClassName('war-cards')
            Array.from(warDivs).forEach(function(warDiv) {
                warDiv.innerHTML = ''
            })
        } 
        else {
            warCards.push(playerCard, computerCard)
            checkWin(4)
            playerWarCards = playerDeck.splice(0, 3)
            computerWarCards = computerDeck.splice(0, 3)
            warCards = warCards.concat(playerWarCards).concat(computerWarCards)
            inWar = true

            for (let i = 0; i < 3; ++i) {
                curPlayerCard = playerWarCards[i]
                curComputerCard = computerWarCards[i]
                let playerWarDiv = document.createElement('div')
                let computerWarDiv = document.createElement('div')
                playerWarDiv.setAttribute('class', 'war-card')
                computerWarDiv.setAttribute('class', 'war-card')
                playerWarDiv.innerHTML = `${ranks[curPlayerCard.rank]}<br>${suits[curPlayerCard.suit]}`
                computerWarDiv.innerHTML = `${ranks[curComputerCard.rank]}<br>${suits[curComputerCard.suit]}`
                document.getElementById('player-war-cards').appendChild(playerWarDiv)
                document.getElementById('computer-war-cards').appendChild(computerWarDiv)
            }
        }
        
        document.getElementById('player-show').style.display = 'none'
        document.getElementById('computer-show').style.display = 'none'
        document.getElementById('player-show').style.borderColor = '#000000'            
        document.getElementById('computer-show').style.borderColor = '#000000'

        updateCardCounts()

        if (!inWar) {
            checkWin(1)
        }
    }, 1500)
})

document.getElementById('home').addEventListener('click', function() {
    document.location.href = 'index.html'
})
