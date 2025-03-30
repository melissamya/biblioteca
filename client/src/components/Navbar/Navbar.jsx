import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Button } from "@mui/material";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav>
    
      {isLoggedIn && (
        <>
          <Button onClick={logOutUser}>Cerrar sesion</Button>

          <Link to="/profile">
            <img alt="Mi perfil" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png" style={{ width: 50, height: 50, borderRadius: 25}} />
          </Link>
        
          <span>{user && user.name}</span>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup">
            {" "}
            <Button>Crear cuenta</Button>{" "}
          </Link>
          <Link to="/login">
            {" "}
            <Button>Iniciar sesion</Button>{" "}
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
