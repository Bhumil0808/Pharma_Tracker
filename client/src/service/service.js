import axios from 'axios';

const url = 'http://localhost:5000/api';

export const authenticateSignup = async (user) => {
    try {
        const response = await axios.post(`${url}/Signup`, user);
        return response.data; // Use response.data to access the response body
    } catch (error) {
        console.log('Error while calling signup api', error);
        throw error; // Rethrow the error to handle it in the component
    }
}

export const authenticateLogin = async (user) => {
    try {
        return await axios.post(`${url}/login`, user);
    }
    catch(error) {
        console.log('Error while calling login api', error.message);
    }
}

export const medicineAdder = async(medicine) => {
    try {
        return await axios.post(`${url}/medicine/add`, medicine);
    }
    catch(error) {
        console.log('Error while calling medicine adder api', error);
    }
}

export const medicineDelete = async(medicine) => {
    try {
        await axios.post(`${url}/medicine/delete`, medicine);
    }
    catch(error) {
        console.log('Error while calling medicine delete api', error);
    }
}



export const userfind = async (user) => {
    try{
        return await axios.get(`${url}/user/search`, user)
    }
    catch(error) {
        console.log('Error while calling user for shop address', error);
    }
}