import { useState } from "react"
import { Container, Row, Col, Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { createAccount } from "../../Services/DataService";
import { User } from "../../App";
// import { zodResolver } from "@hookform/resolvers/zod"
// import {z} from "zod";
// import { useForm } from "react-hook-form";

// const schema = z.object({
//     username: z.string().min(1, {message: 'username cannot be blank'}),
//     password: z.string().min(1, {message: 'password cannot be blank'}),

// })
// type FormData = z.infer<typeof schema>


const CreateAccount = () => {
//    const {register, handleSubmit} = useForm<FormData>({resolver:zodResolver(schema)})


    let navigate = useNavigate();
    
    const [Username, setUsername] = useState<User["username"]>('')
    const [Password, setPassword] = useState<User["password"]>('')
    const [isBlank, setIsBlank] = useState(false);

    const handleUser = (e:string) => {
        setUsername(e);
    }
    
    const handlePassword = (e:string) => {
        setPassword(e);
    }

    const handleSubmits = () => {
        if(Username === "" || Password === ""){
            setIsBlank(true);
            return;
        }else{
        setIsBlank(false);
        let userData = {
            id: 0,
            username: Username,
            password: Password
        }
        console.log(userData)
        createAccount(userData)
        navigate("/")
    }
    }

    return (
        <>
            <Container>
                <Row>
                    <Col className="form-container d-flex justify-content-center">
                        <Form>
                            <p className="text-center">Create an Account</p>
                            <Form.Group className="mb-3" controlId="Username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control  type="text" placeholder="Enter username" onChange={(e) => handleUser(e.target.value)} onKeyDown={(e) => {
                                console.log("enter key")
                                if(e.key === "Enter"){
                                handleSubmits();
                                }}}/>
                                {Username === "" && isBlank== true ? <Form.Text className="text-danger"> username cannot be blank</Form.Text>: null}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control  type="password" placeholder="Enter Password"  onChange={(e) => handlePassword(e.target.value)} onKeyDown={(e) => {
                                console.log("enter key")
                                if(e.key === "Enter"){
                                handleSubmits();
                                }}}/>
                                {Password === "" && isBlank== true ? <Form.Text className="text-danger"> password cannot be blank</Form.Text>: null}
                            </Form.Group>
                            <Button variant="primary" onClick={handleSubmits}>
                                Submit
                            </Button>
                            <p className="mt-3">Already Have an Account?</p>
                            <Button variant="primary" onClick={() => navigate('/')}>
                                Log In
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default CreateAccount