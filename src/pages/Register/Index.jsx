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
import { useRef } from "react";

const Register = () => {
  // const { showToast, toggleToast } = useToast();
  const navigate = useNavigate();
  // const { isLoading, toggleSpinner } = useSpinner();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const inputsRef = useRef([]);
  // const [errMsg, setErrMsg] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
    // const formValues = Object.fromEntries(new window.FormData(e.target))
    inputsRef.current = Array.from(document.querySelectorAll(".register__input"));
    
    try{
      const url = `${BASE_URL}/user`;

      let userValues = {
        name: "",
        city: "",
        email: "",
        phone: "",
        username: "",
        password: ""
      };

      for (const input of inputsRef.current){
        userValues = {
          ...userValues,
          [input["id"]]: input["value"]
        };
      }
      // console.log(userValues);
      const response = await axios.post(url, userValues);
      if (response.status === 201) {
        navigate("/");
      }
      console.log(response);
      if (!response.data) console.error("error");
    }catch (err) {
      console.error(err);
    }
    
  }
  
  // const validationSchema = {
  //   name: {
  //     required: "Name is required",
  //   },
  //   phoneNumber: {
  //     required: "Phone number is required",
  //   },
  //   city: {
  //     required: "city is required",
  //   },
  //   email: {
  //     required: "Email is required",
  //   },
  //   username: {
  //     required: "Username is required",
  //   },
  //   password: {
  //     required: "Password is required",
  //     minLength: { value: 4, message: "Min 4 characters" },
  //     maxLength: { value: 16, message: "Max 16 characters" },
  //   },
  // };

  return (
    <div className = "register__main-container">
      
      <form className = "register__form-container" action="submit" onSubmit={handleSubmit}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="120"
            height="117"
            viewBox="0 0 120 117"
            fill="none"
          >
            <path
              d="M60 0C26.8548 0 0 26.0156 0 58.125C0 90.2344 26.8548 116.25 60 116.25C93.1452 116.25 120 90.2344 120 58.125C120 26.0156 93.1452 0 60 0ZM60 22.5C71.7581 22.5 81.2903 31.7344 81.2903 43.125C81.2903 54.5156 71.7581 63.75 60 63.75C48.2419 63.75 38.7097 54.5156 38.7097 43.125C38.7097 31.7344 48.2419 22.5 60 22.5ZM60 103.125C45.7984 103.125 33.0726 96.8906 24.5565 87.1406C29.1048 78.8438 38.0081 73.125 48.3871 73.125C48.9677 73.125 49.5484 73.2188 50.1048 73.3828C53.25 74.3672 56.5403 75 60 75C63.4597 75 66.7742 74.3672 69.8952 73.3828C70.4516 73.2188 71.0323 73.125 71.6129 73.125C81.9919 73.125 90.8952 78.8438 95.4435 87.1406C86.9274 96.8906 74.2016 103.125 60 103.125Z"
              fill="#9D9D9D"
            />
          </svg>
            <div className="input-label">
              <label htmlFor="name">Nombre</label>
              <input
                id="name"
                className="register__input"
                type="text"
               
              />
            </div>
            <div className="input-label">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                className="register__input"
                type="email"
              />
            </div>
            
            <div className="input-label">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                className="register__input"
                type="text"
               
              />
            </div>
            <div className="input-label">
              <label htmlFor="city">city</label>
              <input
                id="city"
                className="register__input"
                type="text"
                
              />
            </div>
            <div className="input-label">
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                className="register__input"
                type="text"
                
              />
            </div>
            <div className="input-label">
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                className="register__input"
                type="password"
                
              />
            </div>
            
            <div>
              <button className="register__button" type="submit">Registrar</button>
            </div>
          </form>
    </div>
  );
  
};

export default Register;
