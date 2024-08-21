import { Form, Button, Card} from 'react-bootstrap';
import {BsUpload} from 'react-icons/bs';
import { useContext} from 'react';
import { useState } from 'react';
import { LoginContext } from '../controller/loginstate';
import { medicineAdder } from '../service/service';
import { useNavigate } from 'react-router-dom';
import Alert from './Alert';

const Upload = () => {
    const  [files,setFiles] = useState(null);

    const {account,setAccount} = useContext(LoginContext);

    const [errorupload, setErrorupload] = useState(null);

    const history = useNavigate();

    if(account === '') 
    {
        alert("please login to upload");
        history('/login');
    }
    

    const handleOnFileLoad = (data) => {
        setErrorupload(null);
        setFiles(data);
    }

    const clickHandler = () => {
        for(var i=0; i<files.length-1; i++)
        {
            const obj = {
                name: files[i]['data'][0],
                quantity: files[i]['data'][1],
                username: account
            }
            medicineAdder(obj);
        }
        setErrorupload('success');
    }


    return (
        <div style = {{display: 'flex', alignItems: 'center'}}>
            <Card style={{
            margin: '100px auto',
            borderRadius: '5px',
            background: 'rgba(255,255,255, 0.50)',
            padding: 30,
            }}>
                <h4 style={{color: '#000000', display:'flex', justifyContent: "center", alignItems: "center", marginBottom: 30}}>
                    <BsUpload style={{color: '#000000', fontSize: 20}} className="mr-2"/>
                    Upload
                </h4>
                <useCSVReader onFileLoad={handleOnFileLoad}>
                    <Form>
                        <Form.Group controlId="formFileLg" className="my-3" style={{color:'#fff'}}>
                            <Form.Control  type="file" size="lg" style={{color:'#fff'}} />
                        </Form.Group>
                    </Form>
                </useCSVReader>
                <Button onClick={clickHandler} size="lg" variant="success" type="submit" className="mx-auto" style={{marginLeft: '40%', marginTop: 20}}>
                    Upload
                </Button>
                {
                    (errorupload != null) ? 
                    <Alert msg={"Medicine Uploaded Successfully"} color={'success'}/> : <div />
                }
            </Card>
        </div>
    )
}


export default Upload;