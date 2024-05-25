import { Alert, Button, Form, Input } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import {useHistory} from 'react-router-dom';

const passwordRegexp =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

const Login = () => {
  let navigate = useNavigate();
  const [apiStatus, setApiStatus] = useState("init");
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmitForm = async (loginInfo) => {
    // loginInfo = {username, password}

    setApiStatus("pending");
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: loginInfo.username,
          password: loginInfo.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.id);
        navigate("/profile");
      } else {
        setApiStatus("error");
        setErrorMessage("Invalid Credentials");
      }
    } catch (error) {
      setApiStatus("error");
      setErrorMessage("An error occurred. Please try again.");
      setError("An error occurred. Please try again.");
    }
  };
  return (
    <div className="form">
      <h1>Login Form</h1>
      {apiStatus === "success" && (
        <Alert
          type="success"
          showIcon
          message="Logged in successfully.."
          closable
        />
      )}
      {apiStatus === "error" && (
        <Alert type="error" showIcon message={errorMessage} closable />
      )}
      <Form onFinish={onSubmitForm} layout="vertical">
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please enter username" }]}
        >
          <Input placeholder="Enter your username" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Password is required" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Button
          loading={apiStatus === "pending"}
          htmlType="submit"
          type="primary"
          block
        >
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
