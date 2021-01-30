import axios from 'axios';
import authHeader from './auth-header';
import { serverUrl } from "./routes";

export const createEquipment = async (name, model, type, managerId) => {
    const response = await axios.post(serverUrl + "/equipment", {
        name,
        model,
        type,
        managerId,
    }, { headers: authHeader() });
    return response;
}

export const getEquipment = async (managerId) => {
    const response = await axios.get(serverUrl + `/equipment/${managerId}`, { headers: authHeader() });
    return response;
}

export const deleteEquipment = async (id) => {
    const response = await axios.delete(serverUrl + `/equipment/${id}`, { headers: authHeader() });
    return response;
}

export const updateEquipment = async (id, name, model, type) => {
    const response = await axios.put(serverUrl + `/equipment/${id}`, { name, model, type }, { headers: authHeader() });
    return response;
}  