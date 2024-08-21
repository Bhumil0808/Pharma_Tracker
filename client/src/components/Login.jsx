import { Form, Col, Button, Card } from 'react-bootstrap';
import { FiLogIn } from 'react-icons/fi';
import { authenticateLogin } from '../service/service.js';
import { useState, useContext } from 'react';
import { LoginContext } from '../controller/loginstate.jsx';
import { useNavigate } from 'react-router-dom';

const loginInitialValues = {
    username: '',
    password: '',
};

const Login = () => {
    const [login, setLogin] = useState(loginInitialValues);
    const { account, setAccount } = useContext(LoginContext);
    const history = useNavigate();

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };

    const clickHandler = async (e) => {
        e.preventDefault();
        let response = await authenticateLogin(login);
        if (!response) {
            alert("Invalid login");
            setLogin({ ...login, password: '' });
            return;
        }
        alert("Login successful");
        setAccount(login.username);
        setLogin(loginInitialValues);
        history('/Update');
    };

    return (
        <Card style={{
            display: 'block',
            width: '30rem',
            margin: '100px auto',
            borderRadius: '5px',
            background: 'rgba(255,255,255, 0.50)',
            padding: 30,
        }}>
            <h4 style={{ color: 'black', display: 'flex', justifyContent: "center", alignItems: "center", marginBottom: 15 }}>
                <FiLogIn style={{ color: '#000000', fontSize: 20 }} className="mr-2" />
                Login
            </h4>
            <Form onSubmit={clickHandler}>
                <Form.Group as={Col}>
                    <Form.Label style={{ fontSize: 20, color: '#000000' }}>
                        <span>User Name</span>
                    </Form.Label>
                    <Form.Control required onChange={onValueChange} value={login.username} name="username" type="text" placeholder="Enter User Name" />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label style={{ fontSize: 20, color: '#000000' }}>
                        <span>Password</span>
                    </Form.Label>
                    <Form.Control required onChange={onValueChange} name="password" value={login.password} type="password" placeholder="Enter Password" />
                </Form.Group>
                <Button type="submit" size="lg" variant="success" style={{ marginLeft: '40%', marginTop: 20 }} >
                    Login
                </Button>
            </Form>
        </Card>
    );
};

export default Login;