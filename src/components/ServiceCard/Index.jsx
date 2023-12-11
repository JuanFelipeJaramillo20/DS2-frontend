import { useNavigate } from "react-router";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";

import trash from "../../assets/images/delete.png";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./style.css";

const ServiceCard = ({ service, isUser }) => {
  const history = useNavigate();

  const deleteOffer = async () => {
    if (!service) return;
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const token = localStorage.getItem("token");
    const url = `${BASE_URL}/offers/${service.id}`;
    const headers = {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    };
    try {
      const response = await axios.delete(url, { headers: headers });
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="service-card__container">
      <article>
        {isUser && (
          <img
            onClick={deleteOffer}
            className="trash-icon--card"
            src={trash}
            alt="trash icon"
          />
        )}
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView="1"
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          {Array.isArray(service?.imagenes_url) ? (
            service.imagenes_url.map((img, key) => (
              <SwiperSlide key={key}>
                <img src={img} alt="service main picture" />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <img src="/vite.png" alt="service main picture" />
            </SwiperSlide>
          )}
        </Swiper>
      </article>
      <article
        onClick={() => {
          history(`/services/${service.id}`);
        }}
      >
        <div>
          <div>
            <p>Precio:</p>
            <span>{service.precio}</span>
          </div>
          <div>
            <p>Estado:</p>
            {service.estado}
          </div>
        </div>
        <div>
          <p>Descripción:</p>
          <span>{service.descripcion}</span>
        </div>
      </article>
    </section>
  );
};

export default ServiceCard;
