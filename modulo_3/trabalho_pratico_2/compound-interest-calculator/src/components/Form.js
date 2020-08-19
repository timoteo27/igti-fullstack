import React, { useState, useEffect } from 'react';

export default function Form({ calculateFunction }) {
  const [form, setForm] = useState({
    amount: 1000,
    interest: 0.5,
    months: 1,
  });

  useEffect(() => {
    calculateFunction(form.amount, form.interest, form.months);
  }, [form]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: Number(value),
    });
  }

  return (
    <div class="flex-row centered">
      <input
        type="number"
        name="amount"
        id="inputAmount"
        placeholder="Montante inicial"
        step="100"
        value={form.amount}
        onChange={handleChange}
      />
      <input
        type="number"
        name="interest"
        id="inputInterest"
        placeholder="Juros (meses)"
        step="0.1"
        value={form.interest}
        onChange={handleChange}
      />
      <input
        type="number"
        name="months"
        id="inputMonths"
        placeholder="Número mêses"
        step="1"
        value={form.months}
        onChange={handleChange}
      />
    </div>
  );
}
