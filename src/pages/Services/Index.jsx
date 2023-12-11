import { useParams } from "react-router-dom";
import { parseISO, format, isValid } from "date-fns";

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

  const formatDate = (date) => {
    const inputDate = parseISO(date);
    const outputFormat = "EEEE, MMMM dd yyyy";
    const formattedDate = format(inputDate, outputFormat);
    return formattedDate;
  };

  const allCategories = {
    misc: "Miscelaneo",
    plom: "Plomería",
    carp: "Carpintería",
    elect: "Eléctrico",
    other: "Otro",
  };

  console.log(offer);
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
          <h4>{offer?.titulo ?? "Sin titulo"}</h4>
          <div>
            <p>{offer?.fecha_exp && formatDate(offer?.fecha_exp)}</p>
            <p>
              {offer?.categorias &&
                offer.categorias.map((cat) => {
                  for (const key in allCategories) {
                    if (key === cat) return allCategories[key];
                  }
                })}
            </p>
          </div>
        </div>
        <div>
          <div>
            <h4>Precio</h4>
            <p>{offer?.precio}</p>
          </div>
          <div>
            <h4>Descripción</h4>
            <p>{offer?.descripcion}</p>
          </div>
        </div>
      </article>
    </section>
  );
};

export default OfferSingle;
