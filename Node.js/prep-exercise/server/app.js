import express from 'express';
import { register, login, getProfile, logout } from './users.js'; 

const app = express();

app.use(express.json());

// Routes for authentication
app.post('/auth/register', register);  
app.post('/auth/login', login);        
app.get('/auth/profile', getProfile);  
app.post('/auth/logout', logout);     

app.use(express.static('client'));

app.listen(3000);
