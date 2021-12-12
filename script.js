
let deckSize = 20;
let deckColors = Array(deckSize);
let deckState = Array(deckSize);
let wait = 0;
let complete = 0;
let attempts = 0;

// generates list of colors equally spaced apart and not too close to white or black
function colorSet() {
  const numColors = 16777216;
  const start = 0.1*16777216;
  const end = 0.9*16777216;
  const span = end - start;
  const resolution = 100;
  let colors = [];
  for (let i = 0; i < resolution; i++) {
    colors[i] = "#" + Math.floor(i*span/resolution + start).toString(16);
  }
  return colors;
}

let colors = colorSet();

function randomColors(array) {
  // randomly choose a number of colors equal to deck size from the color set
  for (let i = 0; i < array.length; i=i+2) {
    array[i] = colors[Math.floor(Math.random()*colors.length)];
    array[i+1] = array[i];
  }
}

function shuffleDeck(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

function createDivs(size) {
  for (let i = 0; i < size; i++) {
    const newDiv = document.createElement("div");
    newDiv.id = i;
    newDiv.addEventListener("click", cardClick);
    document.getElementById("game").append(newDiv);
  }
}

function refreshDisplay(){
  for (let i = 0; i < deckState.length; i++) {
    if (deckState[i] != "down"){
      document.getElementById(i).style.backgroundColor = deckColors[i];
    }
    else {
      document.getElementById(i).style.backgroundColor = "lightgray";
    }
  }
  document.getElementById("score").innerHTML = `${attempts} attempts`;
}

function cardClick(event){
  
  clickedCard = event.target.id;

  // if clicked card is not down, or wait is true, do nothing
  if (deckState[clickedCard] != "down"){return};
  if (wait == 1){console.log("wait!");return};

  // make sure only one or no cards are up
  let ups = 0;
  for (state of deckState){if (state == "up") {ups++}};
  if (ups > 1){console.log("you suck!")};
  
  // if no card was up, turn it up and wait for next click
  if (deckState.includes("up") == false) {
    deckState[clickedCard] = "up";
    console.log(deckState);
    refreshDisplay();
  }

  // if one card was already up, see if they match, otherwise set a timeout to turn both back down
  else {
    attempts++;
    otherUp = deckState.indexOf("up");
    deckState[clickedCard] = "up";
    console.log(deckState);
    refreshDisplay();
    if (deckColors[otherUp] == deckColors[clickedCard]){
      deckState[otherUp] = "matched";
      deckState[clickedCard] = "matched";
      console.log(deckState);

      // check for win
      if (!deckState.includes("down")) {
        complete=1;
        document.getElementById("status").innerHTML = "complete!";
      }
    }
    else {
      wait = 1;
      firstCard = otherUp;
      secondCard = clickedCard;
      setTimeout(function (){
        wait = 0
      },1500);
      setTimeout(function (){    
        deckState[firstCard] = "down";
        deckState[secondCard] = "down";
        console.log(deckState);
        refreshDisplay();
      },1000);
    }
  }
}

function startGame(){
  randomColors(deckColors);
  shuffleDeck(deckColors);
  deckState.fill("down");
  console.log(deckState);
  attempts = 0;
  complete = 0;
  refreshDisplay();
  document.getElementById("status").innerHTML = "play!";
}

document.getElementById("reset").addEventListener("click", startGame);
createDivs(deckSize);
startGame();

