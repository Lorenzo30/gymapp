import { UserDTO } from "@dtos/UserDTO";
import { createContext, useEffect, useState } from "react";

import { api } from "@services/api";
import { storageGetUserSave, storageUserSave } from "@storage/storageUser";
import { err } from "react-native-svg/lib/typescript/xml";

export type AuthContextDataProps = {
    user: UserDTO,
    signIn: (email: string, password: string) => Promise<void>,
    isLoadingUserStorageData: boolean
}
export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)


type AuthContextProviderProps = {
    children: React.ReactNode
}
export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [user, setUser] = useState<UserDTO>({} as UserDTO);
    const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);

    async function signIn(email: string, password: string) {
        try {
            const { data } = await api.post("/sessions", { email, password })
            if (data.user) {
                setUser(data.user);
                storageUserSave(data.user);
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

    useEffect(() => {
        storageLoadUser();
    })

    return <AuthContext.Provider value={{ user, signIn, isLoadingUserStorageData }}
    >
        {children}
    </AuthContext.Provider>
}