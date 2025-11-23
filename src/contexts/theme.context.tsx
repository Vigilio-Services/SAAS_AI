import { useSignal } from "@preact/signals";
import { createContext, JSX } from "preact";
import { useContext, useEffect } from "preact/hooks";

type ThemeMode = "light" | "dark" | "default";

export const themeContext = createContext(
    {} as {
        state: ThemeMode;
        methods: { changeThemeMode: (value: ThemeMode) => void };
    }
);

function getThemeLocalStorage() {
    let themeMode: ThemeMode = "default";
    if (localStorage.getItem("theme")) {
        themeMode = localStorage.getItem("theme") as ThemeMode;
    }

    return themeMode;
}
interface ThemeProviderProps {
    children: JSX.Element;
}
export function ThemeProvider({ children }: ThemeProviderProps) {
    const theme = useSignal(getThemeLocalStorage());
    function changeTheme(them: ThemeMode) {
        theme.value = them;
    }
    function changeThemeMode(value: ThemeMode) {
        if (value === theme.value) return;
        if (value === "default") {
            localStorage.removeItem("theme");
            changeTheme(value);
            return;
        }
        localStorage.setItem("theme", value);
        changeTheme(value);
    }
    function lightModeElement() {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
    }
    function darkModeElement() {
        document.documentElement.classList.remove("light");
        document.documentElement.classList.add("dark");
    }

    useEffect(() => {
        console.log({ value: theme.value });

        // if (
        //     // !storageEmpresa?.setting.isDark &&
        //     !window.location.pathname.startsWith("/admin")
        // ) {
        //     lightModeElement();
        //     localStorage.removeItem("theme");
        //     return;
        // }

        if (theme.value === "light") {
            lightModeElement();
            return;
        }

        if (theme.value === "default") {
            if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                darkModeElement();
                return;
            }
            lightModeElement();
            return;
        }
        darkModeElement();
    }, [theme.value]);

    return (
        <themeContext.Provider
            value={{
                state: theme.value,
                methods: {
                    changeThemeMode,
                },
            }}
        >
            {children}
        </themeContext.Provider>
    );
}

export const useThemeContext = () => useContext(themeContext);
