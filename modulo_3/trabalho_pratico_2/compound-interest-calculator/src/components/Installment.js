import React from 'react';
import { formatCurrency, formatDecimal } from '../helpers/formatHelper';

export default function Installment({
  installment: {
    sequence,
    amountValue,
    installmentValue,
    installmentPercentage,
  },
}) {
  return (
    <div className="installment-box">
      <div className="installment-number">{sequence}</div>
      <div className="installment-info">
        <span>{formatCurrency(amountValue)}</span>
        <span>{formatCurrency(installmentValue)}</span>
        <span>{formatDecimal(installmentPercentage, 2)}%</span>
      </div>
    </div>
  );
}
