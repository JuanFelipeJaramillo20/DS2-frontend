import ServiceCard from "../../components/serviceCard/Index";
import BigServiceImage from "../../components/BigServiceImage/Index";

import "./style.css";

const Dashboard = () => {

  return (
    <section className="dashboard-container">
      <article>
        <BigServiceImage />
      </article>
      <article className="service-cards">
        {Array.from('000').map((a, index) => (
          <ServiceCard key={index} />
        ))}
      </article>
    </section>
  )
};

export default Dashboard