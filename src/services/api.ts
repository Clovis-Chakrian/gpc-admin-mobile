import { io } from 'socket.io-client';
import axios from 'axios';

const socket = io('http://192.168.0.49:3333');

const http = axios.create({
  baseURL: 'http://192.168.0.49:3333',
});

export { socket, http };