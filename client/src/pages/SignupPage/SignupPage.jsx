import "./SignupPage.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import {Select, TextField, MenuItem, FormControl, Container, Box} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import * as React from 'react';

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [matricula, setMatricula] = useState("");
  const [numeroTrabajador, setNumeroTrabajador] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [showPassword, setShowPassword] = React.useState(false);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleRole = (e) => setRole(e.target.value);
  const handleMatricula = (e) => setMatricula(e.target.value);
  const handleNumeroTrabajador = (e) => setNumeroTrabajador(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    
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


  const handleClickShowPassword = () => setShowPassword((show) => !show);

  function handleMouseDownPassword(event) {
    event.preventDefault();
  }
  
  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container>
      
      <h1>Crear cuenta</h1>
      
 <form onSubmit={handleSignupSubmit}>  
  
        <TextField label="Nombre(s)" variant="standard" value={name} onChange={handleName} />
        <TextField label="Correo electronico" variant="standard"value={email} onChange={handleEmail} />
        
        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            onChange={handlePassword}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        
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

       
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      
      
      
      <p>Ya tienes una cuenta?</p>
      <Link to={"/login"}> Iniciar sesion</Link>
    </Container>
  );
}


export default SignupPage;
