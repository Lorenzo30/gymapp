import AsyncStorage from "@react-native-async-storage/async-storage";

import { AUTH_TOKEN_STORAGE } from "./storageConfig";

type StorageAuthTokenProps = {
  token:string,
  refreshToken:string
}

export async function storageAuthTokenSave (token:string,refreshToken:string) {
  await AsyncStorage.setItem(AUTH_TOKEN_STORAGE,JSON.stringify({token,refreshToken}));
}

export async function storageAuthTokenGet(){
  let response = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);
  
  const {token,refreshToken} : StorageAuthTokenProps = response ? JSON.parse(response) : {};

  return {token,refreshToken};
}

export async function storageAuthTokenRemove(){
  await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE);
}