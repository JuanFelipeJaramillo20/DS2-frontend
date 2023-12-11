import { Link } from "react-router-dom";

import useGetUser from "../../hooks/useGetUser";

import "./style.css";

const Nav = () => {
  const userId = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");
  const { user } = useGetUser(userId, token);
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
          <Link to="/create">Offer</Link>
        </button>
      </section>
      <section>
        <button>
          <Link to="/profile">
            <img
              src={user.image ? user.image : "/images/no-user-img.png"}
              alt="user profile picture"
            />
          </Link>
        </button>
      </section>
    </nav>
  );
};

export default Nav;
