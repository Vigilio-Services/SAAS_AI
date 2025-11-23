import { UserAuth } from "@services/auth/dtos/auth.dto";
import { UserSchema } from "@services/user/schemas/user.schema";
import { createContext, type JSX } from "preact";
import { useContext, useState } from "preact/hooks";

export const authContext = createContext(
    {} as {
        user: UserAuth | null;
        onChangeUserData: (body: Partial<UserAuth>) => void;
        jwtAuth?: (roles: UserSchema["role"][]) => boolean;
    }
);

interface AuthProviderProps {
    children: JSX.Element | JSX.Element[];
}
export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserAuth | null>(
        window.props.user || null
    );

    function jwtAuth(roles: UserSchema["role"][]) {
        return roles.includes(user!.role as UserSchema["role"]);
    }
    function onChangeUserData(body: Partial<UserAuth>) {
        setUser((val) => ({ ...(val as UserAuth), ...body }));
    }

    return (
        <authContext.Provider
            value={{
                user: user,
                onChangeUserData,
                jwtAuth,
            }}
        >
            {children}
        </authContext.Provider>
    );
}
export const useAuthContext = () => useContext(authContext);
