import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from 'react-router-dom';
import { SERVER_URL } from "../../helper/constants";



const Login = () => {
  const {authDispatch} = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setEmail(event.target.value);
 
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    authDispatch({ type: 'LOGIN_START'});
    try {
      const response = await fetch(`${SERVER_URL}/expense/v1/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
      });
  

  
      if (response.ok) {
        const result = await response.json();

        authDispatch({ type: 'LOGIN_SUCCESS', payload: result.token });
  
        // Assuming the backend returns a token upon successful login
        navigate("/");
  
        // Redirect the user to a new route upon successful login
        // history.push('/home'); // Replace '/dashboard' with the route you want to navigate to
      } else {
        console.log('Invalid credentials');
      }
    } catch (error) {
      authDispatch({ type: 'LOGIN_FAILURE' });

      console.error('Error fetching data:', error);
    }
  
   
  };


  return (
    <Form  onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="username" value={email}  onChange={handleNameChange} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control  type="password" placeholder="password" value={password}  onChange={handlePasswordChange}/>
      </Form.Group>
 
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );


};

export default Login;
