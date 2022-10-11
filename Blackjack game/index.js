let blackjackgame = {
    'you': { 'scorespan': '#yourblackjack-result', 'div': '#your-box', 'score': 0 },
    'dealer': { 'scorespan': '#dealerblackjack-result', 'div': '#dealer-box', 'score': 0 },
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
    'cardsmap': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'K': 10, 'Q': 10, 'A': [1, 11] },
      'wins':0,
      'loses':0,
      'draws':0,
      'isstand':false,
      'turnsover':false,
  }

  const YOU = blackjackgame['you'];
  const DEALER = blackjackgame['dealer'];
  const hitsound = new Audio('sounds/swish.m4a');
  const winsound = new Audio('sounds/cash.mp3');
  const lostsound = new Audio('sounds/aww.mp3');


  document.querySelector('#hit-btn').addEventListener('click', blackjackhit);
  document.querySelector('#stand-btn').addEventListener('click',dealerlogic);
  document.querySelector('#deal-btn').addEventListener('click', blackjackdeal);
 

  function blackjackhit() {
    // showcard(YOU);
    // showcard(DEALER);
    if(blackjackgame['isstand']==false){
    let cards = randomcard();
    console.log(cards);
    showcard(YOU, cards);
    updatescore(YOU, cards);
    showscore(YOU);
    }

  }
  function blackjackdeal() {
    if(blackjackgame['turnsover']==true){
      blackjackgame['isstand']=false;
    let yourimages = document.querySelector('#your-box').querySelectorAll('img');

    let dealerimages = document.querySelector('#dealer-box').querySelectorAll('img');
    for (let i = 0; i < yourimages.length; i++) {
      yourimages[i].remove();
    }
    for (let i = 0; i < dealerimages.length; i++) {
      dealerimages[i].remove();
    }
    YOU['score']=0;
    DEALER['score']=0;
    document.querySelector('#yourblackjack-result').textContent=0;
    document.querySelector('#dealerblackjack-result').textContent=0;
    // same iinerHTML or textContent can also be use
    // document.querySelector(YOU['scorespan']).textContent=0;
    // document.querySelector(DEALER['scorespan']).textContent=0;
    document.querySelector('#yourblackjack-result').style.color='black';
    document.querySelector('#dealerblackjack-result').style.color='black';
    
    document.querySelector('#blackjack-result').textContent='Lets play';
    document.querySelector('#blackjack-result').style.color='black';

   
  }
  blackjackgame['turnsover']=true;


  }
  function randomcard() {
    let randomindex = Math.floor(Math.random() * 13);
    return blackjackgame['cards'][randomindex];
  }
  function showcard(activeplayer, cards) {
    console.log(cards);
    if(activeplayer['score']<=21){
    let cardImage = document.createElement('img');
    cardImage.style.height = '100px';
    cardImage.style.width = '100px';
    cardImage.style.padding = '5px';
    cardImage.src = `img/${cards}.png`;
    document.querySelector(activeplayer['div']).appendChild(cardImage);
    hitsound.play();
  }
}
  function updatescore(activeplayer, cards) {
    if (cards == 'A') {
      if (activeplayer['score'] + blackjackgame['cardsmap'][cards][1] <= 21) {
        activeplayer['score'] += blackjackgame['cardsmap'][cards][1];
      }
      else {
        activeplayer['score'] += blackjackgame['cardsmap'][cards][0];
      }
    }

    else {
      activeplayer['score'] += blackjackgame['cardsmap'][cards];

    }
  }
  function showscore(activeplayer) {
    if(activeplayer['score']>21){
      document.querySelector(activeplayer['scorespan']).textContent="BURST!";
      document.querySelector(activeplayer['scorespan']).style.color="red";

    }

    else{ 
   
    // document.querySelector(activeplayer['scorespan']).innerHTML=activeplayer['score'];
    document.querySelector(activeplayer['scorespan']).textContent = activeplayer['score'];

    }
  }
  function sleep(ms){
    return  new Promise(resolve=> setTimeout(resolve,ms));
  }
  async function dealerlogic(){
    blackjackgame['isstand']=true;
    while(DEALER['score']<16 && blackjackgame['isstand']==true){
    let dcard =randomcard();
    showcard(DEALER,dcard);
    updatescore(DEALER,dcard);
    showscore(DEALER);
  await sleep(1000);
    }
    
      blackjackgame['turnsover']=true;

      showresults(computewinner());
    }
  
  function computewinner(){
    let winner;
    if(YOU['score']<=21){
      // two case if dealer score is less than your score or it either burst
      if(YOU['score']>DEALER['score'] || DEALER['score']>21){
        console.log('YOU WON!');
        blackjackgame['wins']++;
        winner=YOU;
      }
      else if(YOU['score'] < DEALER['score']){
        console.log('YOU LOSE!');
        winner =DEALER;
        blackjackgame['loses']++;
      }
      else if(YOU['score'] == DEALER['score']){
        console.log('You DRAW!');
        blackjackgame['draws']++;
      }
    }
    else if(YOU['score']>21 && DEALER['score']<=21){
      winner=DEALER;
      console.log('YOU lose!');
      blackjackgame['loses']++;

    }
    else if(YOU['score']>21 && DEALER['score']>21){
       console.log('YOU DRAW!');
       blackjackgame['draws']++;
    }
    console.log('winner is :',winner);
    return winner;
  }
  function showresults(winner){
  let message,messagecolor;
  if(blackjackgame['turnsover']==true){
  if(winner==YOU){
    message='You Win!';
    messagecolor='green';
    winsound.play();
    document.querySelector('#wins').textContent = blackjackgame['wins'];
  }
  else if(winner==DEALER){
    message='You Lost!';
    messagecolor='red';
    lostsound.play();
    document.querySelector('#loses').textContent = blackjackgame['loses'];
  }
  else{
    message='You Drew!';
    messagecolor='black';
    document.querySelector('#draws').textContent = blackjackgame['draws'];
  }
  document.querySelector('#blackjack-result').innerHTML=message;
  document.querySelector('#blackjack-result').style.color=messagecolor;
  }


  }
