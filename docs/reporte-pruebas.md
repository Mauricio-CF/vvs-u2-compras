# Reporte de pruebas: módulo de cálculo de compras

**Autor:** Jaime Carvajal
**Asignatura:** Verificación y Validación de Software, Unidad 2
**Fecha:** noviembre de 2026

## 1. Resumen

Se probó la función `calcularTotal` de `src/compras.js` con 17 casos de prueba diseñados a partir de la especificación. 16 de ellos están automatizados con Jest y el restante es una medición exploratoria de rendimiento. Sobre el código inicial fallaron 10 de las 15 pruebas con las que se arranco. se encontro 6 defectos que se crrigio uno por uno. Al final las 16 pruebas automatizadas pasan y la medición de rendimiento cumple la referencia que se fijó.

## 2. Resultados de ejecución

| Ejecución | Momento | Aprobadas | Fallidas | Total |
|---|---|---|---|---|
| 1 | Código inicial | 5 | 10 | 15 |
| 2 | Tras corregir DEF-04 | 9 | 6 | 15 |
| 3 | Tras corregir DEF-01 | 10 | 5 | 15 |
| 4 | Tras corregir DEF-02 | 12 | 3 | 15 |
| 5 | Tras corregir DEF-03 | 14 | 1 | 15 |
| 6 | Tras corregir DEF-05 | 15 | 0 | 15 |
| 7 | Regresión con el caso nuevo CP-17 | 15 | 1 | 16 |
| 8 | Final tras corregir DEF-06 | 16 | 0 | 16 |

Las evidencias guardadas son `evidencias/pruebas-iniciales.txt` (ejecución 1), `evidencias/regresion-hallazgo.txt` (ejecución 7) y `evidencias/pruebas-finales.txt` (ejecución 8). Las ejecuciones intermedias se comprobó en la terminal después de cada commit.

## 3. Defectos

| ID | Defecto | Requisito | Severidad | Estado |
|---|---|---|---|---|
| DEF-01 | Acepta un precio negativo | RF-04 | Alta | Corregido |
| DEF-02 | Acepta una cantidad menor o igual a 0 | RF-04 | Alta | Corregido |
| DEF-03 | Acepta un descuento fuera del rango de 0 a 100 | RF-04 | Alta | Corregido |
| DEF-04 | No rechaza entradas no numéricas ni no finitas | RF-05 | Alta | Corregido |
| DEF-05 | No redondea el total a dos decimales | RF-03 | Media | Corregido |
| DEF-06 | El descuento del 100 % devuelve -0 con ciertos decimales | RF-03 | Baja | Corregido |

El detalle de cada uno (pasos, resultado esperado, resultado real y evidencia) está en `docs/registro-defectos.md`. DEF-06 apareció en la regresión. Los datos de CP-04 daban un resultado exacto y escondían el problema hasta que se probó con 7.67 por 3.

## 4. Cobertura por requisito

| Requisito | Casos | Cubierto |
|---|---|---|
| RF-01 | CP-01, CP-05, CP-15 | Sí |
| RF-02 | CP-02, CP-04 | Sí |
| RF-03 | CP-03, CP-04, CP-17 | Sí |
| RF-04 | CP-06, CP-07, CP-08, CP-09, CP-10 | Sí |
| RF-05 | CP-11, CP-12, CP-13, CP-14 | Sí |
| RNF-01 | CP-16 | Sí (exploratorio) |

Los seis requisitos tienen al menos un caso que los cubre. Esta cobertura es por requisito. No se midió cobertura de código con Jest.

## 5. Rendimiento

**Entorno:** MacBook Pro con Intel Core i9-9980HK a 2.40 GHz y 32 GB de memoria. Sistema Darwin 25.6.0 (x64) con Node v24.11.0.

**Método:** 100 000 llamadas seguidas a `calcularTotal` con datos válidos que cambian en cada vuelta. se hace una pasada de calentamiento que no se cuenta y cinco repeticiones medidas con `performance.now()`.

| Medida | Resultado |
|---|---|
| Mínimo | 1.93 ms |
| Máximo | 2.34 ms |
| Promedio | 2.11 ms |
| Tiempo por llamada | 0.021 microsegundos |

El promedio queda muy por debajo de la referencia de CP-16 (menos de 1000 ms), así que el caso cumple. La evidencia está en `evidencias/rendimiento.txt`.

**Limitaciones:** es una sola máquina y una sola versión de Node. Mide una función aislada y muy simple. Los tiempos cambian según lo que tenga abierto el equipo. No representa carga real con muchos usuarios y la referencia de 1 segundo la fijé yo porque la especificación no da un umbral.

## 6. Riesgos residuales

- **Redondeo en puntos medios.** Los decimales se guardan en binario y por eso algunos valores quedan un poco por debajo de lo que se ve escrito. Por ejemplo `calcularTotal(1.005, 1, 0)` devuelve 1 cuando al redondear a mano esperaría 1.01. No tengo una prueba para esto. Una solución más robusta sería trabajar con centavos enteros.
- **Valores muy grandes.** Un precio o una cantidad enormes pasan la validación porque son números finitos pero el cálculo podría producir un resultado que ya no lo es. No lo probé.
- **Supuestos sin confirmar.** Asumí que el precio 0 es válido y que la cantidad no tiene que ser entera. Si el cliente decide otra cosa habría que cambiar el código y las pruebas.
- **Cobertura limitada de datos.** Son 17 casos elegidos con partición de equivalencia y valores límite. No cubren todas las combinaciones posibles de los tres parámetros.
- **Rendimiento.** La medición es exploratoria y depende del equipo (ver las limitaciones de la sección 5).

## 7. Conclusión

Con las pruebas ejecutadas el módulo cumple los requisitos RF-01 a RF-05 y la referencia de rendimiento. Los riesgos de la sección 6 quedan abiertos para una siguiente iteración.