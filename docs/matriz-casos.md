# Matriz de casos de prueba

Función bajo prueba: `calcularTotal(precio, cantidad, descuento)`

| ID | Requisito | Técnica | Datos de entrada | Resultado esperado | Prioridad | Estado |
|---|---|---|---|---|---|---|
| CP-01 | RF-01 | Partición de equivalencia (válida) | precio=25; cantidad=4; descuento=0 | 100 | Alta | Aprobado |
| CP-02 | RF-02 | Partición de equivalencia (válida) | precio=100; cantidad=1; descuento=10 | 90 | Alta | Aprobado |
| CP-03 | RF-03 | Partición de equivalencia (con decimales) | precio=19.99; cantidad=3; descuento=15 | 50.97 | Alta | Aprobado |
| CP-04 | RF-02 y RF-03 | Valor límite (descuento máximo) | precio=50; cantidad=2; descuento=100 | 0 | Alta | Aprobado |
| CP-05 | RF-01 | Valor límite (cantidad mínima válida) | precio=10; cantidad=1; descuento=0 | 10 | Media | Aprobado |
| CP-06 | RF-04 | Valor límite (precio justo bajo cero) | precio=-0.01; cantidad=1; descuento=0 | RangeError | Alta | Aprobado |
| CP-07 | RF-04 | Valor límite (cantidad cero) | precio=10; cantidad=0; descuento=0 | RangeError | Alta | Aprobado |
| CP-08 | RF-04 | Partición inválida (cantidad negativa) | precio=10; cantidad=-3; descuento=0 | RangeError | Media | Aprobado |
| CP-09 | RF-04 | Valor límite (descuento bajo el mínimo) | precio=10; cantidad=1; descuento=-0.01 | RangeError | Alta | Aprobado |
| CP-10 | RF-04 | Valor límite (descuento sobre el máximo) | precio=10; cantidad=1; descuento=100.01 | RangeError | Alta | Aprobado |
| CP-11 | RF-05 | Datos inválidos (texto) | precio="100"; cantidad=1; descuento=10 | TypeError | Alta | Aprobado |
| CP-12 | RF-05 | Datos inválidos (NaN) | precio=NaN; cantidad=1; descuento=10 | TypeError | Alta | Aprobado |
| CP-13 | RF-05 | Datos inválidos (no finito) | precio=100; cantidad=Infinity; descuento=10 | TypeError | Media | Aprobado |
| CP-14 | RF-05 | Datos inválidos (valor ausente) | precio=100; cantidad=1; descuento=undefined | TypeError | Media | Aprobado |
| CP-15 | RF-01 | Valor límite (precio cero) | precio=0; cantidad=5; descuento=10 | 0 | Baja | Aprobado |
| CP-16 | RNF-01 | Exploratoria de rendimiento | 100000 llamadas con datos válidos | Tiempo registrado (referencia: menos de 1 s) | Baja | Aprobado |
| CP-17 | RF-03 | Valor límite (descuento máximo con decimales) | precio=7.67; cantidad=3; descuento=100 | 0 | Media | Aprobado |

## Trazabilidad por requisito

| Requisito | Casos que lo cubren |
|---|---|
| RF-01 | CP-01, CP-05, CP-15 |
| RF-02 | CP-02, CP-04 |
| RF-03 | CP-03, CP-04, CP-17 |
| RF-04 | CP-06, CP-07, CP-08, CP-09, CP-10 |
| RF-05 | CP-11, CP-12, CP-13, CP-14 |
| RNF-01 | CP-16 |