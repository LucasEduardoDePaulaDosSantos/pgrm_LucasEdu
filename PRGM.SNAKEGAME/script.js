const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Tamanho do canvas e da célula da cobra
const scale = 20;
const rows = 20;
const columns = 20;

// Tamanho do canvas
canvas.width = scale * columns;
canvas.height = scale * rows;

// Definição inicial do jogo
let snake = [{ x: 10, y: 10 }];
let direction = 'RIGHT';
let food = generateFood();
let score = 0;

// Função para desenhar a cobra
function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x * scale, segment.y * scale, scale, scale);
    });
}

// Função para desenhar a comida
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * scale, food.y * scale, scale, scale);
}

// Função para gerar comida em uma posição aleatória
function generateFood() {
    let x = Math.floor(Math.random() * columns);
    let y = Math.floor(Math.random() * rows);
    return { x, y };
}

// Função para atualizar a posição da cobra
function updateSnake() {
    let head = { ...snake[0] };

    switch (direction) {
        case 'LEFT':
            head.x -= 1;
            break;
        case 'RIGHT':
            head.x += 1;
            break;
        case 'UP':
            head.y -= 1;
            break;
        case 'DOWN':
            head.y += 1;
            break;
    }

    // Verifica se a cobra colidiu com o muro ou consigo mesma
    if (head.x < 0 || head.x >= columns || head.y < 0 || head.y >= rows || isSnakeColliding(head)) {
        return gameOver();
    }

    snake.unshift(head);

    // Verifica se a cobra comeu a comida
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = generateFood(); // Gera nova comida
    } else {
        snake.pop(); // Remove a cauda
    }
}

// Função para verificar colisão com a própria cobra
function isSnakeColliding(head) {
    return snake.some(segment => segment.x === head.x && segment.y === head.y);
}

// Função para exibir a pontuação
function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Pontuação: ${score}`, 10, 20);
}

// Função de fim de jogo
function gameOver() {
    alert(`Game Over! Sua Pontuação é ${score}`);
    snake = [{ x: 10, y: 10 }];
    direction = 'RIGHT';
    score = 0;
}

// Função principal para desenhar tudo
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
    drawScore();
    updateSnake();
}

// Função para controlar a direção da cobra
document.addEventListener('keydown', event => {
    if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
    if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
});

// Função de atualização do jogo
function gameLoop() {
    draw();
    setTimeout(gameLoop, 100); // Atualiza a cada 100ms
}

// Inicia o jogo
gameLoop();