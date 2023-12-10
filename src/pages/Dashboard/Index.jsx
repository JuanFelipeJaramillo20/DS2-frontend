import useGetAllOffers from "../../hooks/useGetAllOffers";

import ServiceCard from "../../components/serviceCard/Index";
import BigServiceImage from "../../components/BigServiceImage/Index";

import "./style.css";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const { allOffers } = useGetAllOffers(token);
  return (
    <section className="dashboard-container">
      <article>
        <BigServiceImage services={allOffers} />
      </article>
      <article className="service-cards">
        {Array.isArray(allOffers) &&
          allOffers.map((offer, index) => (
            <ServiceCard key={index} service={offer} />
          ))}
      </article>
    </section>
  );
};

export default Dashboard;
