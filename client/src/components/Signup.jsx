import { Form, Row, Col, Button } from 'react-bootstrap';
import { FiLogIn } from 'react-icons/fi'
import {authenticateSignup} from '../service/service';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';


const district = ['Select', 'Ahmedabad','Amreli','Anand','Aravalli','Banaskantha (Palanpur)','Bharuch','Bhavnagar','Botad','Chhota Udepur','Dahod',
'Dangs (Ahwa)','Devbhoomi Dwarka','Gandhinagar','Gir Somnath','Jamnagar','Junagadh','Kachchh','Kheda (Nadiad)','Mahisagar',
'Mehsana','Morbi','Narmada (Rajpipla)','Navsari','Panchmahal','Patan','Porbandar','Rajkot','Sabarkantha','Surat',
'Surendranagar','Tapi','Vadodara','Valsad']

const signupInitialValues = {
    fullname: '',
    username: '',
    password: '',
    phone: '',
    email: '',
    shopname: '',
    shopaddress: '',
    district: '',
    pincode: '',
    features: ''
};


const Signup = () => {

    const [signup, setSignup] = useState(signupInitialValues);

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }

    const history = useNavigate();

    const clickHandler = async () => {
        try {
            const response = await authenticateSignup(signup);
            alert("Signup successful");
            setSignup(signupInitialValues);
            history('/login');
        } catch (error) {
            alert("Invalid signup");
            console.error(error);
        }
    }

    return (
        <div style={{ display: 'block', 
        width: '70%',
        margin: '100px auto',
        borderRadius: '5px',
        background: 'rgba(255,255,255, 0.50)',
        padding: 30,
        }} className="col-8">
            <h4 style={{color: '#000000', display:'flex', justifyContent: "center", alignItems: "center", marginBottom: 15}}>
                <FiLogIn style={{color: '#000000', fontSize: 30}} className="mr-2"/>
                SignUp
            </h4>
            <Form onSubmit={e => {e.preventDefault(); }} >
                <Row xs={1} md={2} style={{justifyContent: "center", alignItems: "center"}}>
                    <Form.Group as={Col}>
                        <Form.Label style={{fontSize: 20, color: '#000000'}}>
                            <span>Full Name</span>
                        </Form.Label>
                        <Form.Control required onChange={(e) => onInputChange(e)} value={signup.fullname} name="fullname" type="text" placeholder="Enter Full Name"/>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label style={{fontSize: 20, color: '#000000'}}>
                            <span>User Name</span>
                        </Form.Label>
                        <Form.Control required onChange={(e) => onInputChange(e)} value={signup.username} name="username" type="text" placeholder="Enter User Name"/>
                    </Form.Group>
                </Row>
                <Row xs={1} md={2} style={{justifyContent: "center", alignItems: "center"}}>
                    <Form.Group as={Col}>
                        <Form.Label style={{fontSize: 20, color: '#000000'}}>
                            <span>Password</span>
                        </Form.Label> 
                        <Form.Control required onChange={(e) => onInputChange(e)} value={signup.password} name="password" type="password" pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" placeholder="Enter Pass (Min 8 char, at least one letter and one number)"/>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label style={{fontSize: 20, color: '#000000'}}>
                            <span>Phone Number</span>
                        </Form.Label>
                        <Form.Control required onChange={(e) => onInputChange(e)} value={signup.phone} name="phone" type="tel" pattern="[0-9]{10}" placeholder="Enter Phone Number"/>
                    </Form.Group>
                </Row>
                <Row xs={1} md={2} style={{justifyContent: "center", alignItems: "center"}}>
                <Form.Group as={Col}>
                    <Form.Label style={{fontSize: 20, color: '#000000'}}>
                        <span>Email</span>
                    </Form.Label>
                    <Form.Control required onChange={(e) => onInputChange(e)} value={signup.email} name="email" type="email" placeholder="Enter Email Address"/>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label style={{fontSize: 20, color: '#000000'}}>
                        <span>Shop Name</span>
                    </Form.Label>
                    <Form.Control required onChange={(e) => onInputChange(e)} value={signup.shopname} name="shopname" type="text" placeholder="Enter Shop Name"/>
                </Form.Group>
                </Row>
                <Form.Group>
                    <Form.Label style={{fontSize: 20, color: '#000000'}}>
                        <span>Shop Address</span>
                    </Form.Label>
                    <Form.Control required onChange={(e) => onInputChange(e)} value={signup.shopaddress} name="shopaddress" type="text" placeholder="Enter Shop Address"/>
                </Form.Group>
                <Row xs={1} md={2} style={{justifyContent: "center", alignItems: "center"}}>
                <Form.Group as={Col} controlId="exampleForm.ControlSelect1">
                    <Form.Label style={{fontSize: 20, color: '#000000'}}>
                        <span>District</span>
                    </Form.Label>
                    <Form.Control onChange={(e) => onInputChange(e)} value={signup.district} name="district" as="select" placeholder="Enter District">
                    {
                        district.map((dis) => (
                            <option>{dis}</option>
                        ))
                    }
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label style={{fontSize: 20, color: '#000000'}}>
                        <span>Pin Code</span>
                    </Form.Label>
                    <Form.Control required onChange={(e) => onInputChange(e)} value={signup.pincode} name="pincode" type="text" placeholder="Enter Pin Code"/>
                </Form.Group>
                </Row>
                <Form.Group>
                    <Form.Label style={{fontSize: 20, color: '#000000'}}>
                        <span>Features</span>
                    </Form.Label>
                    <Form.Control required onChange={(e) => onInputChange(e)} value={signup.features} name="features" type="text" placeholder="Enter Features"/>
                </Form.Group>
                <Row style={{justifyContent: "center", alignItems: "center"}}>
                    <Button type="submit" size="lg" variant="success" onClick={() => clickHandler()} style={{ marginTop: 20}}>
                        SignUp
                    </Button>
                </Row>
            </Form>
        </div>
    ) 
}


export default Signup;