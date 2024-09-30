var total = 0; // Variável global total
var buffer = ''; // Armazena os números digitados temporariamente
var lastOperator = null; // Armazena o último operador

// Funções de operação
function Soma(valor) {
  total += valor;
}

function Subtracao(valor) {
  total -= valor;
}

function Multiplicacao(valor) {
  total *= valor;
}

function Divisao(valor) {
  if (valor === 0) {
    console.error("Erro: divisão por zero.");
    return NaN;
  }
  total /= valor;
}

function Exponenciacao(valor) {
  total = Math.pow(total, valor);
}

function RaizQuadrada() {
  if (total < 0) {
    console.error("Erro: raiz quadrada de número negativo.");
    return NaN;
  }
  total = Math.sqrt(total).toFixed(3);
}

function logaritimo() {
  if (total <= 0) {
    console.error("Erro: logaritmo de número não positivo.");
    return NaN;
  }
  total = Math.log10(total);
}

function clean() {
  total = 0;
  buffer = '';
  lastOperator = null;
  updateDisplay(); // Atualiza o display após limpar
}

// Atualiza o display da calculadora
function updateDisplay() {
  const display = document.getElementById('display');
  display.innerText = buffer || total;
}

// Lida com a entrada de números e operadores
function handleButtonClick(event) {
  const action = event.target.dataset.action;
  const value = event.target.innerText;

  // Lida com números e ponto decimal
  if (!isNaN(value) || value === ".") {
    buffer += value;
    updateDisplay();
    return;
  }

  // Lida com operações
  switch (action) {
    case 'clear':
      clean();
      break;
    case 'log':
      if (buffer) {
        total = parseFloat(buffer);
        logaritimo();
        buffer = '';
        updateDisplay(); // Atualiza o display após a operação
      }
      break;
    case 'exp':
      if (buffer) {
        applyLastOperation(); // Aplica operação anterior antes de mudar a operação
        const base = total || parseFloat(buffer);
        buffer = '';
        lastOperator = function(expoente){
          Exponenciacao(expoente);
        }; 
      }
      break;
    case 'sqrt':
      if (buffer) {
        total = parseFloat(buffer);
        RaizQuadrada();
        buffer = '';
        updateDisplay(); // Atualiza o display após a operação
      }
      break;
    case 'add':
    case 'subtract':
    case 'multiply':
    case 'divide':
      applyLastOperation(); // Aplica a última operação antes de definir a nova
      lastOperator = getOperationFunction(action); // Define a nova operação
      buffer = ''; // Limpa o buffer após definir a nova operação
      break;
    case 'result':
      applyLastOperation(); // Aplica a última operação
      updateDisplay(); // Atualiza o display após calcular o resultado
      lastOperator = null; // Reseta o operador
      buffer = ''; // Limpa o buffer após calcular o resultado
      break;
  }
}

// Retorna a função correspondente ao operador
function getOperationFunction(action) {
  switch (action) {
    case 'add': return Soma;
    case 'subtract': return Subtracao;
    case 'multiply': return Multiplicacao;
    case 'divide': return Divisao;
  }
}

// Aplica a última operação armazenada
function applyLastOperation() {
  if (lastOperator && buffer) {
    const parsedBuffer = parseFloat(buffer);
    lastOperator(parsedBuffer); // Aplica a operação ao valor no buffer
  } else if (buffer) {
    total = parseFloat(buffer); // Atualiza o total com o valor do buffer
  }
  buffer = ''; // Limpa o buffer após aplicar a operação
  updateDisplay(); // Atualiza o display com o resultado da operação
}

// Adiciona eventos de clique a todos os botões
document.querySelectorAll('.key').forEach(button => {
  button.addEventListener('click', handleButtonClick);
});

// Atualiza o display inicial
updateDisplay();
