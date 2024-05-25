export function ConvertToLocalePrice(price: number) {
  const precioFormateado = (price / 100).toLocaleString("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return precioFormateado;
}

export function ConvertToCents(price: number) {
  const precioEnCentavos = price * 100;
  return precioEnCentavos;
}
