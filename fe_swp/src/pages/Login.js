import React, { useState } from "react";
import "../styles/Login.css";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import authAxios from "../services/AxiosInstance";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    console.log({
      email,
      password,
    });
    authAxios
      .post(`/User/Login`, {
        Username: email,
        Password: password,
      })
      .then(function (response) {
        console.log(response.data.data.token);
        localStorage.setItem("token", response.data.data.token);
        console.log(response.data.data);
        localStorage.setItem("id", response.data.data.usernameID);
        navigate("../home");
        setTimeout(() => {
          window.location.reload();
        }, 0);
      })
      .catch(function (error) {
        setMessage("Login Failed, Please check your account!!!");
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
          to={"../register"}
          style={{
            padding: "1vh 2vw",
            textDecoration: "none",
            color: "rgb(0 170 255)",
          }}
        >
          Register
        </Link>
      </div>
      <div className="login">
        <form onSubmit={handleLogin}>
          <div>
            <h1 style={{ margin: "0 0" }}>Log in</h1>
            <Button
              className="btn-loginGoogle "
              style={{ marginBottom: "20px", color: "white" }}
            >
              <FcGoogle size="30px" style={{ marginRight: "15px" }}></FcGoogle>{" "}
              <h5
                style={{
                  color: "rgb(0 170 255)",
                  margin: " 0 0",
                }}
              >
                Log in with google
              </h5>
            </Button>
            <div>
              {" "}
              <a
                href="#"
                style={{
                  margin: "20px 0",
                  color: "gray",
                }}
              >
                More services
              </a>
            </div>
            <div style={{ padding: "3vh 0", color: "gray" }}>
              <h3> or with your Task account</h3>
            </div>
          </div>
          <div className="login_input">
            <TextField
              fullWidth
              type="email"
              label="Email"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <br></br>
          <div className="login_input">
            <TextField
              fullWidth
              type="password"
              label="Password"
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <h3 style={{ color: "red" }}>{message != null && message}</h3>
          <Button
            className="btn-login"
            type="submit"
            fullWidth
            style={{ marginBottom: "20px", color: "white" }}
          >
            Login
          </Button>
          <a
            href="#"
            style={{
              textDecoration: "none",
              margin: "20px 0",
              color: "rgb(0 170 255)",
            }}
          >
            I forgot my password
          </a>
        </form>
      </div>
    </div>
  );
}

export default Login;
