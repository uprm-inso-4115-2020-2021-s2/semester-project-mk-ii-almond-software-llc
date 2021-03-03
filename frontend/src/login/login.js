import React, { Component } from 'react';
import { Form, Button, Container } from "react-bootstrap";
import "./login.css";

function Login() {
  return (
    <div>
      <Container className="login-container">
        <h1 className="login-h1">Login Here!</h1>
        <Form className="login-form">
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="login-email">Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label className="login-password">
              Password
            </Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="login-submitbtn"
          >
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  )
}

export default Login