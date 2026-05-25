import { useState, useEffect } from "react";

import "./App.css";

function App() {
    const [expenses, setExpenses] = useState([]);
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("Food");

    // Load data from localStorage
    useEffect(() => {
        const savedExpenses = JSON.parse(localStorage.getItem("expenses"));

        if (savedExpenses) {
            setExpenses(savedExpenses);
        }
    }, []);

    // Save data to localStorage
    useEffect(() => {
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }, [expenses]);

    // Add Expense
    const addExpense = (e) => {
        e.preventDefault();

        if (!title || !amount) {
            alert("Please fill all fields");
            return;
        }

        const newExpense = {
            id: Date.now(),
            title,
            amount: Number(amount),
            category,
        };

        setExpenses([...expenses, newExpense]);

        setTitle("");
        setAmount("");
        setCategory("Food");
    };

    // Delete Expense
    const deleteExpense = (id) => {
        const filteredExpenses = expenses.filter(
            (expense) => expense.id !== id,
        );

        setExpenses(filteredExpenses);
    };

    // Total Amount
    const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);

    return (
        <div className="min-h-screen bg-amber-500 p-5">
            <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6">
                {/* Heading */}
                <h1 className="text-3xl font-bold text-center mb-6">
                    Expense Tracker
                </h1>

                {/* Total Balance */}
                <div className="bg-blue-500 text-white p-5 rounded-lg text-center mb-6">
                    <h2 className="text-xl font-semibold">Total Expense</h2>
                    <p className="text-3xl font-bold mt-2">₹ {total}</p>
                </div>

                {/* Form */}
                <form onSubmit={addExpense} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Enter title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border p-3 rounded-lg outline-none"
                    />

                    <input
                        type="number"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full border p-3 rounded-lg outline-none"
                    />

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border p-3 rounded-lg outline-none"
                    >
                        <option>Food</option>
                        <option>Travel</option>
                        <option>Shopping</option>
                        <option>Bills</option>
                        <option>Other</option>
                    </select>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg font-semibold"
                    >
                        Add Expense
                    </button>
                </form>

                {/* Expense List */}
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Expenses</h2>

                    {expenses.length === 0 ? (
                        <p className="text-gray-500">No expenses added</p>
                    ) : (
                        <div className="space-y-3">
                            {expenses.map((expense) => (
                                <div
                                    key={expense.id}
                                    className="flex items-center justify-between bg-gray-100 p-4 rounded-lg"
                                >
                                    <div>
                                        <h3 className="font-semibold text-lg">
                                            {expense.title}
                                        </h3>

                                        <p className="text-sm text-gray-500">
                                            {expense.category}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <p className="font-bold text-lg">
                                            ₹ {expense.amount}
                                        </p>

                                        <button
                                            onClick={() =>
                                                deleteExpense(expense.id)
                                            }
                                            className="text-red-500 hover:text-red-700"
                                        ></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
