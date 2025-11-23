/*
Configuración: No tocar. si tienes problema comunicarte en esta parte con vigilio
*/

import { AuthProvider } from "@contexts/auth.context";
import { EmpresaProvider } from "@contexts/empresa.context";
import { SocketProvider } from "@contexts/socket.context";
import { ThemeProvider } from "@contexts/theme.context";
import { c } from "@vigilio/sweet";
import {
    type FunctionComponent,
    type JSX,
    render as renderPreact,
} from "preact";
import { Suspense } from "preact/compat";
// import NotificationProvider from "@/notification/context/notification.context";
import { Path, PathValue, UseFormReturn } from "react-hook-form";

function Provider(
    el: Element,
    children: JSX.Element | JSX.Element[],
    fallback: null | JSX.Element | JSX.Element[] = null
) {
    //
    return renderPreact(
        <AuthProvider>
            <ThemeProvider>
                <EmpresaProvider>
                    <SocketProvider>
                        {/* <NotificationProvider> */}
                        <Suspense fallback={fallback}>{children}</Suspense>
                        {/* </NotificationProvider> */}
                    </SocketProvider>
                </EmpresaProvider>
            </ThemeProvider>
        </AuthProvider>,
        el
    );
}

export function render(
    element: string,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    Component: FunctionComponent<any>,
    fallback: null | JSX.Element | JSX.Element[] = null
) {
    function formatPath(routePath: string) {
        let formatted = routePath.startsWith("/")
            ? routePath
                  .toLowerCase()
                  .replaceAll(".tsx", "")
                  .replaceAll(".jsx", "")
                  .slice(1)
            : routePath
                  .toLowerCase()
                  .replaceAll(".tsx", "")
                  .replaceAll(".jsx", "");

        if (formatted === "index") return "index";
        const segments = formatted.split("/");
        const processedSegments = segments.map((segment) => {
            if (segment.startsWith(":")) {
                return `[${segment.slice(1)}]`;
            }
            return segment;
        });
        formatted = processedSegments.join("-");
        if (!formatted.endsWith("]") && !formatted.endsWith("index")) {
            formatted += "-index";
        }
        return formatted;
    }
    const name = formatPath(element);
    function escapeSelector(selector: string) {
        return selector.replace(/\[/g, "\\[").replace(/\]/g, "\\]");
    }

    const nameNumber = !Number.isNaN(Number(name[0]))
        ? `page-${name}`
        : name.startsWith("[")
        ? `page-${name.slice(1, -1)}-index`
        : name;

    const elements = document.querySelectorAll(escapeSelector(nameNumber));

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    let props: any = {};
    // biome-ignore lint/complexity/noForEach: <explanation>
    elements.forEach((el) => {
        if (el) {
            for (const [_key, value] of Object.entries(el?.attributes)) {
                const printValue: string = value.name.startsWith(":")
                    ? JSON.parse(value.value)
                    : value.value;
                const printName: string = value.name.startsWith(":")
                    ? value.name.slice(1)
                    : value.name;
                props = { ...props, [printName]: printValue };
            }
            Provider(el, <Component {...props} />, fallback);
        }
    });
}
export function setFormValues<T extends object>(
    form: UseFormReturn<T>,
    values: Partial<{ [K in Path<T>]: PathValue<T, K> }>
) {
    for (const [key, value] of Object.entries(values)) {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        form.setValue(key as Path<T>, value as any);
    }
}
export function reactComponent(
    children: JSX.Element | JSX.Element[],
    fallback: null | JSX.Element | JSX.Element[] = null,
    no_provider = false
) {
    const div = c("div", { className: "w-full text-start" });
    if (no_provider) {
        Provider(div, children, fallback);
    } else {
        renderPreact(children, div);
    }
    return div as HTMLElement;
}
