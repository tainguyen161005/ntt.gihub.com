const cards = document.querySelectorAll(".card");

let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;

function flipCard({target: clickedCard}) {
  if (cardOne !== clickedCard && !disableDeck) {
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

function matchCards(img1, img2) {
  if (img1 === img2) {
    matched++;

    // khi matched đủ số cặp -> shuffle lại
    if (matched === cards.length / 2) {
      setTimeout(() => shuffleCard(), 1000);
    }

    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);

    cardOne = cardTwo = "";
    disableDeck = false;
    return;
  }

  // nếu không trùng thì lắc + úp lại
  setTimeout(() => {
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  }, 400);

  setTimeout(() => {
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    cardOne = cardTwo = "";
    disableDeck = false;
  }, 1200);
}

function shuffleCard() {
  matched = 0;
  disableDeck = false;
  cardOne = cardTwo = "";

  // lấy parent <ul class="cards">
  const wrapper = document.querySelector(".cards");
  const cardArray = Array.from(wrapper.children);

  // xáo trộn DOM
  for (let i = cardArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    wrapper.appendChild(cardArray[j]); // di chuyển phần tử j xuống cuối
    cardArray.splice(j, 1);
  }

  // reset tất cả thẻ
  document.querySelectorAll(".card").forEach(card => {
    card.classList.remove("flip", "shake");
    card.addEventListener("click", flipCard);
  });
}

// Khởi tạo game
shuffleCard();
cards.forEach(card => card.addEventListener("click", flipCard));
