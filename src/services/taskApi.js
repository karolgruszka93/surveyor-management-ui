import axios from 'axios';
import authHeader from './auth-header';
import { serverUrl } from "./routes";

export const createTask = async (employees, orders, equipments, vehicles, taskDate, managerId) => {
    const response = await axios.post(serverUrl + "/task", {
        employees,
        orders,
        equipments,
        vehicles,
        taskDate,
        managerId,
    }, { headers: authHeader() });
    return response;
}

export const getTasks = async (managerId, taskDate) => {
    const response = await axios.get(serverUrl + `/tasks/${managerId}/${taskDate}`, { headers: authHeader() });
    return response;
}

export const deleteTask = async (id) => {
    const response = await axios.delete(serverUrl + `/task/${id}`, { headers: authHeader() });
    return response;
}

export const getVehicles = async (user, taskDate) => {
    const response = await axios.get(serverUrl + `/task/vehicles/${user}/${taskDate}`, { headers: authHeader() });
    return response;
}

export const getOrders = async (user, taskDate) => {
    const response = await axios.get(serverUrl + `/task/orders/${user}/${taskDate}`, { headers: authHeader() });
    return response;
}

export const getEquipments = async (user, taskDate) => {
    const response = await axios.get(serverUrl + `/task/equipments/${user}/${taskDate}`, { headers: authHeader() });
    return response;
}

export const getTasksEmployee = async (user, taskDate) => {
    const response = await axios.get(serverUrl + `/tasks/employee/${user}/${taskDate}`, { headers: authHeader() });
    return response;
}