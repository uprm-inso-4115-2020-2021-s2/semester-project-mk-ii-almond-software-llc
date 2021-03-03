import React, { Component } from 'react'
import { Form, Button, Container } from "react-bootstrap";
import './signup.css';

function Signup() {
  return (
    <div>
      <Container className="signup-container">
        <h1 className="signup-h1">Sign up Here!</h1>
        <Form className="signup-form">
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="signup-email">
              Email address
            </Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label className="signup-password">
              Password
            </Form.Label>
            <Form.Control type="password" placeholder="Password" />
            <Form.Text id="passwordHelpBlock" muted>
              Your password must be 8-20 characters long, contain letters
              and numbers, and must not contain spaces, special
              characters, or emoji.
            </Form.Text>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="signup-submitbtn"
          >
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  )
}

export default Signup;
