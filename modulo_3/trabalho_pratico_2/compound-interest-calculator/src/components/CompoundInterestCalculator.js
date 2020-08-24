import React, { useState } from 'react';
import Form from './Form';
import Installments from './Installments';

export default function CompoundInterestCalculator() {
  const [installmentsCalculated, setInstallmentsCalculated] = useState([]);

  function calculateInstallments(amount, interest, months) {
    const installmentsArray = [];
    let calculatedCompound = amount;

    //prettier-ignore
    for (let index = 0; index < months; index++) {
      
      calculatedCompound = calculatedCompound + (calculatedCompound * (interest / 100));

      const installmentValue = calculatedCompound - amount;
      const installmentPercentage = (installmentValue * 100) / amount;

      installmentsArray.push({
        sequence: index + 1,
        amountValue: calculatedCompound,
        installmentValue,
        installmentPercentage,
      });
    }

    setInstallmentsCalculated(installmentsArray);
  }

  return (
    <>
      <Form calculateFunction={calculateInstallments} />
      <div className="installments">
        <Installments array={installmentsCalculated} />
      </div>
    </>
  );
}
