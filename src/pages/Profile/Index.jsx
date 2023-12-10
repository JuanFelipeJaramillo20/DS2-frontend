import { useState, useRef } from "react";
import axios from "axios";

import useGetUser from "../../hooks/useGetUser";
import useGetUserOffer from "../../hooks/useGetUserOffers";

import ServiceCard from "../../components/serviceCard/Index";
import LoadPictures from "../../components/LoadPictures/Index";

import "./style.css";

const Profile = () => {
  const userID = localStorage.getItem("user_id");
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");
  const { user, setUpdateUserFetch } = useGetUser(userID, token);
  const { allOffers } = useGetUserOffer(userID, token, BASE_URL);

  const inputsRef = useRef([]);

  const [files, setFiles] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formValues = Object.fromEntries(new window.FormData(e.target));
    inputsRef.current = Array.from(document.querySelectorAll(".form-input"));

    let bodyToSubmit = { ...user };
    try {
      const url = `${BASE_URL}/user/${userID}`;
      const headers = {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      };
      const formDataImgs = new FormData();
      formDataImgs.append("file", files[0]);
      formDataImgs.append("upload_preset", "pmickcjc");
      formDataImgs.append("api_key", "711663863577999");
      let newImg = "";
      if (files.length > 0) {
        try {
          const response = await axios.post(
            "https://api.cloudinary.com/v1_1/dtgou3hjo/image/upload",
            formDataImgs
          );
          newImg = response.data.secure_url;
        } catch (err) {
          console.error(err);
        }
      }
      const userValues = {
        Name: user.name,
        City: user.city,
        Email: user.email,
        Phone: user.phone,
        Username: user.username,
      };
      for (const input of inputsRef.current) {
        if (input["id"] === "Password" && !input["value"]) continue;
        bodyToSubmit = {
          ...bodyToSubmit,
          [input["id"]]: input["value"]
            ? input["value"]
            : userValues[`${input["id"]}`],
        };
      }
      if (newImg) {
        bodyToSubmit.ImageURL = newImg ? newImg : user.image;
      }
      const response = await axios.put(url, bodyToSubmit, {
        headers: headers,
      });
      if (!response.data) console.error("paila");
      for (const input of inputsRef.current) {
        input.value = "";
      }
      setFiles([]);
      setUpdateUserFetch((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="profile-section__container">
      <header>
        <div>
          <img
            src={user.image ? user.image : "/images/no-user-img.png"}
            alt="user picture"
          />
        </div>
        <div>
          <h2>
            Bienvenid@ otra vez <b>{user.name && user.name}</b>!
          </h2>
        </div>
      </header>
      <br />
      <div>
        <article>
          <h3>Editar Información personal</h3>
          <form action="submit" onSubmit={handleSubmit}>
            <div className="input-label">
              <label htmlFor="Email">Email:</label>
              <input
                id="Email"
                className="form-input"
                type="text"
                placeholder={user.email ?? "Nuevo email"}
              />
            </div>
            <div className="input-label">
              <label htmlFor="Name">Nombre:</label>
              <input
                id="Name"
                className="form-input"
                type="text"
                placeholder={user.name ?? "Nuevo nombre"}
              />
            </div>
            <div className="input-label">
              <label htmlFor="City">Email:</label>
              <input
                id="City"
                className="form-input"
                type="text"
                placeholder={user.city ?? "Nuevo ciudad"}
              />
            </div>
            <div className="input-label">
              <label htmlFor="Phone">Teléfono:</label>
              <input
                id="Phone"
                className="form-input"
                type="number"
                placeholder={user.phone ?? "Nuevo teléfono"}
              />
            </div>
            <div className="input-label">
              <label htmlFor="Password">Contraseña:</label>
              <input
                id="Password"
                className="form-input"
                type="text"
                placeholder={"Nueva clave"}
              />
            </div>
            <div className="form-pics">
              <LoadPictures
                setFiles={(filesSelected) => setFiles(filesSelected)}
              />
            </div>
            <div className="button-form">
              <button type="submit">Actualizar</button>
            </div>
          </form>
        </article>
        <article>
          <h3>Tus ofertas</h3>
          <div className="offers-user">
            {allOffers &&
              allOffers.map((offer) => (
                <ServiceCard key={offer.id_ofertante} isUser service={offer} />
              ))}
          </div>
        </article>
      </div>
    </section>
  );
};

export default Profile;
