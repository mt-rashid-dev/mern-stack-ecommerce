import defaultProfilePicture from "../../assets/default-profile-picture.png";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import {
  storeProfilePicture,
  storeFirstName,
  storeLastName,
  storeEmail
} from "../../features/auth/authSlice";
import ToastBox from "../utility/toastBox/ToastBox";
import { sleep } from "../../helpers";
import ComponentHeader from "../utility/componentHeader/ComponentHeader";

const MyProfile = () => {
  const profilePicture = useSelector(state => state.authReducer.profilePicture);
  const firstName = useSelector(state => state.authReducer.firstName);
  const lastName = useSelector(state => state.authReducer.lastName);
  const email = useSelector(state => state.authReducer.email);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [picturePreview, setPicturePreview] = useState("");
  const [editedFirstName, setEditedFirstName] = useState(useSelector(state => state.authReducer.firstName));
  const [editedLastName, setEditedLastName] = useState(useSelector(state => state.authReducer.lastName));
  const [editedEmail, setEditedEmail] = useState(useSelector(state => state.authReducer.email));
  const [toastMessage, setToastMessage] = useState("");
  const [toastHeading, setToastHeading] = useState("");
  const [toastSuccess, setToastSuccess] = useState(true);
  const [showToast, setShowToast] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedPicture(null);
    setPicturePreview("");
    setEditedFirstName(firstName);
    setEditedLastName(lastName);
    setEditedEmail(email);
    setShowModal(false);
  };

  const changePicture = (e) => {
    if (e.target.files.length > 0) {
      setSelectedPicture(e.target.files[0]);
      setPicturePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("selectedPicture", selectedPicture);
    formData.append("editedFirstName", editedFirstName);
    formData.append("editedLastName", editedLastName);
    formData.append("editedEmail", editedEmail);
    axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/auth/edit-profile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      withCredentials: true
    })
    .then(async (res) => {
      dispatch(storeProfilePicture(res.data.user.profilePicture));
      dispatch(storeFirstName(res.data.user.firstName))
      dispatch(storeLastName(res.data.user.lastName));
      dispatch(storeEmail(res.data.user.email));
      setShowModal(false);
      setPicturePreview("");
      setEditedFirstName(res.data.user.firstName);
      setEditedLastName(res.data.user.lastName);
      setEditedEmail(res.data.user.email);
      setToastMessage(res.data.message);
      setToastHeading("New Message");
      setToastSuccess(res.data.success);
      setShowToast(true);
      setShowToast(await sleep(3000, false));
    })
    .catch(async (error) => {
      setToastMessage(error?.response?.data?.message);
      setToastHeading("New Message");
      setToastSuccess(error?.response?.data?.success);
      setShowToast(true);
      setShowToast(await sleep(3000, false));
    });
  };

  const profilePictureStyle = {
    width: "250px",
    height: "250px",
    borderRadius: "50%"
  };

  return (
    <div>
      <ComponentHeader heading="My Profile" component="My-Profile"/>
      
      <Container className="px-3">
        <div className="text-center py-5">
          {!profilePicture && <img src={defaultProfilePicture} alt="" style={profilePictureStyle}/>}
          {profilePicture && <img src={import.meta.env.VITE_API_BASE_URL+"/"+profilePicture} alt="" style={profilePictureStyle}/>}
        </div>
        <Row className="border border-2 border-primary fs-5 mx-3 mb-3">
          <Col xs={12} sm={4} className="bg-primary text-light py-2">First Name</Col>
          <Col xs={12} sm={8} className="py-2" data-bs-toggle="tooltip" title={firstName}>{firstName}</Col>
        </Row>
        <Row className="border border-2 border-primary fs-5 mx-3 mb-3">
          <Col xs={12} sm={4} className="bg-primary text-light py-2">Last Name</Col>
          <Col xs={12} sm={8} className="py-2" data-bs-toggle="tooltip" title={lastName}>{lastName}</Col>
        </Row>
        <Row className="border border-2 border-primary fs-5 mx-3 mb-3">
          <Col xs={12} sm={4} className="bg-primary text-light py-2">Email</Col>
          <Col xs={12} sm={8} className="py-2 text-truncate" data-bs-toggle="tooltip" title={email}>{email}</Col>
        </Row>
        <Row className="border border-2 border-primary mx-3 mb-3">
          <Col className="p-0">
            <Button variant="primary" className="d-block w-100 m-0 rounded-0 fs-5" onClick={handleShowModal}>Edit Profile</Button>
          </Col>
        </Row>
        <Row className="border border-2 border-primary mx-3 mb-3">
          <Col className="p-0">
            <Button variant="primary" className="d-block w-100 m-0 rounded-0 fs-5">Change Password</Button>
          </Col>
        </Row>
      </Container>

      {/* Edit Profile Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center py-5">
            {(!picturePreview && !profilePicture) && <img src={defaultProfilePicture} alt="" style={profilePictureStyle}/>}
            {(!picturePreview && profilePicture) && <img src={import.meta.env.VITE_API_BASE_URL+"/"+profilePicture} alt="" style={profilePictureStyle}/>}
            {picturePreview && <img src={picturePreview} alt="" style={profilePictureStyle}/>}
          </div>
          <Form encType="multipart/form-data">
            <Form.Group className="mb-3" controlId="inputFile">
              <Form.Label>Change Profile Picture</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={changePicture}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="inputText">
              <Form.Label>Edit First Name</Form.Label>
              <Form.Control
                type="text"
                value={editedFirstName}
                onChange={(e) => setEditedFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="inputText">
              <Form.Label>Edit Last Name</Form.Label>
              <Form.Control
                type="text"
                value={editedLastName}
                onChange={(e) => setEditedLastName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="inputText">
              <Form.Label>Edit Email</Form.Label>
              <Form.Control
                type="email"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {showToast && <ToastBox
        heading={toastHeading}
        message={toastMessage}
        success={toastSuccess}
        setShowToast={setShowToast}
      />}
    </div>
  );
};

export default MyProfile;