import { useState, useEffect } from "react";

import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import "./AuthPage.css";

const ROOT_URL = "https://api.coinstats.app/public/v1/coins?skip=0&limit=3";

export default function AuthPage(props) {
  const [status, setStatus] = useState("login");
  const [coinStats, setCoinStats] = useState([]);

  function handleClick(event) {
    if (event.target.name == "login") {
      setStatus("login");
    } else if (event.target.name == "register") {
      setStatus("register");
    }
  }

  useEffect(() => {
    async function getCoins() {
      let coins = await fetch(ROOT_URL).then((res) => res.json());
      setCoinStats(coins.coins);
    }
    getCoins();
  }, []);
  let coinList;
  if (coinStats.length > 0) {
    coinList = coinStats.map((coin,key) => (
      <div key={key}>
        <a href={coin.websiteUrl}>
          <img src={coin.icon} />
        </a>
        <p>{coin.rank}</p>
        <p>${coin.price.toFixed(2)}</p>
      </div>
    ));
  }

  return (
    <div className="AuthPage">
      <div className="auth-form">
        {/* form side */}
        {status == "login" ? (
          <>
            <LoginForm setUser={props.setUser} />
            <button className="btn long-btn" name="register" onClick={handleClick}>
              REGISTER
            </button>
          </>
        ) : (
          <>
            <SignUpForm setUser={props.setUser} />
            <button className="btn long-btn" name="login" onClick={handleClick}>
              LOGIN
            </button>
          </>
        )}
      </div>
      <div className="app-logo">
        {/* logo side */}
        <h1>Δ</h1>
        <h2>DELTA</h2>
        <p>
          "The letter Delta is often used to represent change, change of
          direction, or change of state, and in this case, it could represent
          the change of state of one's money, from having less to having more,
          or from being in debt to being financially stable. Additionally, Delta
          also represents difference and in this case, it could represent the
          difference in one's financial situation before and after using the app
          or financial service."
        </p>
        <p>-ChatGPT</p>
        <h4>Cryptocurrency Ranking</h4>
        <div className="horizontal-list">{coinList}</div>
      </div>
    </div>
  );
}
