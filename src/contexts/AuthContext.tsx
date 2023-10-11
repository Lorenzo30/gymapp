import { UserDTO } from "@dtos/UserDTO";
import { createContext, useEffect, useState } from "react";

import { api } from "@services/api";
import { storageGetUserSave, storageUserSave, storageUserRemove } from "@storage/storageUser";
import { storageAuthTokenGet, storageAuthTokenRemove, storageAuthTokenSave } from "@storage/storageAuthToken";

export type AuthContextDataProps = {
    user: UserDTO,
    signIn: (email: string, password: string) => Promise<void>,
    isLoadingUserStorageData: boolean,
    signOut: () => Promise<void>,
    updateUserProfile: (user:UserDTO) => Promise<void>
}
export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)


type AuthContextProviderProps = {
    children: React.ReactNode
}
export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [user, setUser] = useState<UserDTO>({} as UserDTO);
    const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);

    function userAndTokenUpdate(user: UserDTO, token: string) {
        setUser(user);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    async function signIn(email: string, password: string) {
        try {
            setIsLoadingUserStorageData(true);
            const { data } = await api.post("/sessions", { email, password })
            if (data.user && data.token && data.refresh_token) {
                await storageUserSave(data.user);
                await storageAuthTokenSave(data.token,data.refresh_token);
                userAndTokenUpdate(data.user, data.token);
            }
        } catch (error) {
            throw error;
        } finally {
            setIsLoadingUserStorageData(false);
        }
    }

    async function storageLoadUser() {
        try {
            const user: UserDTO = await storageGetUserSave();
            const {token} = await storageAuthTokenGet();
            if (token && user) {
                userAndTokenUpdate(user,token);
            }
        } catch (error) {
            throw error;
        } finally {
            setIsLoadingUserStorageData(false)
        }

    }

    function signOut() {
        try {
            setIsLoadingUserStorageData(true);
            setUser({} as UserDTO)
            storageUserRemove();
            storageAuthTokenRemove();
        } catch (error) {
            throw error;
        } finally {
            setIsLoadingUserStorageData(false);
        }
    }

    async function updateUserProfile (user: UserDTO) {
        try {
            setUser(user);
            await storageUserSave(user);
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        storageLoadUser();
    })

    useEffect(() => {
        const subscribe = api.registerInterceptTokenManager(signOut);

        return () => {
            subscribe();
        }
    },[signOut]);

    return <AuthContext.Provider value={{ user, signIn, isLoadingUserStorageData, signOut, updateUserProfile }}
    >
        {children}
    </AuthContext.Provider>
}