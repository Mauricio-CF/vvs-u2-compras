# Plan de pruebas: módulo de cálculo de compras

**Autor:** Jaime Carvajal
**Asignatura:** Verificación y Validación de Software, Unidad 2
**Fecha:** noviembre de 2026

## 1. Objetivo

Se verificará con pruebas dinámicas que la función `calcularTotal` del archivo `src/compras.js` cumple la especificación de la tienda digital. Para lograrlo se va a ejecutar el código real con datos concretos y comparar lo que devuelve contra lo que debería devolver. El código inicial trae defectos intencionales así que se espera encontrar fallos desde la primera ejecución.

## 2. Alcance

**Dentro del alcance**
- La función `calcularTotal(precio, cantidad, descuento)`.
- Los requisitos RF-01 a RF-05.
- Una exploración limitada de rendimiento (RNF-01).

**Fuera del alcance**
- Interfaz de usuario, base de datos y pasarela de pago porque el módulo no los incluye.
- Pruebas de carga o estrés con herramientas especializadas.
- Otras características de calidad de ISO/IEC 25010 como seguridad o usabilidad.

## 3. Requisitos a probar

| ID | Descripción resumida |
|---|---|
| RF-01 | El subtotal es precio por cantidad para números positivos. |
| RF-02 | El descuento acepta valores de 0 a 100 %. |
| RF-03 | El total se entrega con dos decimales y un descuento del 100 % da 0. |
| RF-04 | Se lanza RangeError con precio negativo, cantidad menor o igual a 0 o descuento fuera de rango. |
| RF-05 | Se lanza TypeError con entradas no numéricas o no finitas. |
| RNF-01 | Exploración limitada de rendimiento. |

## 4. Tipos de pruebas

- **Funcionales:** valores válidos que verifican RF-01, RF-02 y RF-03.
- **Negativas:** entradas inválidas que verifican RF-04 y RF-05.
- **No funcional:** una medición exploratoria de tiempo para RNF-01 (eficiencia de desempeño según ISO/IEC 25010).
- **Regresión:** después de cada corrección vuelvo a ejecutar todo el conjunto para confirmar que no rompí nada que ya funcionaba.

Las pruebas se diseñan desde la especificación (caja negra) aunque conozco el código fuente.

## 5. Niveles de prueba

Trabajo solo a nivel **unitario** porque el módulo es una única función sin dependencias externas. Las pruebas de integración o de sistema no aportarían nada aquí ya que no hay otros componentes con los que interactúe.

## 6. Técnicas de diseño de casos

Uso partición de equivalencia, análisis de valores límite y datos inválidos.

| Dato | Partición inválida | Partición válida | Límites que pruebo |
|---|---|---|---|
| precio | menor que 0 o no numérico | 0 o mayor | -0.01 y 0 |
| cantidad | 0 o menor o no numérico | mayor que 0 | 0 y 1 |
| descuento | menor que 0, mayor que 100 o no numérico | de 0 a 100 | -0.01, 0, 100 y 100.01 |

## 7. Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| Errores de redondeo por la forma en que JavaScript guarda los decimales | Alta | Alta | Casos con decimales que comparan el resultado ya redondeado a dos cifras. |
| El código no valida y devuelve NaN o valores absurdos | Alta | Alta | Casos negativos para RF-04 y RF-05. |
| JavaScript convierte texto en número sin avisar (por ejemplo "100" por 2 da 200) | Alta | Media | Casos con entradas de texto. |
| La especificación no aclara algunos detalles | Media | Media | Dejar los supuestos escritos en la sección 11. |
| Corregir el código solo para que pase la prueba sin respetar el requisito | Media | Alta | No se cambian requisitos ni resultados esperados y cada corrección se ata a un defecto. |
| El rendimiento depende del equipo donde se mide | Media | Baja | Describir el ambiente y repetir la medición varias veces. |

## 8. Ambiente de pruebas

| Elemento | Detalle |
|---|---|
| Equipo | MacBook Pro con macOS |
| Node.js | v24.11.0 |
| npm | 11.6.1 |
| Jest | 30.5.2 |
| Editor | Visual Studio Code |
| Control de versiones | Git con repositorio en GitHub |
| Comando de ejecución | `npm test` (que corre `jest --runInBand`) |
## 9. Criterios de entrada

- El proyecto está creado con Jest instalado y `npm test` funciona.
- El código inicial está guardado en el primer commit.
- Este plan y la matriz de casos están redactados.
- Los requisitos RF-01 a RF-05 y RNF-01 están definidos.

## 10. Criterios de salida

- Todos los casos de la matriz fueron ejecutados.
- Hay al menos 10 casos automatizados con evidencia inicial y final.
- Hay al menos tres defectos registrados con su evidencia.
- Todas las pruebas automatizadas pasan después de las correcciones y de la regresión.
- Cada requisito tiene al menos un caso que lo cubre.
- El reporte final incluye los riesgos residuales.

## 11. Supuestos

- El precio 0 es válido porque RF-04 solo rechaza precios negativos.
- La cantidad no tiene que ser entera porque la especificación no lo exige.
- El redondeo se hace al centésimo más cercano.
- Si una entrada no es numérica se lanza TypeError antes de revisar los rangos.

## 12. Entregables

`src/compras.js`, `tests/compras.test.js`, `docs/plan-pruebas.md`, `docs/matriz-casos.md`, `docs/reporte-pruebas.md`, `evidencias/pruebas-iniciales.txt`, `evidencias/pruebas-finales.txt`, `README.md` y el informe en PDF.