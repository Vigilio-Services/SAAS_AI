import { useSignal } from "@preact/signals";
import { createContext, JSX } from "preact";
import { useContext } from "preact/hooks";

export interface EmpresaContext {
    // files: Pick<FileSchema, "id" | "name" | "file">[];
    getFile: (name: string) => string;
    // updateFile: (files_body: Pick<FileSchema, "id" | "name" | "file">) => void;
}
export const empresaContext = createContext(
    {} as {} & EmpresaContext & typeof window.props
);

interface EmpresaProviderProps {
    children: JSX.Element | JSX.Element[];
}
export function EmpresaProvider({ children }: EmpresaProviderProps) {
    const initialValue = useSignal<typeof window.props>(window.props);
    return (
        <empresaContext.Provider
            value={{
                ...initialValue.value,
            }}
        >
            {children}
        </empresaContext.Provider>
    );
}
export const useEmpresaContext = () => useContext(empresaContext);
