import "./style.css";

const Profile = () => {
  return (
    <section className="profile-section__container">
      <header>
        <div>
          <img src="vite.png" alt="user picture" />
        </div>
        <div>
          <h2>Nombre y Apellido</h2>
          <p>information</p>
        </div>
      </header>
      <br />
      <div>
        <article>
          <h3>Información personal</h3>
          <div>
            <p></p>
          </div>
        </article>
        <article>
          <h3>Trabajos, pedidos y postulación</h3>
          <div>
            <p></p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Profile;
