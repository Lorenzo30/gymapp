import { UserDTO } from "@dtos/UserDTO";
import { createContext, useEffect, useState } from "react";

import { api } from "@services/api";
import { storageGetUserSave, storageUserSave, storageUserRemove } from "@storage/storageUser";
import { storageAuthTokenSave } from "@storage/storageAuthToken";

export type AuthContextDataProps = {
    user: UserDTO,
    signIn: (email: string, password: string) => Promise<void>,
    isLoadingUserStorageData: boolean,
    signOut: () => Promise<void>
}
export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)


type AuthContextProviderProps = {
    children: React.ReactNode
}
export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [user, setUser] = useState<UserDTO>({} as UserDTO);
    const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);

    async function storageUserAndToken(user: UserDTO, token: string) {
        try {
            setIsLoadingUserStorageData(true);
            api.defaults.headers.common['Authorization'] = `Bearer  ${token}`
            await storageUserSave(user);
            await storageAuthTokenSave(token);

        } catch (error) {
            throw error;
        } finally {
            setIsLoadingUserStorageData(false);
        }
    }

    async function signIn(email: string, password: string) {
        try {
            const { data } = await api.post("/sessions", { email, password })
            if (data.user && data.token) {
                setUser(data.user);
                storageUserAndToken(data.user, data.token);
            }
        } catch (error) {
            throw error;
        }
    }

    async function storageLoadUser() {
        try {
            const user: UserDTO = await storageGetUserSave();

            if (user) {
                setUser(user);
            }
        } catch (error) {
            throw error;
        } finally {
            setIsLoadingUserStorageData(false)
        }

    }

    async function signOut() {
        try {
            setIsLoadingUserStorageData(true);
            setUser({} as UserDTO)
            await storageUserRemove();
        } catch (error) {
            throw error;
        } finally {
            setIsLoadingUserStorageData(false);
        }
    }

    useEffect(() => {
        storageLoadUser();
    })

    return <AuthContext.Provider value={{ user, signIn, isLoadingUserStorageData, signOut }}
    >
        {children}
    </AuthContext.Provider>
}