# VVS Unidad 2: pruebas dinámicas del módulo de compras

Proyecto de la Unidad 2 de Verificación y Validación de Software. Pruebo con Jest la función `calcularTotal`, que calcula el total de una compra a partir de un precio, una cantidad y un descuento. El código inicial traía defectos intencionales. Los documenté, los corregí uno por uno y verifiqué todo con regresión.

**Autor:** Jaime Carvajal

## Estructura

| Carpeta o archivo | Contenido |
|---|---|
| `src/compras.js` | Función `calcularTotal` ya corregida |
| `tests/compras.test.js` | 16 pruebas automatizadas con Jest |
| `tests/rendimiento.js` | Medición exploratoria de rendimiento |
| `docs/plan-pruebas.md` | Alcance, riesgos, tipos y niveles de prueba, ambiente y criterios |
| `docs/matriz-casos.md` | 17 casos de prueba con trazabilidad por requisito |
| `docs/registro-defectos.md` | Seis defectos con pasos, esperado, real y severidad |
| `docs/reporte-pruebas.md` | Resultados, cobertura por requisito y riesgos residuales |
| `evidencias/` | Salidas guardadas de las ejecuciones inicial, de regresión, final y de rendimiento |

## Requisitos

- Node.js (usé la versión 24.11.0)
- npm

## Cómo ejecutarlo

Instalar las dependencias:

```bash
npm install
```

Correr las pruebas:

```bash
npm test
```

Correr la medición de rendimiento:

```bash
npm run rendimiento
```

## Resultados

- Código inicial: 5 pruebas aprobadas y 10 fallidas de 15.
- Código final: 16 pruebas aprobadas de 16.
- Rendimiento: promedio de 2.11 ms para 100 000 llamadas en mi equipo.

El detalle completo está en `docs/reporte-pruebas.md`.