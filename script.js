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
  total **= valor;
}

function RaizQuadrada() {
  if (total < 0) {
    console.error("Erro: raiz quadrada de número negativo.");
    return NaN;
  }
  total = Math.sqrt(total);
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
  updateDisplay();
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
      }
      break;
    case 'exp':
      if (buffer) {
        total = parseFloat(buffer);
        lastOperator = Exponenciacao;
        buffer = '';
      }
      break;
    case 'sqrt':
      if (buffer) {
        total = parseFloat(buffer);
        RaizQuadrada();
        buffer = '';
      }
      break;
    case 'add':
      applyLastOperation();
      lastOperator = Soma;
      buffer = ''; // Limpa o buffer após a operação
      break;
    case 'subtract':
      applyLastOperation();
      lastOperator = Subtracao;
      buffer = '';
      break;
    case 'multiply':
      applyLastOperation();
      lastOperator = Multiplicacao;
      buffer = '';
      break;
    case 'divide':
      applyLastOperation();
      lastOperator = Divisao;
      buffer = '';
      break;
    case 'result':
      applyLastOperation();
      updateDisplay(); // Atualiza o display após calcular o resultado
      lastOperator = null; // Reseta o operador
      buffer = ''; // Limpa o buffer após calcular o resultado
      break;
  }
}

// Aplica a última operação armazenada
function applyLastOperation() {
  if (lastOperator && buffer) {
    const parsedBuffer = parseFloat(buffer);
    lastOperator(parsedBuffer);
  } else if (!buffer && lastOperator) {
    lastOperator(total);
  } else if (buffer) {
    total = parseFloat(buffer);
  }
}

// Adiciona eventos de clique a todos os botões
document.querySelectorAll('.key').forEach(button => {
  button.addEventListener('click', handleButtonClick);
});

// Atualiza o display inicial
updateDisplay();
