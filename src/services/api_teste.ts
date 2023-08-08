import axios from "axios";

const apiTeste = axios.create({baseURL: "https://jsonplaceholder.typicode.com/todos/1"});

apiTeste.interceptors.response.use(response => {
    response.data = JSON.stringify(response.data);
    return response;
});

export {apiTeste} 


