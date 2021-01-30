import axios from 'axios';
import authHeader from './auth-header';
import { serverUrl } from "./routes";

export const createAttachment = async (file, taskId) => {

    let formData = new FormData();
    formData.append("file", file);
    formData.append("taskId", taskId);

    const response = await axios.post(serverUrl + "/upload",
        formData,
        { headers: authHeader() });
    return response;
}

export const getFilesList = async (taskId) => {
    const response = await axios.get(serverUrl + `/files/${taskId}`, { headers: authHeader() });
    return response;
}  

export const getFile = async (fileId, token) => {
    const response = await axios.get(serverUrl + `/file/${fileId}/${token}`, { headers: authHeader()});
    return response;
}

export const getDownloadToken = async (fileId) => {
    const response = await axios.get(serverUrl + `/downloadtoken/${fileId}`, { headers: authHeader() });
    return response;
}

export const deleteFiles = async (taskId) => {
    const response = await axios.delete(serverUrl + `/files/${taskId}`, { headers: authHeader() });
    return response;
}