import { Form, Col, Button, Card, Row } from 'react-bootstrap';
import { LoginContext } from '../controller/loginstate';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { medicineDelete } from '../service/service';
import { medicineAdder } from '../service/service';
import { useState } from 'react';
import Alert from './Alert'

const Update = () => {


    const {account,setAccount} = useContext(LoginContext);

    const medicineinitial = {
        name: '',
        quantity: '',
        username: account
    };

    const medicinedelinitial = {
        name: '',
        username: account
    }

    const [ medicineInfo,setMedicineInfo ] = useState(medicineinitial);

    const [errorupdate, setErrorupdate] = useState(null);

    const [errordelete, setErrordelete] = useState(null);

    const [ medDel, setMedDel ] = useState(medicinedelinitial);

    const history = useNavigate();


    if(account === '') 
    {
        alert("please login to upload");
        history.push('/login');
    }
    

    const changeHandlerUpdate = (e) => {
        setErrorupdate(null);
        setMedicineInfo({...medicineInfo, [e.target.name]: e.target.value});
    }

    const changeHandlerDelete = (e) => {
        setErrordelete(null);
        setMedDel({...medDel, [e.target.name]: e.target.value});
    }

    const clickHandlerUpdate = (e) => {
        e.preventDefault();
        medicineAdder(medicineInfo);
        setErrorupdate('success');
    }
    const clickHandlerDelete = (e) => {
        e.preventDefault();
        medicineDelete(medDel);
        setErrordelete('success');
    }

    return (
        <Row noGutters={true} style = {{maxWidth:'100%', display: 'flex', alignItems: 'center'}}>
            <Card style={{ display: 'block', 
            width: '30rem',
            margin: '100px auto',
            borderRadius: '10px',
            background: 'rgba(255,255,255, 0.50)',
            padding: '30px',
            }}>
                <h4 style={{color: '#000000', display:'flex', justifyContent: "center", alignItems: "center", marginBottom: 15}}>
                    Update
                </h4>
                <Form>
                    <Form.Group as={Col}>
                        <Form.Label style={{fontSize: 20, color: '#000000'}}>
                            <span>Medicine Name</span>
                        </Form.Label>
                        <Form.Control onChange={changeHandlerUpdate} value={medicineInfo.name} name = 'name' type="text" placeholder="Enter Medicine Name"/>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label style={{fontSize: 20, color: '#000000'}}>
                            <span>Quantity</span>
                        </Form.Label>
                        <Form.Control onChange={changeHandlerUpdate} value={medicineInfo.quantity} name="quantity" type="text" placeholder="Enter Quantity"/>
                    </Form.Group>
                    <Button onClick={(e) => clickHandlerUpdate(e)} size="lg" variant="success" type="submit" style={{marginLeft: '40%', marginTop: 20}}>
                        Update
                    </Button>
                </Form>
                {
                    (errorupdate != null) ? 
                    <Alert msg={"Medicine Updated Successfully"} color={'success'}/> : <div />
                }
            </Card>
            <Card style={{ display: 'block', 
            width: '30rem',
            margin: '100px auto',
            borderRadius: '5px',
            background: 'rgba(255,255,255, 0.50)',
            padding: 30,
            }}>
                <h4 style={{color: '#000000', display:'flex', justifyContent: "center", alignItems: "center"}}>
                    Delete
                </h4>
                <Form>
                    <Form.Group as={Col}>
                        <Form.Label style={{fontSize: 20, color: '#000000'}}>
                            <span>Medicine Name</span>
                        </Form.Label>
                        <Form.Control onChange={changeHandlerDelete} value={medDel.name} name = 'name' type="text" placeholder="Enter Medicine Name"/>
                    </Form.Group>
                    <Button size="lg" onClick={clickHandlerDelete} variant="success" type="submit" style={{marginLeft: '40%', marginTop: 20}}>
                        Delete
                    </Button>
                </Form>
                {
                    (errordelete != null) ? 
                    <Alert msg={"Medicine Deleted Successfully"} color={'success'}/> : <div />
                }
            </Card>
        </Row>
    )
}


export default Update;