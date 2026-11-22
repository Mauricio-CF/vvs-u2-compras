# Registro de defectos

Todos los defectos se encontraron ejecutando `npm test` sobre el código inicial de `src/compras.js`. La salida completa está en `evidencias/pruebas-iniciales.txt` (10 pruebas fallidas y 5 aprobadas de 15).

## Resumen

| ID | Defecto | Requisito | Casos que fallan | Severidad | Estado |
|---|---|---|---|---|---|
| DEF-01 | Acepta un precio negativo | RF-04 | CP-06 | Alta | Abierto |
| DEF-02 | Acepta una cantidad menor o igual a 0 | RF-04 | CP-07, CP-08 | Alta | Abierto |
| DEF-03 | Acepta un descuento fuera del rango 0 a 100 | RF-04 | CP-09, CP-10 | Alta | Abierto |
| DEF-04 | No rechaza entradas no numéricas ni no finitas | RF-05 | CP-11, CP-12, CP-13, CP-14 | Alta | Abierto |
| DEF-05 | No redondea el total a dos decimales | RF-03 | CP-03 | Media | Abierto |
| DEF-06 | El descuento del 100 % devuelve -0 con ciertos decimales | RF-03 | CP-17 | Baja | Abierto |

## Detalle

### DEF-01: acepta un precio negativo
- **Pasos:** ejecutar `calcularTotal(-0.01, 1, 0)`.
- **Esperado:** lanzar `RangeError`.
- **Real:** devuelve `-0.01` sin ningún error.
- **Severidad:** Alta. Una compra con precio negativo produce un total negativo y en una tienda real eso podría significar devolver dinero al cliente.
- **Evidencia:** prueba CP-06 en `evidencias/pruebas-iniciales.txt`.

### DEF-02: acepta una cantidad menor o igual a 0
- **Pasos:** ejecutar `calcularTotal(10, 0, 0)` y `calcularTotal(10, -3, 0)`.
- **Esperado:** lanzar `RangeError` en ambos casos.
- **Real:** devuelve `0` y `-30` respectivamente.
- **Severidad:** Alta. Permite generar compras vacías o totales negativos.
- **Evidencia:** pruebas CP-07 y CP-08 en `evidencias/pruebas-iniciales.txt`.

### DEF-03: acepta un descuento fuera del rango de 0 a 100
- **Pasos:** ejecutar `calcularTotal(10, 1, -0.01)` y `calcularTotal(10, 1, 100.01)`.
- **Esperado:** lanzar `RangeError` en ambos casos.
- **Real:** devuelve `10.001` (el descuento negativo encarece la compra) y `-0.0009999999999994458` (un descuento mayor a 100 deja el total en negativo).
- **Severidad:** Alta. Afecta directamente el dinero que se cobra.
- **Evidencia:** pruebas CP-09 y CP-10 en `evidencias/pruebas-iniciales.txt`.

### DEF-04: no rechaza entradas no numéricas ni no finitas
- **Pasos:** ejecutar `calcularTotal("100", 1, 10)`, `calcularTotal(NaN, 1, 10)`, `calcularTotal(100, Infinity, 10)` y `calcularTotal(100, 1, undefined)`.
- **Esperado:** lanzar `TypeError` en los cuatro casos.
- **Real:** con el texto `"100"` devuelve `90` porque JavaScript lo convierte en número sin avisar. En los otros tres devuelve `NaN`.
- **Severidad:** Alta. El texto convertido en silencio oculta errores de quien llama a la función y el `NaN` se propaga a cualquier cálculo posterior.
- **Evidencia:** pruebas CP-11 a CP-14 en `evidencias/pruebas-iniciales.txt`.

### DEF-05: no redondea el total a dos decimales
- **Pasos:** ejecutar `calcularTotal(19.99, 3, 15)`.
- **Esperado:** `50.97`.
- **Real:** devuelve `50.9745`.
- **Severidad:** Media. El cálculo es correcto pero el formato no cumple RF-03 y cobrar fracciones de centavo causaría inconsistencias contables.
- **Evidencia:** prueba CP-03 en `evidencias/pruebas-iniciales.txt`.

### DEF-06: el descuento del 100 % devuelve -0 con ciertos decimales
- **Pasos:** ejecutar `calcularTotal(7.67, 3, 100)`.
- **Esperado:** `0`.
- **Real:** con el código inicial devuelve `-3.55e-15` y tras corregir el redondeo (DEF-05) devuelve `-0`.
- **Severidad:** Baja. El valor es casi cero y no afecta el dinero cobrado de forma visible, pero incumple que el 100 % produzca 0 y un `-0` puede dar resultados raros al comparar o mostrar el valor.
- **Evidencia:** prueba CP-17 en `evidencias/regresion-hallazgo.txt`. Se encontró durante la regresión porque los datos de CP-04 daban exacto.