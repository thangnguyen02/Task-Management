import React, { useState } from "react";
import "../styles/Register.css";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import authAxios from "../services/AxiosInstance";

function Register() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const handleRegister = (e) => {
    e.preventDefault();
    console.log({
      email,
      password,
      confirmPassword,
    });
    if (password.localeCompare(confirmPassword) != 0) {
      setMessage("Confirm password must match password");
    } else {
      setMessage("");
    }
    authAxios
      .post(`/User/Register`, {
        userName: email,
        password: password,
      })
      .then(function (response) {
        if (response.data.message == "Bad requestuser name already exists") {
          alert("Email exist");
        } else {
          alert("Register successful");
          navigate("../login");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <h1 style={{ padding: "1vh 2vw" }} s>
          Stock Task
        </h1>
        <Link
          to={"../login"}
          style={{
            padding: "1vh 2vw",
            textDecoration: "none",
            color: "rgb(0 170 255)",
          }}
        >
          Login
        </Link>
      </div>
      <div className="Register">
        <form onSubmit={handleRegister}>
          <h2>Register</h2>
          <br></br>
          <div className="Register_input">
            <TextField
              fullWidth
              type="email"
              label="Email"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <br></br>
          <div className="Register_input">
            <TextField
              fullWidth
              type="password"
              label="Password"
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <br></br>
          <div className="Register_input">
            <TextField
              fullWidth
              type="password"
              label="Confirm Password"
              variant="outlined"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <br></br>
          <h3 style={{ color: "red" }}>{message}</h3>
          <Button
            className="btn-Register"
            type="submit"
            fullWidth
            style={{ marginBottom: "20px", color: "white" }}
          >
            Register
          </Button>
          <a
            href="Login"
            style={{
              textDecoration: "none",
              margin: "20px 0",
              color: "rgb(0 170 255)",
            }}
          >
            You have account ? go to Login
          </a>
        </form>
      </div>
    </div>
  );
}

export default Register;
