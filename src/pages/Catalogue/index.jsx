import ServiceCard from "../../components/serviceCard/Index";
import "./style.css";

const Catalogue = () => {

    return (
      <section className="catalogue-container">
        
        <article className="service-cards">
          {Array.from('000').map((a, index) => (
            <ServiceCard key={index} />
          ))}
        </article>
      </section>
    )
};
  
export default Catalogue