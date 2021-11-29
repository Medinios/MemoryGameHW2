let userData = {
    username: '',
    username2: '',
    pointsUserA: 0,
    pointsUserB: 0,
    gameSize: '4x4',
}

let currentPlayer = "playerA";

let gameHistory = {
    history: []
}

const POINT_PER_WIN = 1;

shuffleCards = () => {
    const cardsNamesList = ['card.png'];
    //createClass - inside for boardSize if 5x5 == 25;
    //appendClass
    // <div class="card" id=`${cardName}`>
    //                     <div class="card__front">
    //                         <img src="images/card1.png">
    //                     </div>
    //                     <div class="card__back">
    //                         <img src="images/back.png">
    //                     </div>
    //                 </div>
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
        card.addEventListener('click', flip.bind(null, card));
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
    //check if end game. (all the cards flipped)
    if(matchedCards.length == cards.length) {
        if(userData.pointsUserA > userData.pointsUserB) {
            setTimeout(()=> { alert(`winner ${userData.username}`); }, 1000);
        } else if(userData.pointsUserA < userData.pointsUserB) {
            setTimeout(()=> { alert(`winner ${userData.username2}`); }, 1000);
        } else {
            setTimeout(()=> { alert('winner TIE'); }, 1000);
        }
        createNewGame();
        //end game

    }
}


//inital game right after win.
createNewGame = () => {
    gameHistory.history.push({date:Date.now(),...userData});
    userData = {
        username: '',
        username2: '',
        pointsUserA: 0,
        pointsUserB: 0,
        gameSize: '4x4',
    };
    document.getElementsByClassName("userData")[0].style.display = 'block';
}

flip = (card) => {
    card.classList.toggle('flipped');
    const cards = Array.from(document.querySelectorAll('.card')).filter(card => card.classList.contains('flipped'));
    if (cards.length === 2) {
        changePoints(POINT_PER_WIN);
        checkWinner(cards);
        changeCurrentPlayer();
    }
}

changeCurrentPlayer = () => {
    currentPlayer = currentPlayer == "PlayerB" ? "PlayerA" : "PlayerB";
    const playerUser = currentPlayer == "PlayerB" ? userData.username2 : userData.username;
    document.getElementsByClassName(`currentPlayer`)[0].innerHTML = playerUser;
}

changePoints = (points) => {
    let point = document.getElementsByClassName(`pointsCounter${currentPlayer}`)[0].innerHTML;
    const newPoints =parseInt(point) +  points;
    document.getElementsByClassName(`pointsCounter${currentPlayer}`)[0].innerHTML = newPoints;
}

setUserData = () => { 
    const username = document.getElementsByName("name")[0].value;
    const username2 = document.getElementsByName("name2")[0].value;
    const gameSize = document.getElementsByName("board")[0].value;
    userData['username'] = username;
    userData['username2'] = username2;
    userData['gameSize'] = gameSize;
    document.getElementsByClassName("userData")[0].style.display = 'none';
    changeCurrentPlayer();
    shuffleCards();
}

document.addEventListener('DOMContentLoaded', () => {
});