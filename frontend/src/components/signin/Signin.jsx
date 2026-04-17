import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import {
  storeProfilePicture,
  storeFirstName,
  storeLastName,
  storeEmail,
  storeRole
} from "../../features/auth/authSlice";
import { sleep } from "../../helpers";
import ComponentHeader from "../utility/componentHeader/ComponentHeader";
import ToastBox from "../utility/toastBox/ToastBox";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastHeading, setToastHeading] = useState("");
  const [toastSuccess, setToastSuccess] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/sign-in`, {
      email,
      password,
    }, {
      withCredentials: true,
    }).then(async (res) => {
      dispatch(storeProfilePicture(res.data.prifilePicture));
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
    }).catch(async (error) => {
      if (error?.response?.data?.type === "credentials-error") {
        setErrorMessage(error?.response?.data?.message);
      } else {
        console.log(error);
        setToastMessage("Sorry! Something went wrong. Please try again.");
        setToastHeading("New Message");
        setToastSuccess(false);
        setShowToast(true);
        setShowToast(await sleep(3000, false));
      }
    });
  };

  return (
    <div>
      <ComponentHeader heading="Sign In" component="Sign In"/>

      <Container className="mt-5">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formPlaintextEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              onChange={e => setEmail(e.target.value)}
              value={email}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPlaintextPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={e => setPassword(e.target.value)}
              value={password}
              required
            />
          </Form.Group>
          <p className="text-danger">{errorMessage}</p>
          <Button variant="primary" type="submit">
            Sign In
          </Button>
        </Form>
        <h5 className="mt-3">Do not have an account? <Link to="/sign-up">Sign Up</Link> now.</h5>
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

export default Signin;