function newGame () {
//PRELUDE - MOUSE ART
  const mouseStart = "       ____()()\n      /      @@\n`~~~~~\\_;m__m._>o\n\n";
//--------------------------------------------------------------------------------------
  const mouseAt25 = ("\n                           .'o-O'-._\\\\\n                          / O o_.-`| \\\\\n                         /O_.-'  O |  \\\\\n       ____()()         | o   o .-`  //\\\\\n      /      @@         |o O_.-'    //  \\\\\n`~~~~~\\_;m__m._>o ______'--`_______//--->\\\\\n")
//--------------------------------------------------------------------------------------
  const mouseAt50 = ("\n                                   .'o-O'-._\\\\\n                                  / O o_.-`| \\\\\n                                 /O_.-'  O |  \\\\\n       ____()()                 | o   o .-`  //\\\\\n      /      @@                 |o O_.-'    //  \\\\\n`~~~~~\\_;m__m._>o ______________'--`_______//--->\\\\\n")
//--------------------------------------------------------------------------------------
  const mouseAt75 = ("\n                                           .'o-O'-._\\\\\n                                          / O o_.-`| \\\\\n                                         /O_.-'  O |  \\\\\n       ____()()                         | o   o .-`  //\\\\\n      /      @@                         |o O_.-'    //  \\\\\n`~~~~~\\_;m__m._>o ______________________'--`_______//--->\\\\\n")
//--------------------------------------------------------------------------------------
  const mouseDead = "\n    o<```w``w;``\\~~~~~’\n      XX        /\n      ()()``````\n\n";
//--------------------------------------------------------------------------------------
  const mouseVictory = "\n          _.+._\n        (^\\/^\\/^)  .'o O'-._\n         \\@*@*@/  / O o_.-`|\n         {_____} /O_.-'  O |\n       ____()()  | o   o .-`\n      /      @@  |o O_.-'\n`~~~~~\_;m__m._>o '--`\n\n"
//--------------------------------------------------------------------------------------
//PHASE 1 - INTRODUCTION
  const gameStart = alert(mouseStart + "Hello, little mouse and welcome to a very cheesy HANGMAN adventure!\nIt’s really gouda to have you here.\n\nListen, I have this great opportunity, but it's a little risky\nand only for a true cheese connoisseur.")

  let userChoice = confirm("\nTo brie or not to brie, are you interested?");
  function welcomeChat() {
    if (userChoice === true) {
      alert("Nothing gets feta than this! Let's get started!");
    } else {
      alert("Alright, alright...I'm just saying, you're missing out on a gouda opportunity.");
    }
  }
  welcomeChat();

  if (userChoice != true) {
    return;
  }
//--------------------------------------------------------------------------------------
//PHASE 2 - LIST OF CHEESE
    //A. LIST
  const easy = ["brie", "mozzerella", "gouda", "cheddar", "feta", "ricotta", "cottage", "swiss", "asiago", "colby"];
  const medium = ["pepperjack", "parmesan", "havarti", "havarti", "gorgonzola", "manchego", "paneer", "burrata", "asiago", "provolone"];
  const hard = ["jarlsberg", "limburger", "cambozola", "emmental", "roquefort", "camembert", "mascarpone",  "gruyere", "beaufort", "muenster"];
//--------------------------------------------------------------------------------------
//PHASE 3 - SELECTION OF DIFFICULTY
  //A. INTRO
  let diffSelected = 0;
  //B. USER INPUT OF DIFFICULTY LEVEL
  //------------------------------------------------------------------------------------
  function diffLevel() { 
    let mouseType = prompt("\nDo you fancy yourself a risk taker? \nThe more daring you are the bigger the reward!\nSo tell us - what type of mouse are you...? Are you a \nTimid Mouse? Enter 1 \nMickey Mouse? Enter 2\nMighty Mouse? Enter 3 \nSo what type of Mouse are you? [1/2/3] and press Enter: \n")
    if (mouseType === "1") {
      diffSelected = 1;
      alert("Do not worry, we will start you off easy...")
    } else if (mouseType === "2") {
      diffSelected = 2;
      alert("Ahh you will fit in great with the horde!")
    } else if (mouseType === "3") {
      diffSelected = 3;
      alert("Our HERO!")
    } else {
      return mouseType;
    }
  }

  diffLevel();
//--------------------------------------------------------------------------------------
//PHASE 4 - PREPARATION FOR DIFFICULTY
  //A. GENERATE LISTOFCHEESE BASED ON DIFFICULTY LEVEL
  //------------------------------------------------------------------------------------
  const listOfCheese = [];

  let numberOfTries = 0;

  function diffSelection() {
    if (diffSelected === 1) {
        listOfCheese.push(...easy)
        numberOfTries = 7
    } else if (diffSelected === 2) {
        listOfCheese.push(...medium)
        numberOfTries = 5
    } else if (diffSelected === 3) {
        listOfCheese.push(...hard)
        numberOfTries = 3
    }
  }
  diffSelection();

  const totalTries = numberOfTries;
//--------------------------------------------------------------------------------------
//PHASE 5 - BEGIN GAME ENGINE
  // A. RANDOMLY SELECTING CHEESE FROM A LIST AND SET UP NEW GAME
  //------------------------------------------------------------------------------------
  function cheeseSelected() {
  return listOfCheese[Math.floor(Math.random() * listOfCheese.length)];
  }

  let chosenCheese = cheeseSelected();

  //B. CONVERSION OF CHEESE TO BLANKS
  //------------------------------------------------------------------------------------
  function makeBlanks(cheese) {
    let totalBlanks = ""; 
    for (let i = 0; i < cheese.length; i++) {
      totalBlanks += "_ "
    }
    return totalBlanks;
  }

  let blankedCheese = makeBlanks(chosenCheese);

  let currentGuess = blankedCheese; //_ _ _ _ _
  //C. USER INPUT IS REVEALED AND FAILURE MODES
  //------------------------------------------------------------------------------------
  function gameState() {
    let guessArray = currentGuess.split("");
    // CHECK FOR BLANKS AND NUMBER OF TRIES
    if (guessArray.includes("_") && numberOfTries > 0) {
      checkPercentage(numberOfTries)
      alert(`You have ${numberOfTries} tries left`);
      alert(currentGuess);
      const currentLetter = prompt("\nEnter a letter to guess \n")
      revealInput(currentLetter);
      
      // IF INPUT WAS INCORRECT, DECREMENT TRIES
      if (!currentGuess.includes(currentLetter)) {
        numberOfTries--;
      }
      return gameState();
    }
    
    // SCENARIO FOR IF TRIES = 0
    if (numberOfTries === 0 )
    {
      let guess = prompt("\nThis is your last chance!\nBrie the cheese master you were meant to be. Guess the cheese! \n")
      if (guess === chosenCheese) {
        alert(mouseVictory + "To thy own cheese be true. You are a true connoisseur!\n")
      } else {
      alert(mouseDead
      + `OUCH, I GUESS THIS IS NACHO THING...\nA true connoisseur would know ${chosenCheese.toUpperCase()} before taking on cheesy HANGMAN~`);
      }
    }

    // IF GUESS IS COMPLETED
    if (!guessArray.includes("_")) {
      //code here for if word has been completed
      alert(currentGuess);
      alert(mouseVictory + `LIFE IS GOUDA! You got ${chosenCheese}! \n`);
    }
  }
  gameState();

  function checkPercentage(tries) {
    let percentage = (tries / totalTries)
    if (percentage >= .75){
      alert(mouseAt75);
    }
    else if (percentage >= .50 && percentage <= .74){
      alert(mouseAt50);
    }
    else if (percentage >= .25 && percentage <= .49){
      alert(mouseAt25);
    }
  }
//PHASE 6 - GAME CLOSEOUT
//--------------------------------------------------------------------------------------
    //A.take user input and match against our generated string if input matches elements of string - reveal the element in makeBlanks. 
  function revealInput(userInput) {
    let cheeseArray = chosenCheese.split("");
    let guessArray = currentGuess.split("");
    for (let i = 0; i < cheeseArray.length; i++) {
      if (cheeseArray[i] === userInput) {
        // currentGuess.split("");
        // console.log(guessArray);
        guessArray[i*2] = userInput;
      }  
    };
    currentGuess = guessArray.join("")
    return currentGuess;
  }
//PHASE 7 - GAME RESTART
//--------------------------------------------------------------------------------------
  let choice = confirm("\nThat was fondue! Want to play again?");
  if (choice === true) {
    console.clear();  //clears log before new game starts
    alert("You are so grate, glad you are back!\n");
    newGame();
  } else {
    console.clear();  //clears log before new game starts
    alert("Cheese Louise! You have abandoned your mouse comrades!");
  }
//--------------------------------------------------------------------------------------
}  //Close out newGame Function Definition

newGame();  //Invoke newGame function
//PHASE 8 - TESTING, LESSONS LEARNED, AND IMPROVEMENTS
//--------------------------------------------------------------------------------------
  //A. STRETCH IDEAS 
  //1. Incorporate Multiple Words or Phrases
  //2. Can't guess same letter twice
  //3. Can't input multiple letters
  //4. Input must be a letter.  If number - return message
  //5. Incorporate timing of alerts
  //6. Add the cat
  //7. Tracker to see total wins/losses 

//--------------------------------------------------------------------------------------
  //B. TEST PROBLEMS
    //1. When user complete game by guessing all letters- users does not see achievement prompt
      // Fixed by changing return on line 138 to an alert - Frank 3:40 EST - Nice Frank! ~Mary
    //2. If player is not interested in playing, alert is not printed
      //Fixed in order for the message to be printed welcomeChat() needed to be invoked before the return if userChoice != true conditional
      //Mary 8:30 PM EST
