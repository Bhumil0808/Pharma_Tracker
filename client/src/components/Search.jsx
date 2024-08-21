import { Form, Button, Card } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs'
import { useState, useEffect } from 'react';
import Output from './Output';
import axios from 'axios';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const url = 'http://localhost:5000/api';

const district = ['Select', 'Ahmedabad','Amreli','Anand','Aravalli','Banaskantha (Palanpur)','Bharuch','Bhavnagar','Botad','Chhota Udepur','Dahod',
'Dangs (Ahwa)','Devbhoomi Dwarka','Gandhinagar','Gir Somnath','Jamnagar','Junagadh','Kachchh','Kheda (Nadiad)','Mahisagar',
'Mehsana','Morbi','Narmada (Rajpipla)','Navsari','Panchmahal','Patan','Porbandar','Rajkot','Sabarkantha','Surat',
'Surendranagar','Tapi','Vadodara','Valsad']

const Search = () => {

    const medicinenameinitial = {
        name: '',
        district: ''
    }

    const [medicinename, setMedicinename] = useState(medicinenameinitial);

    const [ clickdone, setClickdone ] = useState(false);
    
    const [medicinedata, setMedicinedata] = useState([]);

    const [medicinesearch, setMedicineSearch] = useState([]);

    const [select, setSelect] = useState([]);


    const medicinefinder = async(medicine) => {
        try {
            await axios.get(`${url}/medicine/search`, {'params': {name: medicine.name}})
                 .then((response) => {
                    setMedicinedata(response.data);
                 })
        }
        catch(error) {
            console.log('Error while finding medicine',error);
        }
    }

    useEffect(() => {
        const loadMedicine = async () => {
            const response = await axios.get(`${url}/medicine`);
            setMedicineSearch(response.data);
        }
        loadMedicine()
    }, [])

    const medicinesearchUnique = [...new Map(medicinesearch.map(item =>
        [item['name'], item])).values()];

    const onValueChange = (e) => {
        setMedicinename({...medicinename, [e.target.name]: e.target.value });
    }

    const clickhandler = () => {
        setClickdone(true)
        medicinefinder(medicinename)
    }

    const clicksearchHandler = () => {
        setClickdone(false);
        setMedicinedata([]);
    }

    return (
        <div>
            {
                clickdone ? 
                <div>
                    <Output medicine={medicinedata} district={medicinename.district}/>
                    <Button variant="success" onClick={clicksearchHandler} className="d-flex mx-auto">Back to Search</Button>
                </div>
                :
                <Card style={{ display: 'flex', 
                width: '30rem',
                margin: '100px auto',
                borderRadius: '5px',
                background: 'rgba(255,255,255, 0.50)',
                padding: 30 }} className="mx-auto">
                    <h4 className="mx-auto mb-4" style={{color: '#000000'}}>
                        <BsSearch style={{color: '#000000', fontSize: 20}} className="mr-2"/>
                        Search Medicines
                    </h4>
                    <Form>
                        <Form.Group>
                            <Form.Label style={{fontSize: 20, color: '#000000'}}>
                                <span>Enter Medicine Name</span>
                            </Form.Label>

                            <Typeahead
                                selected={select}
                                onChange={(select) => {setMedicinename({...medicinename, name: select}); setSelect()}}
                                id="typeahead"
                                options={medicinesearchUnique.map(med => (                                      
                                    med.name
                                ))}
                                placeholder="Enter Medicine Name"
                            />
                            
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect1" className="mb-4">
                            <Form.Label style={{fontSize: 20, color: '#000000'}}>Select District Name</Form.Label>
                            <Form.Control onChange={(e) => onValueChange(e)} value={medicinename.district} name="district" as="select">
                            {
                                district.map((dis) => (
                                    <option>{dis}</option>
                                ))
                            }
                            </Form.Control>
                        </Form.Group>
                        <Button onClick={clickhandler} size="lg" variant="success" className="d-flex mx-auto">
                            Search
                        </Button>
                    </Form>
                </Card>
            }
        </div>
    )
}

export default Search;