import "vite/modulepreload-polyfill"; //https://vitejs.dev/guide/backend-integration
import "../assets/index.css";
import { lazy } from "preact/compat";
import "aos/dist/aos.css";
import "@vigilio/sweet/sweet.min.css";
import enviroments from "@config/client/environments.config";
import { render } from "@libs/client/preact";
import Sweet from "@vigilio/sweet";
import Aos from "aos";

// Init AOS to animate the page
Aos.init();

// sweet modal global
Sweet.modalConfig({
    confirmButtonText: "Aceptar",
    hiddeBackground: false,
    isCloseInBackground: false,
    showCancelButton: true,
    showConfirmButton: true,
    showCloseButton: true,
    text: "",
});

// importar admin NOSSR
render(
    "dashboard-index",
    lazy(() => import("./dashboard/routers/index"))
);

// web
// importar todas las páginas lazyloading y ignorar los que no
for (const [path, importFn] of Object.entries(
    import.meta.glob(
        ["./**/*.tsx", "!./**/dashboard/**/*.tsx", "!./components/**/*.tsx"],
        {
            eager: false,
        }
    )
)) {
    render(
        path.slice(1),
        lazy(() =>
            enviroments.VITE_ENV === "production"
                ? importFn().then((module) => ({
                      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                      default: (module as any).default,
                  }))
                : import(/* @vite-ignore */ path)
        )
    );
}
