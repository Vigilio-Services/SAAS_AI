// helpers para cliente y servidor (Server)

import { coerce, date, object, optional } from "@vigilio/valibot";
import dayjs, { OpUnitType, QUnitType } from "dayjs";
import "dayjs/locale/es";
import { noimagefound } from "@config/index";
import { EmpresaSchemaFromServer } from "@services/empresa/schemas/empresa.schema";
import { FileSchemaToClient } from "@services/empresa/schemas/file.schema";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(relativeTime);
dayjs.locale("es");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);

export const timezoneDefault =
    // @ts-expect-error
    typeof window !== "undefined" ? window.props.empresa.timezone : null;

/* delay */
export async function delay(seg = 10) {
    return new Promise((res) => setTimeout(() => res(true), seg * 1000));
}

/*** random number between*/
export function randomNumber(start: number, end: number) {
    return Math.floor(Math.random() * (end - start + 1)) + start;
}

export function removeTextHTML(value: string) {
    return value.replace(/(<([^>]+)>)/gi, "");
}

// SECURIDAD - AL ENDPOINT
export async function generateSignature(method: string, path: string) {
    const timestamp = Date.now();
    const dataToSign = `${timestamp}:${method}:${path}`;
    return {
        signature: (await generateHMAC(dataToSign, "SECRET_KEY")).toString(),
        timestamp: timestamp.toString(),
    };
}

// GENERAR HMAC
async function generateHMAC(message: string, secretKey: string) {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secretKey);
    const messageData = encoder.encode(message);
    const key = await crypto.subtle.importKey(
        "raw",
        keyData,
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
    );
    const signature = await crypto.subtle.sign("HMAC", key, messageData);
    const hex = Array.from(new Uint8Array(signature))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

    return hex;
}

/**
 * Normaliza un texto para hacerlo compatible con nombres de archivo:
 * - Elimina tildes y caracteres diacríticos
 * - Reemplaza espacios con guiones
 * - Elimina caracteres especiales no permitidos
 * - Convierte a minúsculas (opcional)
 *
 * @param texto El texto a normalizar
 * @param convertirMinusculas Si se convierte todo a minúsculas (true por defecto)
 * @returns El texto normalizado
 */
