import React from 'react';
import Installment from './Installment';

export default function Installments({ array }) {
  return array.map((i) => (
    <div key={i.sequence}>
      <Installment installment={i} />
    </div>
  ));
}
