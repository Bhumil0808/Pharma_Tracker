import { Navbar, Nav, Button, Dropdown, Container } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { GiMedicines } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { LoginContext } from '../controller/loginstate';
import { useNavigate } from 'react-router-dom';
import './custom.css';

const Header = () => {
    const { account, setAccount } = useContext(LoginContext);
    const [expanded, setExpanded] = useState(false);
    const history = useNavigate();

    const clickHandler = () => {
        setExpanded(false);
        history('/');
        setAccount('');
    };

    return (
        <Container>
            <Navbar expanded={expanded} style={{ height: 50, background: '', marginTop: 15 }} sticky="top" expand="lg">
                <Nav className="col-2">
                    <Navbar.Brand href="/">
                        <div className="mx-auto">
                            <GiMedicines className="mb-2" style={{ color: '#5cb85c' }} />
                            <span style={{ color: '#ffffff', fontWeight: 700 }}>Pharma</span>
                            <span style={{ color: '#5cb85c', fontWeight: 700 }}>Tracker</span>
                        </div>
                    </Navbar.Brand>
                </Nav>
                <Navbar.Toggle onClick={() => setExpanded(expanded ? false : true)} style={{ background: '#3F7F3F' }} />
                <Navbar.Collapse>
                    {account === '' ? (
                        <Nav onClick={() => setExpanded(false)} className="ml-auto col-4 d-flex">
                            <Link to="/Signup">
                                <Nav.Item className="mr-4" style={{width:'140px', marginLeft:'40px'}}>
                                    <Button variant="success">Admin Signup</Button>
                                </Nav.Item>
                            </Link>
                            <Link to="/Login">
                                <Nav.Item className='ml-4 pl-4' style={{width:'120px', color: 'white'}}>
                                    <Button variant="success">Admin Login</Button>
                                </Nav.Item>
                            </Link>
                        </Nav>
                    ) : (
                        <Nav className="ml-auto col-4">
                            <Link to="/Upload">
                                <Nav.Item className="mr-4">
                                    <Button variant="outline-success" onClick={() => setExpanded(false)}>Add</Button>
                                </Nav.Item>
                            </Link>
                            <Link to="/Update">
                                <Nav.Item style={{ color: 'white',marginLeft:'5px', marginRight:'5px' }} className="mr-4">
                                    <Button variant="outline-success" onClick={() => setExpanded(false)}>Update/Delete</Button>
                                </Nav.Item>
                            </Link>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    {account}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="logout" style={{ padding: 0 }}>
                                    <Dropdown.Item onClick={clickHandler}>Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Navbar>
        </Container>
    );
};

export default Header;
