import { useNavigate } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./style.css";

const BigServiceImage = ({ services }) => {
  const history = useNavigate();

  const getServicesImg = () => {
    if (!Array.isArray(services)) return;
    const max = services.length >= 5 ? 5 : services.length;
    const images = services.slice(0, max).map((offer) => {
      if (Array.isArray(offer.imagenes_url)) return offer.imagenes_url[0];
    });
    return images;
  };
  return (
    <section
      onClick={() => {
        history("/services/{service.id}");
      }}
      className="big-service-img__container"
    >
      <Swiper slidesPerView="1" effect="fade" autoplay={{ delay: 1000, disableOnInteraction: false }}>
        {Array.isArray(getServicesImg()) ? (
          getServicesImg().map((img) => (
            <SwiperSlide>
              <img src={img ?? "/vite.png"} alt="service main picture" />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <img src="/vite.png" alt="service main picture" />
          </SwiperSlide>
        )}
      </Swiper>
    </section>
  );
};

export default BigServiceImage;
