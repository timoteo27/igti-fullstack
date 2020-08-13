import React, { Component } from 'react';
import { formatCurrency, formatDecimal } from '../helpers/formatHelper.js';

export default class ReadOnlyField extends Component {
  calculatePercentual = (value, total) => {
    if (total <= 0) return 0;
    return formatDecimal((value * 100) / total, 2);
  };

  render() {
    const { value, totalValue, label, valueColorStyle } = this.props;
    const inputStyle = { color: valueColorStyle };
    let valueFormatted = formatCurrency(value);

    if (totalValue !== undefined && Number(totalValue) > 0) {
      valueFormatted += ` (${this.calculatePercentual(value, totalValue)}%)`;
    }

    return (
      <div>
        <label>{label}</label>
        <input
          style={inputStyle}
          type="text"
          value={valueFormatted}
          readOnly
          disabled
        />
      </div>
    );
  }
}
