import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import ComponentHeader from "../utility/componentHeader/ComponentHeader";
import ToastBox from "../utility/toastBox/ToastBox";
import {
  storeProfilePicture,
  storeFirstName,
  storeLastName,
  storeEmail,
  storeRole
} from "../../features/auth/authSlice";
import { sleep } from "../../helpers";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastHeading, setToastHeading] = useState("");
  const [toastSuccess, setToastSuccess] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    } else {
      setPasswordError("");
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      return;
    } else {
      setConfirmPasswordError("");
    }

    const newUser = {
      firstName,
      lastName,
      email,
      password,
    };

    axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/sign-up`, newUser, { withCredentials: true })
    .then(async (res) => {
      dispatch(storeProfilePicture(res.data.profilePicture));
      dispatch(storeFirstName(res.data.firstName));
      dispatch(storeLastName(res.data.lastName));
      dispatch(storeEmail(res.data.email));
      dispatch(storeRole(res.data.role));
      setToastMessage(res.data.message);
      setToastHeading("New Message");
      setToastSuccess(res.data.success);
      setShowToast(true);
      setShowToast(await sleep(3000, false));
      navigate("/");
    })
    .catch(async (error) => {
      console.log(error.response);
      if (error.response.data.type === "email-error") {
        setToastMessage(error.response.data.message);
        setToastHeading("New Message");
        setToastSuccess(error.response.data.success);
      } else {
        setToastMessage("Sorry! Something went wrong. Please try again.");
        setToastHeading("New Message");
        setToastSuccess(false);
      }
      setShowToast(true);
      setShowToast(await sleep(3000, false));
    });
  };

  return (
    <div className="w-max">
      <ComponentHeader heading="Sign Up" component="Sign Up"/>

      <Container className="mt-5">
        <Form onSubmit={handleSignup}>
          <Form.Group className="mb-3" controlId="inputText">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              onChange={e => setFirstName(e.target.value)}
              value={firstName}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="inputText">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              onChange={e => setLastName(e.target.value)}
              value={lastName}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="inputEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              onChange={e => setEmail(e.target.value)}
              value={email}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="inputPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={e => setPassword(e.target.value)}
              value={password}
              required
            />
            <p className="text-danger">{passwordError}</p>
          </Form.Group>
          <Form.Group className="mb-3" controlId="inputPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              onChange={e => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              required
            />
            <p className="text-danger">{confirmPasswordError}</p>
          </Form.Group>
          <Button variant="primary" type="submit">
            Sign Up
          </Button>
        </Form>
        <h5 className="mt-3">Do not have an account? <Link to="/sign-in">Sign In</Link> now.</h5>
      </Container>
      {showToast && <ToastBox
        heading={toastHeading}
        message={toastMessage}
        success={toastSuccess}
        setShowToast={setShowToast}
      />}
    </div>
  );
};

export default Signup;