let userData = {
    username: '',
    username2: '',
    points: 0,
    gameSize: 4,
}

const POINT_PER_WIN = 1;

shuffleCards = () => {
    const cards = document.querySelectorAll('.card');
    const randList = [];
    Array.from(cards).forEach((card) => {
        let rand = Math.floor(Math.random() * cards.length) + 1;
        while(randList.includes(rand)){
            rand = Math.floor(Math.random() * cards.length) + 1;   
        }
        randList.push(rand);
        setTimeout(()=> {
            card.style.order = rand;
        }, 400);
    });
}

checkWinner = ([card1, card2]) => {
    if(card1.id == card2.id) {
        card1.classList.add('matched');
        card2.classList.add('matched');    
        //remove flipped because of flipped check in flip function 
    }
    const matchedCards = Array.from(document.querySelectorAll('.card')).filter(card => card.classList.contains('matched'));
    const cards = document.querySelectorAll('.card');
    if(matchedCards.length == cards.length) {
        //end game
        setTimeout(()=> { alert('winner'); }, 1000);
    }
}

flip = (card) => {
    card.classList.toggle('flipped');
    const cards = Array.from(document.querySelectorAll('.card')).filter(card => card.classList.contains('flipped'));
    if (cards.length === 2) {
        changePoints(POINT_PER_WIN);
        checkWinner(cards);
    }

}

changePoints = (points) => {
    let point = document.getElementsByClassName('pointsCounter')[0].innerHTML;
    const newPoints =parseInt(point) +  points;
    document.getElementsByClassName('pointsCounter')[0].innerHTML = newPoints;
}

setUserData = () => { 
    const username = document.getElementsByName("name")[0].value;
    const username2 = document.getElementsByName("name2")[0].value;
    userData['username'] = username;
    userData['username2'] = username2;
    userData['gameSize'] = 4;
    shuffleCards();
}

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    Array.from(cards).map((card) => {
        card.addEventListener('click', flip.bind(null, card));
    })
});