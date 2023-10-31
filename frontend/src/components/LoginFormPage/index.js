import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
//import "./LoginForm.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  const handleDemo = async (e) => {
    e.preventDefault();

    const credential = "Demo-lition";
    const password = "password";

    const data = await dispatch(sessionActions.login({ credential, password }));
    if (data) {
      setErrors(data);
    }
  };

  return (
    <>
      <div className="form-container login">
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <div className="form">
            <div className="field">
              <label>Username or Email</label>
              <input
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {errors.credential && <p>{errors.credential}</p>}
            </div>
            <button type="submit" className="submit-button">
              Log In
            </button>
            <hr></hr>
          <div>
            <p>
              Want to create an account?
              <NavLink to={"/signup"}>
                <button type="button" className="demo-button">
                  Login
                </button>
              </NavLink>
            </p>
            <p>
              Not ready to commit?
              <button
                type="button"
                className="demo-button"
                onClick={handleDemo}
              >
                Demo
              </button>
            </p>
          </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginFormPage;
