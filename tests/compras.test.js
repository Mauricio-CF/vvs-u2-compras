const { calcularTotal } = require('../src/compras');

describe('calcularTotal', () => {
  describe('Cálculos con datos válidos (RF-01, RF-02 y RF-03)', () => {
    test('CP-01: calcula el subtotal sin descuento', () => {
      expect(calcularTotal(25, 4, 0)).toBe(100);
    });

    test('CP-02: aplica un descuento del 10 %', () => {
      expect(calcularTotal(100, 1, 10)).toBe(90);
    });

    test('CP-03: redondea el total a dos decimales', () => {
        expect(calcularTotal(19.99, 3, 15)).toBe(50.97);
    });

    test('CP-04: un descuento del 100 % deja el total en 0', () => {
      expect(calcularTotal(50, 2, 100)).toBe(0);
    });

    test('CP-05: acepta la cantidad mínima válida (1)', () => {
      expect(calcularTotal(10, 1, 0)).toBe(10);
    });

    test('CP-15: un precio de 0 es válido y el total es 0', () => {
      expect(calcularTotal(0, 5, 10)).toBe(0);
    });
  });

  describe('Valores fuera de rango (RF-04)', () => {
    test('CP-06: rechaza un precio negativo', () => {
      expect(() => calcularTotal(-0.01, 1, 0)).toThrow(RangeError);
    });

    test('CP-07: rechaza una cantidad igual a 0', () => {
      expect(() => calcularTotal(10, 0, 0)).toThrow(RangeError);
    });

    test('CP-08: rechaza una cantidad negativa', () => {
      expect(() => calcularTotal(10, -3, 0)).toThrow(RangeError);
    });

    test('CP-09: rechaza un descuento menor que 0', () => {
      expect(() => calcularTotal(10, 1, -0.01)).toThrow(RangeError);
    });

    test('CP-10: rechaza un descuento mayor que 100', () => {
      expect(() => calcularTotal(10, 1, 100.01)).toThrow(RangeError);
    });
  });

  describe('Entradas no numéricas o no finitas (RF-05)', () => {
    test('CP-11: rechaza un precio escrito como texto', () => {
      expect(() => calcularTotal('100', 1, 10)).toThrow(TypeError);
    });

    test('CP-12: rechaza NaN', () => {
      expect(() => calcularTotal(NaN, 1, 10)).toThrow(TypeError);
    });

    test('CP-13: rechaza valores infinitos', () => {
      expect(() => calcularTotal(100, Infinity, 10)).toThrow(TypeError);
    });

    test('CP-14: rechaza un descuento ausente (undefined)', () => {
      expect(() => calcularTotal(100, 1, undefined)).toThrow(TypeError);
    });

        test('CP-17: un descuento del 100 % devuelve 0 también con decimales', () => {
      // Con 7.67 por 3 los decimales binarios dejan una diferencia mínima y el redondeo
      // la convierte en -0. Hay que comprobar que el resultado sea un 0 de verdad.
      expect(calcularTotal(7.67, 3, 100)).toBe(0);
    });
  });
});