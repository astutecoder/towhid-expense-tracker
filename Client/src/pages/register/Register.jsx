import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { SERVER_URL } from "../../helper/constants";

function Register() {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleNameChange = (event) => {
        setName(event.target.value);
  
     
      };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);

     
      };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        


     
      };

    const handleSubmit = async (event) => {
        event.preventDefault();
      

        try {
          const response = await fetch(`${SERVER_URL}/expense/v1/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:email, name: name, password: password }),
          });
      
         
          if (response.status === 200) {
       
            console.log('result:', response);
      
           
          } else {
            console.log('Invalid credentials');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      
      };
    


  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control onChange={handleEmailChange} type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control onChange={handleNameChange}  type="text" placeholder="Enter Name" />
        <Form.Text className="text-muted"></Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control onChange={handlePasswordChange} type="password" placeholder="Password" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Register
      </Button>
    </Form>
  );
}

export default Register;
