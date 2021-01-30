import axios from 'axios';
import authHeader from './auth-header';
import { serverUrl } from "./routes";

export const createVehicle = async (mark, model, licensePlateNumber, serviceDate, managerId) => {
    const response = await axios.post(serverUrl + "/vehicle", {
        mark,
        model,
        licensePlateNumber,
        serviceDate,
        managerId,
    }, { headers: authHeader() });
    return response;
}

export const getVehicles = async (managerId) => {
    const response = await axios.get(serverUrl + `/vehicle/${managerId}`, { headers: authHeader() });
    return response;
}

export const deleteVehicle = async (id) => {
    const response = await axios.delete(serverUrl + `/vehicle/${id}`, { headers: authHeader() });
    return response;
}

export const updateVehicle = async (id, mark, model, licensePlateNumber, serviceDate) => {
    const response = await axios.put(serverUrl + `/vehicle/${id}`, { mark, model, licensePlateNumber, serviceDate }, { headers: authHeader() });
    return response;
}  