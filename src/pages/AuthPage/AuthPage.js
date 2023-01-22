import SignUpForm from "../../components/SignUpForm/SignUpForm"
import LoginForm from "../../components/LoginForm/LoginForm"
import "./AuthPage.css"

export default function AuthPage(props) {

    return (
      <div className="AuthPage">
        <div className="auth-form">
          {/* form side */}
          <SignUpForm setUser = {props.setUser}/>
          <LoginForm setUser = {props.setUser} />
        </div>
        <div className="app-logo">
          {/* logo side */}
          <h1>Δ</h1>
          <h1>DELTA</h1>
        </div>
      </div>
    );
  }