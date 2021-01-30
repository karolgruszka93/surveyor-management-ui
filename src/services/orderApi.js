import axios from 'axios';
import authHeader from './auth-header';
import { serverUrl } from "./routes";

export const createOrder = async (type, customer, endDate, status, managerId) => {
    const response = await axios.post(serverUrl + "/order", {
        type,
        customer,
        endDate,
        status,
        managerId,
    }, { headers: authHeader() });
    return response.data;
}

export const getOrders = async (managerId) => {
    const response = await axios.get(serverUrl + `/order/${managerId}`, { headers: authHeader() });
    return response;
}

export const deleteOrder = async (id) => {
    const response = await axios.delete(serverUrl + `/order/${id}`, { headers: authHeader() });
    return response;
}

export const updateOrder = async (id, type, customer, endDate, status) => {
    const response = await axios.put(serverUrl + `/order/${id}`, { type, customer, endDate, status }, { headers: authHeader() });
    return response;
}  