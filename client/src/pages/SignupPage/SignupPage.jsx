import "./SignupPage.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import {Select, TextField, MenuItem, FormControl, Container, Box} from '@mui/material';

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [matricula, setMatricula] = useState("");
  const [numeroTrabajador, setNumeroTrabajador] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleRole = (e) => setRole(e.target.value);
  const handleMatricula = (e) => setMatricula(e.target.value);
  const handleNumeroTrabajador = (e) => setNumeroTrabajador(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name, role, matricula, numeroTrabajador};
    
    
    // Send a request to the server using axios
    /* 
    const authToken = localStorage.getItem("authToken");
    axios.post(
      `${process.env.REACT_APP_SERVER_URL}/auth/signup`, 
      requestBody, 
      { headers: { Authorization: `Bearer ${authToken}` },
    })
    .then((response) => {})
    */

    // Or using a service
    authService
      .signup(requestBody)
      .then(() => {
        // If the POST request is successful redirect to the login page
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error:", error);  // Log the full error object
        // Check if the error response and message exist
        if (error.response && error.response.data && error.response.data.message) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("An unexpected error occurred.");
        }
      });
  };

  return (
    <Container>
      
      <h1>Sign Up</h1>
      <Box >
        
      
      
        <TextField label="Correo electronico" variant="standard"value={email} onChange={handleEmail} />
        <TextField label="Contrasena" variant="standard" value={password} onChange={handlePassword} />
        <TextField label="Nombre" variant="standard" value={name} onChange={handleName} />
       <FormControl fullWidth >
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={role}
          label="Rol"
          onChange={handleRole}
        >
          <MenuItem value="Alumno">Alumno</MenuItem>
          <MenuItem value="Maestro">Maestro</MenuItem>
          <MenuItem value="Bibliotecario">Bibliotecario</MenuItem>
        </Select>
        </FormControl>

        <TextField label="Matricula" variant="standard" value={matricula} onChange={handleMatricula} />
        <TextField label="Numero de trabajador" variant="standard"  value={numeroTrabajador} onChange={handleNumeroTrabajador} />
        <button type="submit" onSubmit={handleSignupSubmit}>Sign Up</button>

        </Box>  
        {errorMessage && <p className="error-message">{errorMessage}</p>}

      
      
      
      <p>Ya tienes una cuenta?</p>
      <Link to={"/login"}> Iniciar sesion</Link>
    </Container>
  );
}

export default SignupPage;
