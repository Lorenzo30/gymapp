import { storageAuthTokenGet, storageAuthTokenSave } from "@storage/storageAuthToken";
import { AppError } from "@utils/AppError";
import App from "App";
import axios, { AxiosError, AxiosInstance } from "axios";

type SignOut = () => void

type ApiInstanceProps = AxiosInstance & {
    registerInterceptTokenManager: (signOut:SignOut) => () => void
}

const api = axios.create({
    baseURL:"http://192.168.100.26:3333"
}) as ApiInstanceProps


type PromiseType = {
    onSuccess:(token:string) => void;
    onFailure:(error:AxiosError) => void;
}

let failedQueee : Array<PromiseType> = [];
let isRefresing = false;

api.registerInterceptTokenManager = signOut => {
    const interceptTokenManager = api.interceptors.response.use(response => response,async (requestError) => {

        if (requestError?.response?.status == 401) {
            if (requestError.response.data?.message == 'token.expired' 
            || requestError.response.data?.message == 'token.invalid'
            ) {
                const {refreshToken} = await storageAuthTokenGet();
               
                if (!refreshToken) {
                    signOut();
                    return Promise.reject(requestError);
                }

                const originalConfigRequest = requestError.config;

                if (isRefresing) {
                    return new Promise((resolve,reject) => {
                        failedQueee.push({
                            onSuccess: (token:string) => {
                                originalConfigRequest.headers = {'Authorization':`Bearer ${token}`};
                                resolve(api(originalConfigRequest));
                            },
                            onFailure: (error:any) => {
                                reject(error);
                            }
                        })
                    })
                }
                isRefresing = true;

                return new Promise (async (resolve,reject) => {
                    try {
                        const {data} = await api.post("/sessions/refresh-token",{refresh_token:refreshToken}) 
                        await storageAuthTokenSave(data.token,data.refresh_token)
                        
                        if (originalConfigRequest.data && !(originalConfigRequest.data instanceof FormData)) {
                            console.log("aqui data",originalConfigRequest.data);
                            originalConfigRequest.data = JSON.parse(originalConfigRequest.data)
                        }
                        
                        originalConfigRequest.headers = {'Authorization':`Bearer ${data.token}`};
                        api.defaults.headers.common['Authorization'] =`Bearer ${data.token}`;

                        failedQueee.forEach((request) => {
                            request.onSuccess(data.token);
                        })

                        resolve(api(originalConfigRequest));

                    } catch (error) {
                        failedQueee.forEach(request => {
                            request.onFailure(error);
                        })
                        console.log(error);
                        signOut();
                        reject(error);
                    } finally {
                        isRefresing = false;
                        failedQueee = [];
                    }
                })
            }

        
           signOut();
        }

        if(requestError.response && requestError.response.data){
            return Promise.reject(new AppError(requestError.response.data.message));
        } else {
            return Promise.reject(requestError);
        }
    })

    return () => api.interceptors.response.eject(interceptTokenManager);
}


export {api}