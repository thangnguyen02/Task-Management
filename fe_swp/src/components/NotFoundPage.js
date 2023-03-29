import React from "react";
import Button from "@mui/material/Button";

function NotFoundPage() {
  return (
    <div>
      <div>
        <img src='https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=630' />
        <span style={{ marginRight: "20px", fontSize: "30px" }}>
          You should login to continue
        </span>

        <Button size='medium' outlined sx={{ backgroundColor: "wheat" }}>
          <a href='/Login'>Login</a>
        </Button>
      </div>
    </div>
  );
}

export default NotFoundPage;
