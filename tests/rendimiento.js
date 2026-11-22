const { performance } = require('perf_hooks');
const os = require('os');
const { calcularTotal } = require('../src/compras');

const LLAMADAS = 100000;
const REPETICIONES = 5;
const REFERENCIA_MS = 1000;

function medirUnaVez() {
  const inicio = performance.now();
  let acumulado = 0;
  for (let i = 0; i < LLAMADAS; i++) {
    acumulado += calcularTotal(10 + (i % 90), 1 + (i % 5), i % 101);
  }
  return { ms: performance.now() - inicio, acumulado };
}

console.log('Entorno de medición');
console.log('  Node:', process.version);
console.log('  Sistema:', os.type(), os.release(), os.arch());
console.log('  Procesador:', os.cpus()[0].model);
console.log('  Memoria total:', (os.totalmem() / 1024 ** 3).toFixed(1), 'GB');
console.log('');

medirUnaVez();

const tiempos = [];
let sumaDeControl = 0;
for (let n = 1; n <= REPETICIONES; n++) {
  const { ms, acumulado } = medirUnaVez();
  sumaDeControl = acumulado;
  tiempos.push(ms);
  console.log(`Repetición ${n}: ${ms.toFixed(2)} ms para ${LLAMADAS} llamadas`);
}

const minimo = Math.min(...tiempos);
const maximo = Math.max(...tiempos);
const promedio = tiempos.reduce((a, b) => a + b, 0) / tiempos.length;

console.log('');
console.log(`Mínimo:   ${minimo.toFixed(2)} ms`);
console.log(`Máximo:   ${maximo.toFixed(2)} ms`);
console.log(`Promedio: ${promedio.toFixed(2)} ms`);
console.log(`Tiempo por llamada (promedio): ${((promedio / LLAMADAS) * 1000).toFixed(3)} microsegundos`);
console.log(`Suma de control de los resultados: ${sumaDeControl.toFixed(2)}`);
console.log(`Referencia de CP-16: menos de ${REFERENCIA_MS} ms -> ${promedio < REFERENCIA_MS ? 'CUMPLE' : 'NO CUMPLE'}`);