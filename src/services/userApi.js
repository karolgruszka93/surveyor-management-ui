import axios from 'axios';
import authHeader from './auth-header';
import { serverUrl } from "./routes";

export const getEmployees = async (managerId) => {
    const response = await axios.get(serverUrl + `/employee/${managerId}`, { headers: authHeader() });
    return response;
}

export const deleteEmployee = async (id) => {
    const response = await axios.delete(serverUrl + `/employee/${id}`, { headers: authHeader() });
    return response;
}

export const updateEmployee = async (id, firstName, lastName, email) => {
    const response = await axios.put(serverUrl + `/employee/${id}`, { firstName, lastName, email }, { headers: authHeader() });
    return response;
}

export const registerUser = async (firstName, lastName, email, password) => {
    const response = await axios.post(serverUrl + "/register", {
        firstName,
        lastName,
        email,
        password,
    });
    return response;
}

export const createEmployee = async (firstName, lastName, email, password, managerId) => {
    const response = await axios.post(serverUrl + "/employee", {
        firstName,
        lastName,
        email,
        password,
        managerId
    }, { headers: authHeader() });
    return response;
}

export const loginUser = async (email, password) => {
    const response = await axios.post(serverUrl + "/login", {
        email,
        password
    });
    if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
}

export const logoutUser = () => {
    localStorage.removeItem("user");
}

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));;
}