export function slugify(texto: string, convertirMinusculas = true): string {
    // Paso 1: Eliminar tildes y diacríticos
    let normalizado = texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    // Paso 2: Reemplazar espacios y guiones bajos con un solo guion
    normalizado = normalizado.replace(/[\s_]+/g, "-");
    // Paso 3: Eliminar caracteres especiales no permitidos (excepto guiones y puntos)
    normalizado = normalizado.replace(/[^a-zA-Z0-9\-.]/g, "");
    // Paso 4: Eliminar múltiples guiones consecutivos
    normalizado = normalizado.replace(/-+/g, "-");
    // Paso 5: Eliminar guiones al inicio y final
    normalizado = normalizado.replace(/^-+|-+$/g, "");

    // Opcional: Convertir a minúsculas
    if (convertirMinusculas) {
        normalizado = normalizado.toLowerCase();
    }
    return normalizado;
}
// REGEX
export const DNI_REGEX = /^[0-9]{8}$/;
export const RUC_REGEX = /^(10|20)[0-9]{9}$/;
export const CARNET_EXTRANJERO1_REGEX = /^[PEpe][0-9]{8}$/i;
export const CARNET_EXTRANJERO2_REGEX = /^[A-Za-z]{1,2}[0-9]{6,9}$/;
export const PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const COLOR_REGEX =
    /^(#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})|(rgb|hsl)a?\(\s*((\d{1,3}%?\s*,\s*){2}\d{1,3}%?|\d{1,3}%?\s+\d{1,3}%?\s+\d{1,3}%?)(\s*,\s*[01]?\.?\d+)?\s*\))$/;

export const SVG_REGEX = /<\s*svg\b/i;
export const POSIVES_NUMERIC_REGEX = /^\d+$/;
//

export const timestampsObject = object({
    created_at: optional(coerce(date(), (value) => new Date(value as string))),
    updated_at: optional(coerce(date(), (value) => new Date(value as string))),
});

// numero a romano
export function numeroARomano(num: number): string {
    if (typeof num !== "number" || num < 1 || num > 3999) {
        throw new Error("El número debe estar entre 1 y 3999");
    }

    const valores: [number, string][] = [
        [1000, "M"],
        [900, "CM"],
        [500, "D"],
        [400, "CD"],
        [100, "C"],
        [90, "XC"],
        [50, "L"],
        [40, "XL"],
        [10, "X"],
        [9, "IX"],
        [5, "V"],
        [4, "IV"],
        [1, "I"],
    ];

    let romano = "";
    let resto = num;

    for (const [valor, simbolo] of valores) {
        while (resto >= valor) {
            romano += simbolo;
            resto -= valor;
        }
    }

    return romano;
}

// RANDOM STRING
export function randomId() {
    return Math.random().toString(32) + Date.now().toString(32);
}

export function getHour(
    date: Date | string,
    empresa: EmpresaSchemaFromServer | null = null
): string {
    return dayjs(date)
        .tz(empresa?.timezone || timezoneDefault!)
        .format("HH:mm")
        .slice(0, 5);
}

/**
 * Converts bytes to human-readable file size string
 *
 * @param bytes - The file size in bytes
 * @param decimals - Number of decimal places to show (default: 2)
 * @returns Formatted file size string with appropriate unit
 */
export function formatFileSize(bytes: number, decimals = 2): string {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    // Handle Bytes case differently (no decimals)
    if (i === 0) return `${bytes} ${sizes[i]}`;

    return `${Number.parseFloat((bytes / k ** i).toFixed(decimals))} ${
        sizes[i]
    }`;
}

// dayjs
export function formatDate(
    date: Date,
    empresa: EmpresaSchemaFromServer | null = null
) {
    return dayjs(date).tz(empresa?.timezone || timezoneDefault!);
}
export function formatDateTz(
    date: Date,
    // format = "D [de] MMMM [de] YYYY, hh:mm A",
    format = "DD/MM/YYYY, HH:mm A",
    empresa: EmpresaSchemaFromServer | null = null
) {
    return dayjs(date)
        .tz(empresa?.timezone || timezoneDefault!)
        .format(format);
}

export function base64_encode(str: string) {
    return Buffer.from(str).toString("base64");
}

export function formatDateUTC(
    date: Date | string,
    format = "DD/MM/YYYY, HH:mm A"
) {
    return dayjs(date).utc().format(format);
}

export function formatDateTzUTC(
    date: Date | string,
    empresa: EmpresaSchemaFromServer | null = null
) {
    return dayjs(date).tz(empresa?.timezone || timezoneDefault!);
}

// 21-10-1998
export function formatInput(date: Date) {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

export function time(
    date: Date,
    empresa: EmpresaSchemaFromServer | null = null
) {
    return dayjs(date).tz(empresa?.timezone || timezoneDefault!);
}
export function now(empresa: EmpresaSchemaFromServer | null = null) {
    return dayjs().tz(empresa?.timezone || timezoneDefault!);
}
type FilterPredicate<T> = (item: T, index: number, array: T[]) => boolean;

//  reduce + mapa es más rápido que filter anidado porque evita recorridos múltiples (O(n) vs O(n²)) y permite accesos instantáneos (O(1)) a los datos agrupados., filter usar para pequeños arrays
export function filterWithReduce<T>(
    array: T[],
    predicate: FilterPredicate<T>
): T[] {
    return array.reduce<T[]>((acc, current, index, original) => {
        predicate(current, index, original) && acc.push(current);
        return acc;
    }, []);
}
export function groupBy<T, K extends string | number>(
    array: T[],
    keyFn: (item: T) => K
): Record<K, T[]> {
    return array.reduce((acc, item) => {
        const key = keyFn(item);
        // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
        (acc[key] = acc[key] || []).push(item);
        return acc;
    }, {} as Record<K, T[]>);
}

// formatoTemporizadorFlexible , pasas minutos y te da el formato que quieras
export function formatoTemporizadorFlexible(
    minutos: number,
    segundos = 0,
    formato = "HH:MM:SS"
) {
    // Convertimos todo a segundos y redondeamos para evitar decimales
    const totalSegundos = Math.floor(minutos * 60 + segundos);

    const horas = Math.floor(totalSegundos / 3600);
    const mins = Math.floor((totalSegundos % 3600) / 60);
    const secs = totalSegundos % 60; // ya es entero

    const valores = {
        HH: horas.toString().padStart(2, "0"),
        H: horas.toString(),
        MM: mins.toString().padStart(2, "0"),
        M: mins.toString(),
        SS: secs.toString().padStart(2, "0"),
        S: secs.toString(),
        hh: (horas % 12 || 12).toString().padStart(2, "0"),
        h: (horas % 12 || 12).toString(),
    };

    return formato.replace(
        /HH|H|MM|M|SS|S|hh|h/g,
        (match: string) => valores[match as keyof typeof valores]
    );
}
export function showTime(
    date: Date | string,
    empresa: EmpresaSchemaFromServer | null = null
) {
    return dayjs()
        .tz(empresa?.timezone || timezoneDefault!)
        .to(date);
}
// dimension solo es valido para imagenes
export function printFileWithDimension(
    files: { file: string; dimension?: number }[] | null,
    dimension: number | null = null,
    custom_file_no_found: string | null = null
) {
    if (!files) {
        return [custom_file_no_found || noimagefound];
    }
    const filterImages = dimension
        ? files.filter(
              (img) =>
                  img.file?.startsWith("https://") ||
                  img.dimension === dimension
          )
        : files;

    return filterImages.map((file) =>
        file.file!.startsWith("https://")
            ? file.file
            : `/cear_latinoamericano/${file.file}`
    );
}
export function capitalize(str: string) {
    if (typeof str !== "string" || str.length === 0) {
        return str; // Devuelve el valor original si no es string o está vacío
    }
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function sumarNumeros(numeros: number[]): number {
    return numeros.reduce((acumulador, actual) => acumulador + actual, 0);
}
// DIFRENCIAS si es numero negativo ya paso el diam si es positivo quiero decir que falta esos
export function diferenciaEnDias(
    fechaObjetivo: Date,
    time: QUnitType = "second",
    empresa: EmpresaSchemaFromServer | null = null
) {
    const ahora = dayjs().tz(empresa?.timezone || timezoneDefault!);
    const fecha = dayjs(fechaObjetivo).tz(
        empresa?.timezone || timezoneDefault!
    );
    return fecha.diff(ahora, time);
}
export function getFile(name: string, files: FileSchemaToClient[]) {
    const file = files.find((file) => file.name === name);
    if (!file) {
        // biome-ignore lint/suspicious/noConsole: <explanation>
        console.error(`File ${name} not found`);
        return noimagefound;
    }
    return printFileWithDimension(file.file, null)[0];
}
export function calcularDescuento(price: number, discount: number) {
    const descuento = (price * discount) / 100;
    const precioFinal = price - descuento;

    return precioFinal;
}

export function subtotal(price: number, discount: number, increase = false) {
    if (increase) {
        return price + (discount * price) / 100;
    }
    return price - (discount * price) / 100;
}
export function restarDays(
    now: Date | string | number | dayjs.Dayjs,
    back: Date | string | number | dayjs.Dayjs,
    time: QUnitType | OpUnitType = "minute",
    empresa: EmpresaSchemaFromServer | null = null
) {
    return dayjs(back)
        .tz(empresa?.timezone || timezoneDefault!)
        .diff(now, time);
}
export default dayjs;
