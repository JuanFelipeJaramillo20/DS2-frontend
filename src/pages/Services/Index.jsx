import { useParams } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import useGetSingleOffer from "../../hooks/useGetSingleOffer";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import "./style.css";

const OfferSingle = () => {
  const { serviceID } = useParams();

  const token = localStorage.getItem("token");
  const { offer } = useGetSingleOffer(serviceID, token);
  return (
    <section className="offer-single__view">
      <article>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView="1"
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          {offer && Array.isArray(offer.imagenes_url) ? (
            offer.imagenes_url.map((img, index) => (
              <SwiperSlide key={index}>
                <img src={img ?? "/vite.png"} alt="service main picture" />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <img src="/vite.png" alt="service main picture" />
            </SwiperSlide>
          )}
        </Swiper>
      </article>
      <article className="information--offer">
        <div>
            <h4>{offer?.titulo ?? 'Sin titulo'}</h4>
        </div>
      </article>
    </section>
  );
};

export default OfferSingle;
