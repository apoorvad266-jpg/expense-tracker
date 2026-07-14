import { useState, useEffect } from "react";
import "./App.css";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function App() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = () => {
    if (!title || !amount || !category || !date) return;

    const newExpense = {
      id: Date.now(),
      title,
      amount: Number(amount),
      category,
      date,
    };

    setExpenses([...expenses, newExpense]);

    setTitle("");
    setAmount("");
    setCategory("");
    setDate("");
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const total = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const totalRecords = expenses.length;

  const chartData = [
    {
      name: "Expenses",
      value: total,
    },
    {
      name: "Remaining",
      value: Math.max(10000 - total, 0),
    },
  ];

  const COLORS = ["#2e7d32", "#c8e6c9"];

  return (
    <div className="container">

      <h1>💰 Expense Tracker</h1>
      <p>Track your daily expenses easily</p>

      <div className="box">

        <input
          placeholder="Expense Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button onClick={addExpense}>
          Add Expense
        </button>

      </div>

      <div className="dashboard">

        <div className="card">
          <h3>Total Expense</h3>
          <p>₹{total}</p>
        </div>

        <div className="card">
          <h3>Total Records</h3>
          <p>{totalRecords}</p>
        </div>

      </div>

      <div className="chart-box">

        <h2>Expense Chart</h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <PieChart>

            <Pie
              data={chartData}
              dataKey="value"
              outerRadius={100}
              label
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div> 
            {expenses.map((expense) => (

        <div className="expense" key={expense.id}>

          <div>
            <h3>{expense.title}</h3>

            <p>
              Amount: ₹{expense.amount}
            </p>

            <p>
              Category: {expense.category}
            </p>

            <p>
              Date: {expense.date}
            </p>
          </div>


          <button
            onClick={() => deleteExpense(expense.id)}
          >
            Delete
          </button>

        </div>

      ))}

    </div>
  );
}

export default App;