import React, { useState } from 'react';
import Form from './Form';
import Installments from './Installments';

export default function CompoundInterestCalculator() {
  const [installmentsCalculated, setInstallmentsCalculated] = useState([]);

  function calculateInstallments(amount, interest, months) {
    const installmentsArray = [];

    for (let index = 0; index < months; index++) {
      const amountValue = amount + amount * interest;

      installmentsArray.push({
        sequence: index + 1,
        amountValue,
        installmentValue: index * 10,
        installmentPercentage: index * 20,
      });
    }

    setInstallmentsCalculated(installmentsArray);
  }

  return (
    <>
      <Form calculateFunction={calculateInstallments} />
      <Installments array={installmentsCalculated} />
    </>
  );
}
