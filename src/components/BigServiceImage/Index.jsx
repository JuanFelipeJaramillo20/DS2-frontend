import { useNavigate } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./style.css";

const BigServiceImage = ({ services }) => {
  const history = useNavigate();

  return (
    <section className="big-service-img__container">
      <Swiper
        slidesPerView="1"
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {Array.isArray(services) ? (
          services.map((img) => {
            const source = Array.isArray(img?.imagenes_url)
              ? img?.imagenes_url[0]
              : "/vite.png";
            return (
              <SwiperSlide>
                <img
                  onClick={() => {
                    history(`/services/${img?.id}`);
                  }}
                  src={source}
                  alt="service main picture"
                />
              </SwiperSlide>
            );
          })
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
