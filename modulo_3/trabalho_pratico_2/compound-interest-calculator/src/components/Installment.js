import React from 'react';

export default function Installment({
  installment: { sequence, amountValue, interestValue },
}) {
  return (
    <div style={styles.box}>
      <div>{sequence}</div>
      <div>{amountValue}</div>
      <div>{interestValue}</div>
    </div>
  );
}

const styles = {
  box: {
    backgroundColor: 'red',
    margin: '10px',
  },
};
