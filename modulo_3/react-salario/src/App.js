import React, { Component } from 'react';
import './app.module.css';
import ReadOnlyField from './components/ReadOnlyField';
import { calculateSalaryFrom } from './library/salary.js';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      salary: 0,
      calculatedSalary: {
        baseINSS: 0,
        discountINSS: 0,
        baseIRPF: 0,
        discountIRPF: 0,
        netSalary: 0,
      },
    };
  }

  handleSalaryChange = (event) => {
    const salary = Number(event.target.value);

    this.setState({
      salary,
      calculatedSalary: calculateSalaryFrom(salary),
    });
  };

  render() {
    const { salary } = this.state;
    const {
      baseINSS,
      discountINSS,
      baseIRPF,
      discountIRPF,
      netSalary,
    } = this.state.calculatedSalary;

    return (
      <>
        <h1>React Salário</h1>
        <div>
          <label>Informe seu salário bruto: </label>
          <input
            type="text"
            value={salary}
            onChange={this.handleSalaryChange}
          />
        </div>

        <ReadOnlyField
          label="Base INSS:"
          value={baseINSS}
          valueColorStyle="red"
        />
        <ReadOnlyField
          label="Desconto INSS:"
          value={discountINSS}
          totalValue={salary}
          valueColorStyle="blue"
        />
        <ReadOnlyField
          label="Base IRPF:"
          value={baseIRPF}
          valueColorStyle="green"
        />
        <ReadOnlyField
          label="Desconto IRPF:"
          value={discountIRPF}
          totalValue={salary}
          valueColorStyle="orange"
        />
        <ReadOnlyField
          label="Salário Líquido:"
          value={netSalary}
          totalValue={salary}
          valueColorStyle="purple"
        />
      </>
    );
  }
}

const styles = {};
