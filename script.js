var total = 0;

function Soma(valor) {
  total += valor;
  return total;
}

function Subtracao(valor) {
  total -= valor;
  return total;
}

function Multiplicacao(valor) {
  total *= valor;
  return total;
}

function Divisao(valor) {
  if (valor === 0) {
    console.error("Erro: divisão por zero.");
    return NaN;
  }
  total /= valor;
  return total;
}

function Exponenciacao(valor) {
  total **=valor;
  return total;
}

function RaizQuadrada(expoente) {
  total = total ** (1/expoente); 
  return total;
}

function logaritimo(){
  total = Math.log10(total);
  return total;
}

function clean(){
  total= 0;
  return total;
}
           
// function calculate(value, a, number){
//   let b = true;
//   while(b){
//       b = (valor => (10 ** a))
//       if (b){
//         a += number
//       }
//     }
//     a -= number
//     return a;
// }

// function logaritimo(valor){
//   let a = 0;

//   a = calculate (valor, a, 1);
//   a = calculate (valor, a, 0.1);
//   a = calculate (valor, a, 0.01);
//   a = calculate (valor, a, 0.001);
//   a = calculate (valor, a, 0.0001);
// }

// logaritimo(2);



function Operacoes() {
  total = 2;
  console.log("soma 9: " + Soma(9));              
  console.log("sub 3: " + Subtracao(3));          
  console.log("Mult 4: " + Multiplicacao(4));      
  console.log("Div 2: " + Divisao(2));  
  total = 4;          
  console.log("ex 2: " + Exponenciacao(2));       
  console.log("raiz: " + RaizQuadrada(2));
  console.log("log:" + logaritimo());
}

Operacoes();
