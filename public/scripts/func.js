const words = [
    "apple",       // Fruta
    "backpack",    // Objeto
    "candle",      // Objeto
    "elephant",    // Animal
    "giraffe",     // Animal
    "umbrella",    // Objeto
    "piano",       // Instrumento
    "dolphin",     // Animal
    "island",      // Lugar
    "notebook",    // Objeto
    "avocado",     // Fruta
    "library",     // Lugar
    "helicopter",  // Objeto
    "mountain",    // Lugar
    "sunflower",   // Planta
    "telescope",   // Objeto
    "jacket",      // Roupa
    "octopus",     // Animal
    "keyboard",    // Objeto
    "pineapple",   // Fruta
    "desert",      // Lugar
    "zebra",       // Animal
    "bicycle",     // Objeto
    "peacock",     // Animal
    "rainforest",  // Lugar
    "carrot",      // Vegetal
    "airplane",    // Objeto
    "waterfall",   // Lugar
    "strawberry",  // Fruta
    "mirror",      // Objeto
    "volcano"      // Lugar
  ];
  

let fileContent = ''; 
let correctGuesses = [];
let wrongGuesses = [];
let tries = 10;

const chosenWord = Math.floor(Math.random() * words.length);

document.getElementById('tries').textContent = `Remaining tries: ${tries}`

fileContent = words[chosenWord].toLowerCase();
document.getElementById('output').textContent = '_ '.repeat(fileContent.length).trim();
correctGuesses = Array(fileContent.length).fill('_');

document.querySelector('.sb').addEventListener('click', function (e) {
    e.preventDefault();
    const guessInput = document.getElementById('guess').value.toLowerCase();
    document.getElementById('guess').value = ''; 
    
    if(guessInput.length === 1){
            if(fileContent.includes(guessInput)){
                for(let i = 0; i < fileContent.length; i++){
                    if(guessInput === fileContent[i]){
                        correctGuesses[i] = guessInput;
                    }
                }
                document.getElementById('output').textContent = correctGuesses.join(' ');
                if(correctGuesses.join(' ') === fileContent){
                    won();
                }
            }else{
                tries--;
                document.getElementById('tries').textContent = `Remaining tries: ${tries}`
                if(tries <= 0){
                    gameover()
                }

                if(!wrongGuesses.includes(guessInput)){
                    wrongGuesses.push(guessInput)

                    document.getElementById('wrong').textContent = `Wrong guesses: ${wrongGuesses.join(', ')}`;                     
                }
                console.log(`Character '${guessInput}' is not in the word.`);
            }
    }
});

function won() {
    document.getElementById('gameover').textContent = "You won!";

    const button = document.getElementById('restart');
    button.style.display = 'block'; 

    if (!button.hasAttribute('data-listener')) {
        button.addEventListener('click', () => {
            location.reload();
        });
        button.setAttribute('data-listener', 'true'); 
    }
}


function gameover() {
    document.getElementById('gameover').textContent = `You have lost, the word was ${fileContent}`;

    const button = document.getElementById('restart');
    button.style.display = 'block'; 

    if (!button.hasAttribute('data-listener')) {
        button.addEventListener('click', () => {
            location.reload();
        });
        button.setAttribute('data-listener', 'true'); 
    }
}


document.getElementById('guessw').addEventListener('change', function () {
    const wordGuess = document.getElementById('guessw').value.toLowerCase();
    document.getElementById('guessw').value = ''; 

    if (wordGuess === fileContent) {
        
        document.getElementById('output').textContent = fileContent; 
        won();
    } else {
        tries--;
        document.getElementById('tries').textContent = `Remaining tries: ${tries}`
        if(tries <= 0){
            gameover();
        }
        wrongGuesses.push(wordGuess)
        document.getElementById('wrong').textContent = `Wrong guesses: ${wrongGuesses.join(', ')}`;                     
        console.log("Incorrect full word guess.");
    }
});
