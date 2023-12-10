import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { REGEXP } from "../../config";
import { useState } from "react";
import axios from "axios";
import ToastCustom from "../../components/ToastCustom/index";
import useToast from "../../hooks/useToast";
import Spinner from "react-bootstrap/Spinner";
import useSpinner from "../../hooks/useSpinner";
import "./style.css";

const Register = () => {
  const { showToast, toggleToast } = useToast();
  const navigate = useNavigate();
  const { isLoading, toggleSpinner } = useSpinner();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [errMsg, setErrMsg] = useState("");

  const registro = async (data) => {
    try {
      const body = {
        name: data.nombre,
        phoneNumber: data.telefono,
        city: data.ciudad,
        email: data.correo,
        username: data.username,
        password: data.contraseña,
      };
      const response = await axios.post(`${BASE_URL}/register`, body);
      if (response.status === 200) {
        console.log("RESPONSE", response.data.Token);
        localStorage.setItem("token", response.data.Token);
        navigate("/dashboard");
      }
    }catch (error) {
      console.error(error);
      throw error;
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const onSubmit = async (data) => {
    try {
      toggleSpinner(true);
      await registro(data);
      toggleToast(true);
    } catch (error) {
      console.error(error);
      if (!error.response?.status) {
        setErrMsg("Server is down");
      } else if (error.response.status === 500) {
        setErrMsg("Invalid Credentials. Try again.");
      } else {
        setErrMsg(error.data?.message);
      }
      toggleSpinner(false);
      toggleToast(true);
    }
  };
  
  const validationSchema = {
    name: {
      required: "Name is required",
    },
    phoneNumber: {
      required: "Phone number is required",
    },
    city: {
      required: "city is required",
    },
    email: {
      required: "Email is required",
    },
    username: {
      required: "Username is required",
    },
    password: {
      required: "Password is required",
      minLength: { value: 4, message: "Min 4 characters" },
      maxLength: { value: 16, message: "Max 16 characters" },
    },
  };

  return (
    <div className="register__main-container">
      <ToastCustom message={errMsg} show={showToast} setShow={toggleToast} />
      {isLoading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      
      <Form className="register__form-container" onSubmit={handleSubmit(onSubmit)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          viewBox="0 0 120 117"
          fill="none"
        >
          <path
            d="M60 0C26.8548 0 0 26.0156 0 58.125C0 90.2344 26.8548 116.25 60 116.25C93.1452 116.25 120 90.2344 120 58.125C120 26.0156 93.1452 0 60 0ZM60 22.5C71.7581 22.5 81.2903 31.7344 81.2903 43.125C81.2903 54.5156 71.7581 63.75 60 63.75C48.2419 63.75 38.7097 54.5156 38.7097 43.125C38.7097 31.7344 48.2419 22.5 60 22.5ZM60 103.125C45.7984 103.125 33.0726 96.8906 24.5565 87.1406C29.1048 78.8438 38.0081 73.125 48.3871 73.125C48.9677 73.125 49.5484 73.2188 50.1048 73.3828C53.25 74.3672 56.5403 75 60 75C63.4597 75 66.7742 74.3672 69.8952 73.3828C70.4516 73.2188 71.0323 73.125 71.6129 73.125C81.9919 73.125 90.8952 78.8438 95.4435 87.1406C86.9274 96.8906 74.2016 103.125 60 103.125Z"
            fill="#9D9D9D"
          />
        </svg>

        <FloatingLabel controlId="name" label="Name" className="mb-3">
          <Form.Control
            type="text"
            placeholder="name"
            className="register__input"
            isInvalid={!!errors.name}
            {...register("name", validationSchema.name)}
          />
        </FloatingLabel>
        <Form.Control.Feedback type="invalid">
          {errors.password?.message}
        </Form.Control.Feedback>

        <FloatingLabel controlId="email" label="Email" className="mb-3">
          <Form.Control
            type="email"
            placeholder="email"
            className="register__input"
            isInvalid={!!errors.email}
            {...register("email", validationSchema.email)}
          />
        </FloatingLabel>
        
        <Form.Control.Feedback type="invalid">
          {errors.email?.message}
        </Form.Control.Feedback>

        <FloatingLabel controlId="username" label="Username" className="mb-3">
          <Form.Control
            type="text"
            placeholder="username"
            className="register__input"
            isInvalid={!!errors.username}
            {...register("username", validationSchema.username)}
          />
        </FloatingLabel>
        
        <Form.Control.Feedback type="invalid">
          {errors.email?.message}
        </Form.Control.Feedback>
        
        <FloatingLabel controlId="password" label="Password" className="mb-3">
          <Form.Control
            type="password"
            placeholder="password"
            className="register__input"
            isInvalid={!!errors.email}
            {...register("password", validationSchema.password)}
          />
        </FloatingLabel>
        <Form.Control.Feedback type="invalid">
          {errors.password?.message}
        </Form.Control.Feedback>

        
        <FloatingLabel controlId="phoneNumber" label="Phone number" className="mb-3">
          <Form.Control
            type="Phone"
            placeholder="phoneNumber"
            className="register__input"
            isInvalid={!!errors.email}
            {...register("phoneNumber", validationSchema.phoneNumber)}
          />
        </FloatingLabel>
        <Form.Control.Feedback type="invalid">
          {errors.password?.message}
        </Form.Control.Feedback>
        <FloatingLabel controlId="city" label="City" className="mb-3">
          <Form.Control
            type="text"
            placeholder="city"
            className="register__input"
            isInvalid={!!errors.email}
            {...register("city", validationSchema.city)}
          />
        </FloatingLabel>
        <Form.Control.Feedback type="invalid">
          {errors.password?.message}
        </Form.Control.Feedback>
        
        <button type="submit" className="register__button">
          Register
        </button>
      </Form>
    </div>
  );
  
};

export default Register;
