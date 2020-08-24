import React from 'react';
import Title from './components/Title';
import CompoundInterestCalculator from './components/CompoundInterestCalculator';

function App() {
  return (
    <>
      <div className="centered">
        <Title>React - Juros Compostos</Title>
      </div>
      <CompoundInterestCalculator />
    </>
  );
}

export default App;
