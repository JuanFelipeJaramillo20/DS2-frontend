import { useNavigate } from "react-router";

import "./style.css";

// props => {service}
const ServiceCard = () => {
  const history = useNavigate();
  return (
    <section onClick={() => {
        history('/services/{service.id}')
    }} className="service-card__container">
      <article>
        <img src="/vite.png" alt="service main picture" />
      </article>
      <article>
        <p>service information</p>
      </article>
    </section>
  );
};

export default ServiceCard;
