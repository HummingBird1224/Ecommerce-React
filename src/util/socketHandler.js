import { io } from "socket.io-client";
import authService from "../services/auth.service";

async function getSocketUrl(){
	const {data} = await authService.getSocketURL();
	return data;
}

async function startSocket(){
	const socketUrl = await getSocketUrl();
	const socket = io(socketUrl);
	return socket;
}

const socketHandler = {
	startSocket
};

export default socketHandler;
