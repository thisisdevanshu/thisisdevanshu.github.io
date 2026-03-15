import { update as updateSnake, draw as drawSnake, getSnakeHead, snakeIntersection, SNAKE_SPEED } from './snake.js'
import { update as updateFood, draw as drawFood, getScore } from './food.js'
import { outsideGrid } from './grid.js'

let lastRenderTime = 0
let gameOver = false
let gameOverShown = false
const gameBoard = document.getElementById('game-board')
document.body.style.overflow = "hidden";

function main(currentTime) {
    if (gameOver) {
        if (!gameOverShown) {
            gameOverShown = true
            const overlay = document.getElementById('game-over-overlay')
            overlay.classList.add('visible')
            document.getElementById('final-score').textContent = getScore()
        }
        return
    }
    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000 // converting to seconds by dividing
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return
    lastRenderTime = currentTime
    update ()
    draw ()
}

window.requestAnimationFrame(main)

function update() {
    updateSnake()
    updateFood()
    checkDeath()
}

function draw() {
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
    document.getElementById('score').textContent = getScore()
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}