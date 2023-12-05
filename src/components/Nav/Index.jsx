import { Link } from "react-router-dom";

import "./style.css";

const Nav = () => {
  return (
    <nav className="nav-bar__container">
      <section>
        <button>
          <Link to="/dashboard">
            <img src={"/vite.png"} alt="logo app" />
          </Link>
        </button>
      </section>
      <section>
        <button>
          <Link to="/dashboard">Home</Link>
        </button>
      </section>
      <section>
        <button>
          <Link to="/products">Products</Link>
        </button>
      </section>
      <section>
        <button>
          <Link to="/about">About</Link>
        </button>
      </section>
      <section>
        <button>
          <Link to="/profile">
            <img src={"/images/no-user-img.png"} alt="user profile picture" />
          </Link>
        </button>
      </section>
    </nav>
  );
};

export default Nav;
