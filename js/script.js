// Obtém o elemento canvas do HTML e define o contexto 2D para desenhar no canvas
let canvas = document.getElementById("snake"); //criar elemento que irá rodar o jogo
let context = canvas.getContext("2d");

// Pergunta o nome do usuário antes de iniciar o jogo
let userName = prompt("Qual é o seu nome?");

// Define o tamanho de cada quadrado da cobrinha e da comida
let box = 32;

// Inicializa a pontuação
let score = 0;

// Inicializa a cobrinha como uma lista de coordenadas
let snake = []; //criar cobrinha como lista, já que ela vai ser uma série de coordenadas, que quando pintadas, criam os quadradinhos
snake[0] = {
    x: 12 * box, // Adjusted to match new canvas size
    y: 12 * box  // Adjusted to match new canvas size
}

// Define a direção inicial da cobrinha
let direction = "right";

// Gera a posição inicial da comida de forma aleatória
let food = {
    x: Math.floor(Math.random() * 23 + 1) * box, // Adjusted to match new canvas size
    y: Math.floor(Math.random() * 23 + 1) * box  // Adjusted to match new canvas size
}

// Função para criar o fundo do jogo
function criarBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 24 * box, 24 * box); // Adjusted to match new canvas size
}

// Função para desenhar a cobrinha no canvas
function criarCobrinha (){
    for(let i = 0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

// Função para desenhar a comida no canvas
function drawFood(){
    context.fillStyle= "red";
    context.fillRect(food.x, food.y, box, box)
}

// Função para desenhar a pontuação no canvas
function drawScore() {
    context.fillStyle = "black";
    context.font = "20px Arial";
    context.fillText("Score: " + score, box, box);
}

// Função para atualizar a tabela de pontuação
function updateScoreTable() {
    document.getElementById("score-display").innerText = `Score: ${score}`;
}

// Adiciona um evento para capturar as teclas pressionadas e atualizar a direção da cobrinha
document.addEventListener('keydown', update);

// Função para atualizar a direção da cobrinha com base na tecla pressionada
function update (event){
    if(event.keyCode == 37 && direction != "right") direction= "left"
    if(event.keyCode == 38 && direction != "down") direction= "up"
    if(event.keyCode == 39 && direction != "left") direction= "right"
    if(event.keyCode == 40 && direction != "up") direction= "down"
}

// Função principal que inicia o jogo e atualiza a cada intervalo de tempo
function iniciarJogo(){

    // Verifica se a cobrinha saiu dos limites do canvas e a reposiciona do outro lado
    if(snake[0].x > 23 * box && direction == "right") snake[0].x = 0; // Adjusted to match new canvas size
    if(snake[0].x < 0 && direction == "left") snake[0].x = 24 * box; // Adjusted to match new canvas size
    if(snake[0].y > 23 * box && direction == "down") snake[0].y = 0; // Adjusted to match new canvas size
    if(snake[0].y < 0 && direction == "up") snake[0].y = 24 * box; // Adjusted to match new canvas size

    // Verifica se a cobrinha colidiu com ela mesma
    for( i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake [i].y){
            clearInterval(jogo);
            alert('Game Over =(')
        }
    }

    // Pega a posição atual da cabeça da cobrinha
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Atualiza a posição da cabeça da cobrinha com base na direção
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;
    
    // Verifica se a cobrinha comeu a comida
    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); // Remove o último elemento da lista (cauda da cobrinha)
    }
    else{
        // Gera uma nova posição aleatória para a comida
        food.x = Math.floor(Math.random() * 23 + 1) * box; // Adjusted to match new canvas size
        food.y = Math.floor(Math.random() * 23 + 1) * box; // Adjusted to match new canvas size
        score += 10; // Incrementa a pontuação em 10 pontos
        updateScoreTable(); // Atualiza a tabela de pontuação
    }
    
    // Cria a nova cabeça da cobrinha
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    // Adiciona a nova cabeça no início da lista da cobrinha
    snake.unshift(newHead); //método unshift adiciona como primeiro quadradinho da cobrinha

    // Desenha o fundo, a cobrinha, a comida e a pontuação no canvas
    criarBG();
    criarCobrinha();
    drawFood();
    drawScore();
}

// Define um intervalo para atualizar o jogo a cada 100 milissegundos
let jogo = setInterval(iniciarJogo, 100);