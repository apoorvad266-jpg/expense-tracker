import { useState } from "react";
import "./Signup.css";


function Signup({ goToLogin }) {


  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");



  const handleSignup = (e) => {

    e.preventDefault();



    const user = {

      name,

      email,

      password

    };



    localStorage.setItem(

      "user",

      JSON.stringify(user)

    );



    alert("Account Created Successfully!");



    goToLogin();


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

          Start managing your money 💜

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