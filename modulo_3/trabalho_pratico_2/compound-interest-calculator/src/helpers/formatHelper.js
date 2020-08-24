const formatter = Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

function formatCurrency(value) {
  return formatter.format(value);
}

function formatDecimal(value, decimals) {
  return (Math.round(value * 100) / 100).toFixed(decimals);
}

export { formatCurrency, formatDecimal };
