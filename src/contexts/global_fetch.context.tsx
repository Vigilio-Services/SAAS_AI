import { createContext, type JSX } from "preact";
import { useContext } from "preact/hooks";

type EmpresaStudentContext = {};
export const empresaStudentContext = createContext({} as EmpresaStudentContext);

interface EmpresaStudentContextProviderProps {
    children: JSX.Element | JSX.Element[];
}
export function EmpresaStudentContextProvider({
    children,
}: EmpresaStudentContextProviderProps) {
    // const empresaIndexQuery = empresaIndexApi();

    return (
        <empresaStudentContext.Provider
            value={
                {
                    // query: empresaIndexQuery,
                }
            }
        >
            {children}
        </empresaStudentContext.Provider>
    );
}
export const useEmpresaStudentContext = () => useContext(empresaStudentContext);
