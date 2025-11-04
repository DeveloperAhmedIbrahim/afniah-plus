import axios from "../lib/axios.js";

const submitContact = async (data) => {
    const response = await axios.post('/contact', data);
    return response.data;
}