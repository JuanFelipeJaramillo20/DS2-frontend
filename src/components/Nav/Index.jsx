import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./style.css";

const Nav = () => {
  localStorage.setItem("userId", "1");
  localStorage.setItem(
    "token",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDIyMzEyNjEsInVzZXJfaWQiOjF9.AjKmKEWal7kghbtQzKnQds8BRNyxzNy9AibEQYvPqJw"
  );
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  useEffect(() => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const url = `${BASE_URL}/user/${userId}`;
    const headers = {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    };
    const fetchUserInformation = async () => {
      try {
        const response = await axios.get(url, { headers: headers });
        if (response.data) {
          sessionStorage.setItem("userName", response.data.Name);
          sessionStorage.setItem("userPhone", response.data.Phone);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserInformation();
  }, [token, userId]);
  return (
    <nav className="nav-bar__container">
      <section>
        <button>
          <Link to="/dashboard">
            <img src={"/vite.png"} alt="logo app" />
          </Link>
        </button>
      </section>
      <section>
        <button>
          <Link to="/dashboard">Home</Link>
        </button>
      </section>
      <section>
        <button>
          <Link to="/products">Products</Link>
        </button>
      </section>
      <section>
        <button>
          <Link to="/about">About</Link>
        </button>
      </section>
      <section>
        <button>
          <Link to="/profile">
            <img src={"/images/no-user-img.png"} alt="user profile picture" />
          </Link>
        </button>
      </section>
    </nav>
  );
};

export default Nav;
