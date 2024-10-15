import { Container, Row, Col, Button, Form } from "react-bootstrap"
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { GetLoggedInUser, login } from "../../Services/DataService";


const Login = () => {

  let navigate = useNavigate();

  const [Username, setUsername] = useState('')
  const [Password, setPassword] = useState('')
  const [isBlank, setIsBlank] = useState(false);

  const handleUser = (e: string) => {
    setUsername(e);
  }

  const handlePassword = (e: string) => {
    setPassword(e);
  }

  const handleSubmit = async () => {
    if(Username === "" || Password === ""){
      setIsBlank(true);
      return;
    }
    let userData = {
      id: 0,
      username: Username,
      password: Password
    }
    let token = await login(userData)
    console.log(userData)
    console.log(token, "this should be a token");
    if (token != null) {
      localStorage.setItem("Token", token);
      await GetLoggedInUser(Username);
      navigate('/ExpenseList')
    }
    return userData;
  }


  return (
    <>
      <Container>
        <Row>
          <Col className="form-container d-flex justify-content-center">
            <Form>
              <p className="text-center">Login</p>
              <Form.Group className="mb-3" controlId="Username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" onChange={(e) => handleUser(e.target.value)} onKeyDown={(e) => {
                console.log("enter key")
                if(e.key === "Enter"){
                  handleSubmit();
                }}}/>
                {Username === "" && isBlank== true ? <Form.Text className="text-danger"> username cannot be blank</Form.Text>: null}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e) => handlePassword(e.target.value)} onKeyDown={(e) => {
                console.log("enter key")
                if(e.key === "Enter"){
                  handleSubmit();
                }
              }} />
                {Password === '' && isBlank== true ? <Form.Text className="text-danger"> password cannot be blank</Form.Text>: null}
              </Form.Group>
              <Button variant="primary" onClick={handleSubmit} >
                Login
              </Button>
              <p className="mt-3">Don't have an account?</p>
              <Button variant="primary" onClick={() => navigate('/CreateAccount')}>
                Create Account
              </Button>
            </Form>

          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Login