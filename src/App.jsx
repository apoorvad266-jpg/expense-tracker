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
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  const [search, setSearch] = useState("");

  const [income, setIncome] = useState(() => {
    return localStorage.getItem("income") || 0;
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("income", income);
  }, [income]);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  const addExpense = () => {
    if (!title || !amount || !category || !date) return;

    const newExpense = {
      id: Date.now(),
      title,
      description,
      account,
      amount: Number(amount),
      category,
      date,
    };

    setExpenses([...expenses, newExpense]);

    setTitle("");
    setDescription("");
    setAccount("");
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

  const balance = Number(income || 0) - total;
  const totalRecords = expenses.length;

  const chartData = [
    { name: "Expenses", value: total },
    {
      name: "Remaining",
      value: Math.max(Number(income) - total, 0),
    },
  ];

  const COLORS = [
  "#8b5cf6",
  "#c084fc"
];

  const filteredExpenses = expenses.filter((expense) =>
    expense.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`container ${darkMode ? "dark" : "light"}`}>
          <div className="theme-toggle">
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <h1>💰 Expense Tracker</h1>
      <p>Track your daily expenses easily</p>

      <div className="box">
        <input
          type="number"
          placeholder="Enter Income"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
        />

        <input
          placeholder="Expense Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          value={account}
          onChange={(e) => setAccount(e.target.value)}
        >
          <option value="">Select Account</option>
          <option value="Cash">Cash</option>
          <option value="Bank">Bank</option>
          <option value="UPI">UPI</option>
        </select>

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

        <button onClick={addExpense}>Add Expense</button>
      </div>

      <div className="dashboard">
        <div className="card">
          <h3>Total Income</h3>
          <p>₹{income || 0}</p>
        </div>

        <div className="card">
          <h3>Total Expense</h3>
          <p>₹{total}</p>
        </div>

        <div className="card">
          <h3>Total Records</h3>
          <p>{totalRecords}</p>
        </div>

        <div className="card">
          <h3>Total Balance</h3>
          <p>₹{balance}</p>
        </div>
      </div>
            <div className="chart-box">
        <h2>Expense Chart</h2>

        <input
          className="search"
          type="text"
          placeholder="Search Transaction..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              outerRadius={100}
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {filteredExpenses.length === 0 ? (
        <p style={{ textAlign: "center" }}>No transactions found.</p>
      ) : (
        filteredExpenses.map((expense) => (
          <div className="expense" key={expense.id}>
            <div>
              <h3>{expense.title}</h3>

              {expense.description && (
                <p>Description: {expense.description}</p>
              )}

              {expense.account && (
                <p>Account: {expense.account}</p>
              )}

              <p>Amount: ₹{expense.amount}</p>
              <p>Category: {expense.category}</p>
              <p>Date: {expense.date}</p>
            </div>

            <button onClick={() => deleteExpense(expense.id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;