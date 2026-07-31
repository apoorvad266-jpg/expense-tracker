import { useState } from "react";
import "./Signup.css";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";


function Signup({ goToLogin }) {


  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");



  const handleSignup = async (e) => {

    e.preventDefault();


    try {


      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );


      alert("Account Created Successfully!");


      goToLogin();


    } 
    catch(error) {


      alert(error.message);


    }


  };




  return (


    <div className="signup-container">


      <div className="signup-box">



        <div className="logo">

          💰

        </div>



        <h2>

          Create Account

        </h2>



        <p className="tagline">

          Start managing your money 

        </p>




        <form onSubmit={handleSignup}>


          <input

            type="text"

            placeholder="Enter Name"

            value={name}

            onChange={(e)=>setName(e.target.value)}

            required

          />




          <input

            type="email"

            placeholder="Enter Email"

            value={email}

            onChange={(e)=>setEmail(e.target.value)}

            required

          />





          <input

            type="password"

            placeholder="Enter Password"

            value={password}

            onChange={(e)=>setPassword(e.target.value)}

            required

          />





          <button type="submit">

            Sign Up

          </button>



        </form>





        <p className="signup-text">

          Already have an account?

        </p>




        <span

          className="link"

          onClick={goToLogin}

        >

          Login

        </span>




      </div>


    </div>


  );

}



export default Signup;