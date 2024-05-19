// The product is the book itself
// Variables are like a glossary - english

// Define Html elements
const board = document.getElementById('game-board')
const instructionText = document.getElementById('instruction-text')
const logo = document.getElementById('logo')
const score = document.getElementById("score")
const highScoreText = document.getElementById("highScore")
console.log(board)

// Define Game Variables
const gridSize = 20
let snake = [{x: 10, y:10}]
let food = generateFood()
let direction = "right"
let gameInterval;
let gameSpeedDelay = 150;
let gameStarted = false
let highScore = 0
let color = 0

// Functions are one page in a book
// Create Snake, Food, Map

function draw() {
    board.innerHTML = ' '
    drawSnake()
    drawFood()
    updateScore()
}

// Make Snake
function drawSnake() {
    snake.forEach((segment) => {
        const snakeElement = createGameElement('div', 'snake')
        setPosition(snakeElement, segment)
        board.appendChild(snakeElement)
    }); 
}

// Creating a Snake , Food Cube, Div

function createGameElement(tag, ClassName) {
    const element = document.createElement(tag)
    element.className = ClassName
    return element
}

// Set position of snake, food
function setPosition(element, position) {
    element.style.gridColumn = position.x
    element.style.gridRow = position.y
}

// Draw Food

function drawFood() {
    const foodElement = createGameElement('div', 'food')
    setPosition(foodElement, food)
    board.appendChild(foodElement)
}

// Position Food Random
function generateFood() {
    x = Math.floor(Math.random() * gridSize) + 1
    y = Math.floor(Math.random() * gridSize) + 1

    return {x, y}
}

// Move Snake

function moveSnake() {
    const head = {...snake[0] }
    switch (direction) {
        case "right":
            head.x++
            break;
    
        case "left":
            head.x--
            break;

        case "down":
            head.y++
            break

        case "up":
            head.y--
            break
    }

    

    snake.unshift(head)


   if (head.x === food.x && head.y === food.y) {
    food = generateFood()
    clearInterval(gameInterval)
    gameInterval = setInterval(() => {
        moveSnake()
        checkCollision()
        draw()
    }, gameSpeedDelay);
   }
   else {
    snake.pop()
   }
}

// Start game

function startGame() {
    gameStarted = true // Game running
    instructionText.style.display = 'none'
    logo.style.display = 'none'
    gameInterval = setInterval(() => {
       moveSnake()
       checkCollision()
       draw() 
    }, gameSpeedDelay);
}

// Keypress evengt Listener
function handleKeyPress(event) {
    if(
        // (!gameStarted && event.code === 'space') ||r
        (!gameStarted && event.key === ' ')
      )  {
        startGame()
    }
    else {

        switch (event.key) {
            case 'ArrowUp':
            case 'w':
                direction = 'up'
                break;
        
            case 'ArrowDown':
            case 's':
                direction = 'down'
                break;
            
            case 'ArrowRight':
            case 'd':
                direction = 'right'
                break
            
            case 'ArrowLeft':
            case 'a':
                direction = 'left'
                break 
                
    }
    }
    const head = {...snake[0] }

}

document.addEventListener('keydown', handleKeyPress)

// Collision with Border or Itself

function checkCollision() {
    const head = snake[0]

    if(head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
        resetGame()
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y ) {
            resetGame()
        }
    }
}

function resetGame() {
    updateHighScore()
    stopGame()
    snake = [{x: 10, y:10}]
    food = generateFood()
    gameSpeedDelay = 100;
    direction = "right"
    updateScore()
}

function updateScore() {
    const currentScore = snake.length - 1;
    score.textContent = currentScore.toString().padStart(3, '0')
}




function stopGame() {
    clearInterval(gameInterval)
    gameStarted = false
    instructionText.style.display = 'block'
    logo.style.display = 'block'
}

 function updateHighScore() {
    const currentScore = snake.length - 1;

    if (currentScore > highScore) {
        highScore = currentScore
        highScoreText.textContent = highScore.toString().padStart(3,0)
        highScoreText.style.display = 'block' 
    }

   
   console.log(highScore)
}
