import { useState } from "react";
import "./Login.css";


function Login({ setLogin, goToSignup }) {


  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");



  const loginUser = () => {


    const user = JSON.parse(
      localStorage.getItem("user")
    );


    if (
      user &&
      user.email === email &&
      user.password === password
    ) {


      localStorage.setItem(
        "login",
        "true"
      );


      setLogin(true);


    } 
    else {


      alert("Invalid Email or Password");


    }


  };



  return (

    <div className="login-container">


      <div className="login-box">


        <div className="logo">
          💰
        </div>


        <h2>
          Expense Tracker
        </h2>


        <input

          type="email"

          placeholder="Enter Email"

          value={email}

          onChange={(e)=>setEmail(e.target.value)}

        />



        <input

          type="password"

          placeholder="Enter Password"

          value={password}

          onChange={(e)=>setPassword(e.target.value)}

        />



        <button onClick={loginUser}>

          Login

        </button>



        <p>
          Don't have an account?
        </p>



        <span

          className="link"

          onClick={goToSignup}

        >

          Sign Up

        </span>



      </div>


    </div>

  );

}


export default Login;