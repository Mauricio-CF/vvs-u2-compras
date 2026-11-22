function calcularTotal(precio, cantidad, descuento) {
  if (!Number.isFinite(precio) || !Number.isFinite(cantidad) || !Number.isFinite(descuento)) {
    throw new TypeError('precio, cantidad y descuento deben ser números finitos');
  }
  if (precio < 0) {
    throw new RangeError('El precio no puede ser negativo');
  }
  const subtotal = precio * cantidad;
  const valorDescuento = subtotal * descuento / 100;
  return subtotal - valorDescuento;
}
module.exports = { calcularTotal };