import { useState, useEffect, use } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { signout } from "../../features/auth/authSlice";
import { sleep } from "../../helpers";
import ToastBox from "../utility/toastBox/ToastBox";

const Signout = () => {
  const role = useSelector(state => state.authReducer.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState("");
  const [toastHeading, setToastHeading] = useState("");
  const [toastSuccess, setToastSuccess] = useState(true);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (role === "") {
      navigate("/");
    } else {
      axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/sign-out`, {}, { withCredentials: true })
      .then(async (res) => {
        dispatch(signout());
        setToastMessage(res.data.message);
        setToastHeading("New Message");
        setToastSuccess(res.data.success);
        setShowToast(true);
        setShowToast(await sleep(3000, false));
        navigate("/");
      })
      .catch(error => console.log(error));
    }
  }, []);

  return (
    <div>
      {showToast && <ToastBox
        heading={toastHeading}
        message={toastMessage}
        success={toastSuccess}
        setShowToast={setShowToast}
      />}
    </div>
  );
};

export default Signout;