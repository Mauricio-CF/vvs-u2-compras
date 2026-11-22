function calcularTotal(precio, cantidad, descuento) {
  if (!Number.isFinite(precio) || !Number.isFinite(cantidad) || !Number.isFinite(descuento)) {
    throw new TypeError('precio, cantidad y descuento deben ser números finitos');
  }
  if (precio < 0) {
    throw new RangeError('El precio no puede ser negativo');
  }
  if (cantidad <= 0) {
    throw new RangeError('La cantidad debe ser mayor que 0');
  }
  if (descuento < 0 || descuento > 100) {
    throw new RangeError('El descuento debe estar entre 0 y 100');
  }
  const subtotal = precio * cantidad;
  const valorDescuento = subtotal * descuento / 100;
  const total = subtotal - valorDescuento;
  return Math.round(total * 100) / 100;
}
module.exports = { calcularTotal };