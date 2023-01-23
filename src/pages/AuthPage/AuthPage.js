import {useState} from "react"

import SignUpForm from "../../components/SignUpForm/SignUpForm"
import LoginForm from "../../components/LoginForm/LoginForm"
import "./AuthPage.css"

export default function AuthPage(props) {
  const [status, setStatus] = useState("login")

  function handleClick(event){
    if (event.target.name == "login" ){
      setStatus("login")
    } else if (event.target.name == "register" ){
      setStatus("register")
    }
  }

    return (
      <div className="AuthPage">
        <div className="auth-form">
          {/* form side */}
          {status=="login"? 
          (
            <>
              <LoginForm setUser = {props.setUser} />     
              <button className="btn" name="register" onClick={handleClick}>register</button>
            </>
          )
          : 
          (
            <>
              <SignUpForm setUser = {props.setUser}/>
              <button className="btn" name="login" onClick={handleClick}>login with my account</button>
            </>
          )}
          
          
        </div>
        <div className="app-logo">
          {/* logo side */}
          <h1>Δ</h1>
          <h1>DELTA</h1>
          <p>The letter Delta is often used to represent change, change of direction, or change of state, and in this case, it could represent the change of state of one's money, from having less to having more, or from being in debt to being financially stable. Additionally, Delta also represents difference and in this case, it could represent the difference in one's financial situation before and after using the app or financial service.</p>
          <p>-ChatGPT</p>
        </div>
      </div>
    );
  }