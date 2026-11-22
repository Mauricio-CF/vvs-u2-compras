# Matriz de casos de prueba

Función bajo prueba: `calcularTotal(precio, cantidad, descuento)`

| ID | Requisito | Técnica | Datos de entrada | Resultado esperado | Prioridad | Estado |
|---|---|---|---|---|---|---|
| CP-01 | RF-01 | Partición de equivalencia (válida) | precio=25; cantidad=4; descuento=0 | 100 | Alta | Pendiente |
| CP-02 | RF-02 | Partición de equivalencia (válida) | precio=100; cantidad=1; descuento=10 | 90 | Alta | Pendiente |
| CP-03 | RF-03 | Partición de equivalencia (con decimales) | precio=19.99; cantidad=3; descuento=15 | 50.97 | Alta | Pendiente |
| CP-04 | RF-02 y RF-03 | Valor límite (descuento máximo) | precio=50; cantidad=2; descuento=100 | 0 | Alta | Pendiente |
| CP-05 | RF-01 | Valor límite (cantidad mínima válida) | precio=10; cantidad=1; descuento=0 | 10 | Media | Pendiente |
| CP-06 | RF-04 | Valor límite (precio justo bajo cero) | precio=-0.01; cantidad=1; descuento=0 | RangeError | Alta | Pendiente |
| CP-07 | RF-04 | Valor límite (cantidad cero) | precio=10; cantidad=0; descuento=0 | RangeError | Alta | Pendiente |
| CP-08 | RF-04 | Partición inválida (cantidad negativa) | precio=10; cantidad=-3; descuento=0 | RangeError | Media | Pendiente |
| CP-09 | RF-04 | Valor límite (descuento bajo el mínimo) | precio=10; cantidad=1; descuento=-0.01 | RangeError | Alta | Pendiente |
| CP-10 | RF-04 | Valor límite (descuento sobre el máximo) | precio=10; cantidad=1; descuento=100.01 | RangeError | Alta | Pendiente |
| CP-11 | RF-05 | Datos inválidos (texto) | precio="100"; cantidad=1; descuento=10 | TypeError | Alta | Pendiente |
| CP-12 | RF-05 | Datos inválidos (NaN) | precio=NaN; cantidad=1; descuento=10 | TypeError | Alta | Pendiente |
| CP-13 | RF-05 | Datos inválidos (no finito) | precio=100; cantidad=Infinity; descuento=10 | TypeError | Media | Pendiente |
| CP-14 | RF-05 | Datos inválidos (valor ausente) | precio=100; cantidad=1; descuento=undefined | TypeError | Media | Pendiente |
| CP-15 | RF-01 | Valor límite (precio cero) | precio=0; cantidad=5; descuento=10 | 0 | Baja | Pendiente |
| CP-16 | RNF-01 | Exploratoria de rendimiento | 100000 llamadas con datos válidos | Tiempo registrado (referencia: menos de 1 s) | Baja | Pendiente |

## Trazabilidad por requisito

| Requisito | Casos que lo cubren |
|---|---|
| RF-01 | CP-01, CP-05, CP-15 |
| RF-02 | CP-02, CP-04 |
| RF-03 | CP-03, CP-04 |
| RF-04 | CP-06, CP-07, CP-08, CP-09, CP-10 |
| RF-05 | CP-11, CP-12, CP-13, CP-14 |
| RNF-01 | CP-16 |