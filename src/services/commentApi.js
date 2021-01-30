import axios from 'axios';
import authHeader from './auth-header';
import { serverUrl } from "./routes";

export const createComment = async (comment, commentDate, taskId, userId) => {
    const response = await axios.post(serverUrl + "/comment", {
        comment,
        commentDate,
        taskId,
        userId,
    }, { headers: authHeader() });
    return response;
}

export const getComments = async (taskId) => {
    const response = await axios.get(serverUrl + `/comments/${taskId}`, { headers: authHeader() });
    return response;
}