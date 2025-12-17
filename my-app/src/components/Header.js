import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Header() {

   const navigate = useNavigate();

const HandleLogout = () => {
    localStorage.removeItem("userId");

    navigate("/");
  };

  return (
    <header className="main-header">
      <Link to="/converted">Home</Link>
      <Link to="/wishlist">Books I Want</Link>
      <Link to="/dashboard">My books</Link>
      
      <div className="right-header">
          <button className="logout-button" onClick={HandleLogout}>
        Logout
      </button>
      </div>
    </header>
  );
}