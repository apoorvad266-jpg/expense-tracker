import { useState, useEffect } from "react";
import "./App.css";

import Login from "./Login";
import Signup from "./Signup";

import { Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";


ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);



function App() {


const [login, setLogin] = useState(
  localStorage.getItem("login") === "true"
);


const [showSignup, setShowSignup] = useState(false);



const [darkMode,setDarkMode] = useState(false);



const [income,setIncome] = useState("");



const [expenseName,setExpenseName] = useState("");

const [expenseAmount,setExpenseAmount] = useState("");

const [category,setCategory] = useState("Food");

const [date,setDate] = useState("");



const [search,setSearch] = useState("");



const [transactions,setTransactions] = useState(()=>{

const saved = localStorage.getItem("transactions");

return saved ? JSON.parse(saved) : [];

});



useEffect(()=>{

localStorage.setItem(
"transactions",
JSON.stringify(transactions)
);

},[transactions]);



if(!login){

return showSignup ? (

<Signup
goToLogin={()=>setShowSignup(false)}
/>

)

:

(

<Login

setLogin={setLogin}

goToSignup={()=>setShowSignup(true)}

/>

);

}
// ADD INCOME

const addIncome = () => {


if(!income){

alert("Enter income");

return;

}



const newIncome = {

id: Date.now(),

type:"Income",

name:"Income Added",

amount:Number(income),

category:"Income",

date:new Date().toLocaleDateString()

};



setTransactions([

...transactions,

newIncome

]);



setIncome("");

};






// ADD EXPENSE


const addExpense = () => {



if(!expenseName || !expenseAmount){

alert("Fill expense details");

return;

}




const newExpense = {


id:Date.now(),

type:"Expense",

name:expenseName,

amount:Number(expenseAmount),

category:category,

date:date


};





setTransactions([

...transactions,

newExpense

]);



setExpenseName("");

setExpenseAmount("");

setDate("");


};







// DELETE TRANSACTION


const deleteTransaction = (id)=>{


const updatedTransactions = transactions.filter(

(item)=>item.id !== id

);



setTransactions(updatedTransactions);


};







// TOTAL INCOME


const totalIncome = transactions

.filter(

item=>item.type==="Income"

)

.reduce(

(sum,item)=>sum+item.amount,

0

);







// TOTAL EXPENSE


const totalExpense = transactions

.filter(

item=>item.type==="Expense"

)

.reduce(

(sum,item)=>sum+item.amount,

0

);







// BALANCE


const balance = totalIncome - totalExpense;







// SEARCH


const filteredTransactions = transactions.filter((item)=>{


return (

item.name

.toLowerCase()

.includes(search.toLowerCase())

||

item.category

.toLowerCase()

.includes(search.toLowerCase())

);


});
// PIE CHART DATA


const chartData = {


labels:[

"Income",

"Expense"

],



datasets:[

{

data:[

totalIncome,

totalExpense

],


backgroundColor: [
  "#2563EB",
  "#DC2626"
],
borderColor: [
  "#FFFFFF",
  "#FFFFFF"
],
borderWidth: 3,


borderWidth:1


}

]


};



return (

<div className={darkMode ? "app dark" : "app"}>



<div className="header">


<h1>
💰 Expense Tracker
</h1>



<div className="header-buttons">


<button onClick={()=>setDarkMode(!darkMode)}>

{

darkMode

?

"☀️ Light"

:

"🌙 Dark"

}

</button>





<button

onClick={()=>{

localStorage.removeItem("login");

setLogin(false);

}}

>

Logout

</button>


</div>


</div>






<div className="cards">



<div className="card">

<h3>
Total Income
</h3>


<p>
₹ {totalIncome}
</p>


</div>






<div className="card">

<h3>
Total Expense
</h3>


<p>
₹ {totalExpense}
</p>


</div>







<div className="card">

<h3>
Balance
</h3>


<p>
₹ {balance}
</p>


</div>


</div>







<div className="box">


<h2>
Add Income
</h2>




<div className="income-row">


<input

type="number"

placeholder="Enter Income"

value={income}

onChange={(e)=>setIncome(e.target.value)}

/>





<button onClick={addIncome}>

Add Income

</button>


</div>


</div>
<div className="box">


<h2>
Add Expense
</h2>




<div className="expense-form-row">


<input

type="text"

placeholder="Expense Name"

value={expenseName}

onChange={(e)=>setExpenseName(e.target.value)}

/>






<input

type="number"

placeholder="Amount"

value={expenseAmount}

onChange={(e)=>setExpenseAmount(e.target.value)}

/>







<select

value={category}

onChange={(e)=>setCategory(e.target.value)}

>


<option>
Food
</option>


<option>
Travel
</option>


<option>
Shopping
</option>


<option>
Other
</option>


</select>







<input

type="date"

value={date}

onChange={(e)=>setDate(e.target.value)}

/>



</div>






<button onClick={addExpense}>

Add Expense

</button>



</div>









<div className="chart-section">


<h2>
Income / Expense Chart
</h2>




<div className="pie-container">


<Pie

data={chartData}

options={{

responsive:true,

maintainAspectRatio:false,

plugins:{

legend:{

position:"bottom"

}

}

}}

/>



</div>


</div>
/* TRANSACTION HISTORY */


<div className="transaction-section">


<h2>
Transaction History
</h2>





<input

className="search-box"

type="text"

placeholder="🔍 Search Transaction"

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>







<div className="transaction-list">



{

filteredTransactions.length === 0 ? (

<p>
No Transaction Found
</p>

)

:

(

filteredTransactions.map((item)=>(


<div

className="transaction-item"

key={item.id}

>



<div>


<h3>

{item.name}

</h3>




<p>

{item.category} | {item.date}

</p>


</div>







<div className="transaction-right">



<span

className={

item.type === "Income"

?

"income-text"

:

"expense-text"

}

>



{

item.type === "Income"

?

"+"

:

"-"

}


₹ {item.amount}


</span>








<button

className="delete-btn"

onClick={()=>deleteTransaction(item.id)}

>


🗑 Delete


</button>




</div>




</div>


))


)

}



</div>



</div>






</div>

);

}


export default App;