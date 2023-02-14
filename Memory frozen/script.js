const cards = document.querySelectorAll(".card");
const timeTag = document.querySelector(".time b");
const flipsTag = document.querySelector(".flips b");
const refreshBtn = document.querySelector(".details button");
const star = document.querySelector(".star");
const star1 = document.querySelector(".star1");
const star2 = document.querySelector(".star2");
const star3 = document.querySelector(".star3");
const star4 = document.querySelector(".star4");

let maxTime = 600;
let timeLeft = maxTime;
let flips = 0;
let matchedCard = 0;
let disableDeck = false;
let isPlaying = false;
let cardOne, cardTwo, timer;
let audio = document.querySelector('#audio')
let audio2 = document.querySelector('#audio2')

//odliczanie czasu
function initTimer() {
    if (timeLeft <= 0) {
        return clearInterval(timer);
    }
    timeLeft--;
    timeTag.innerText = timeLeft;
}
//wywoływana na kliknięcie, określa czy kliknięta karta jest pierwszą czy drugą
function flipCard({ target: clickedCard }) {
    if (!isPlaying) {
        isPlaying = true;
        timer = setInterval(initTimer, 1000);
    }
    if (clickedCard !== cardOne && !disableDeck && timeLeft > 0) {

        flips++;
        flipsTag.innerText = flips;
        clickedCard.classList.add("flip");
        if (!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
            cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);

    }
}
//sprawdza czy karty pasują do siebie, jeśli pasują zostają sparowane i zdejmowane z planszy, jeśli nie pasują są odwracane i wracają do gry
function matchCards(img1, img2) {
    if (img1 === img2) {
        audio2.play();
        matchedCard++;
        if (matchedCard == 8 && timeLeft > 0) {
            return clearInterval(timer);
                 

        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;

    }

    setTimeout(() => {
        audio.play();
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
        ;
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;

    }, 1200);
}
//miesza karty i restartuje grę
function shuffleCard() {
    timeLeft = maxTime;
    flips = matchedCard = 0;
    cardOne = cardTwo = "";
    clearInterval(timer);
    timeTag.innerText = timeLeft;
    flipsTag.innerText = flips;
    disableDeck = isPlaying = false;

    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        setTimeout(() => {
            imgTag.src = `images/img-${arr[index]}.png`;
        }, 500);

        card.addEventListener("click", flipCard);

    });
}



shuffleCard();

refreshBtn.addEventListener("click", shuffleCard);

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});

