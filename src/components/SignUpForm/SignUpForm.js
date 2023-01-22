import { useState } from "react";
import { signUp } from "../../utilities/users-service";

export default function SignUpForm({ setUser }) {
  const [registration, setRegistration] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    error: "",
  });

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const formData = { ...registration };
      delete formData.error;
      delete formData.confirm;
      const user = await signUp(formData);
      setUser(user);
    } catch {
      setRegistration({ error: "Sign Up Failed - Try Again" });
    }
  }

  function handleChange(event) {
    setRegistration({
      [event.target.name]: event.target.value,
      error: "",
    });
  }

  const disable = registration.password !== registration.confirm;

  return (
    <div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={registration.name}
            onChange={handleChange}
            required
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={registration.email}
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={registration.password}
            onChange={handleChange}
            required
          />
          <label>Confirm</label>
          <input
            type="password"
            name="confirm"
            value={registration.confirm}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={disable}>
            SIGN UP
          </button>
        </form>
      </div>
      <p className="error-message">&nbsp;{registration.error}</p>
    </div>
  );
}
