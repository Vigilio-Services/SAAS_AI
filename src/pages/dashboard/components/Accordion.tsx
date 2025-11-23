import { useSignal } from "@preact/signals";
import { ChevronDownIconSolid } from "@vigilio/react-icons/fontawesome";
import type { JSX } from "preact/jsx-runtime";

interface AccordionProps {
    children: JSX.Element | JSX.Element[];
    defaultValue?: boolean;
    title: string;
    id?: string; // opcional, para aria-controls
}

export default function Accordion({
    children,
    title,
    defaultValue = false,
    id,
}: AccordionProps) {
    const isOpen = useSignal(defaultValue);
    const panelId = id ?? `panel-${Math.random().toString(36).slice(2)}`;

    return (
        <div class="w-full rounded-lg border border-border hover:border-primary bg-card shadow-sm">
            {/* Header */}
            <button
                type="button"
                class="group flex w-full items-center justify-between px-4 py-3"
                aria-expanded={isOpen.value}
                aria-controls={panelId}
                onClick={() => {
                    isOpen.value = !isOpen.value;
                }}
            >
                <span class="text-sm font-semibold tracking-wide text-foreground">
                    {title}
                </span>

                {/* Icono que rota */}
                <span
                    class={`grid h-5 w-5 place-items-center text-muted-foreground transition-transform duration-300 ${
                        isOpen.value ? "rotate-180" : ""
                    }`}
                >
                    <ChevronDownIconSolid class="h-3 w-3" />
                </span>
            </button>

            {/* Contenido con transición fluida */}
            <div
                id={panelId}
                class={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen.value ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
            >
                <div class="min-h-0">
                    <div class="px-4 pb-4 pt-2 text-sm text-muted-foreground">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
