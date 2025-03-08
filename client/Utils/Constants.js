import { io } from 'socket.io-client';
const BASE_URL = "http://192.168.108.101:3000/"

const createSocketConnection = () => {
    return io(BASE_URL);
}

export {
    BASE_URL,
    createSocketConnection
};