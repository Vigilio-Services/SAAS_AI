import { TipoEmpresaSchema } from "../schemas/tipo_empresa.schema";
import { TipoServicioSchema } from "../schemas/tipo_servicio.schema";

export const tipo_servicio_seeder: (TipoServicioSchema & {
    label: string;
    empresas: Omit<TipoEmpresaSchema, "tipo_servicio_id">[];
})[] = [
    {
        id: 1,
        value: "normal",
        label: "Negocios",
        empresas: [
            {
                id: 1,
                value: "Ropa para hombres / Ropa para mujeres, boutiques / Ropa para toda la familia",
            },
            {
                id: 2,
                value: "Ropa para niños y bebés / Ropa deportiva / Ropa y accesorios de cuero",
            },
            {
                id: 3,
                value: "Tiendas de tecnología / Tiendas por departamentos / Tiendas de descuento",
            },
            {
                id: 4,
                value: "Repuestos y accesorios / Telas y pasamanería / Tapicería",
            },
            { id: 5, value: "Revistas y periódicos / Utiles de oficina" },
            { id: 6, value: "Zapaterías" },
            { id: 7, value: "Telecomunicaciones, cabinas Internet" },
            {
                id: 8,
                value: "Tiendas de artículos varios / Ventas puerta a puerta",
            },
            { id: 9, value: "Vidrios, pinturas, tapices de pared / Viveros" },
            { id: 10, value: "Joyerías y relojerías" },
            { id: 11, value: "Librerías y papelerías" },
            { id: 12, value: "Otro" },
        ],
    },
    {
        id: 2,
        value: "restaurantes",
        label: "Restaurantes",
        empresas: [
            { id: 13, value: "Restaurantes / Bares" },
            { id: 14, value: "Cafeterías" },
            { id: 15, value: "Food-trucks / Venta de comida rápida" },
            { id: 16, value: "Otro" },
        ],
    },
    {
        id: 3,
        value: "servicios",
        label: "Servicios",
        empresas: [
            { id: 17, value: "Peluquería / Barbería / Sastrería" },
            {
                id: 18,
                value: "Spas y centros de estética / Salón de masajes / Servicios de bienestar",
            },
            { id: 19, value: "Consultorios médicos y dentales / Veterinarias" },
            {
                id: 20,
                value: "Gimnasios y entrenadores personales / Salones de billar / Salones de bowling",
            },
            {
                id: 21,
                value: "Streaming de entretenimiento / Servicios contables y auditoría / Asesorías y consultorías profesionales",
            },
            {
                id: 22,
                value: "Estudios fotográficos / Salones de tatuajes y piercing",
            },
            {
                id: 23,
                value: "Mantenimiento y reparación de celulares / Reparación de computadoras",
            },
            {
                id: 24,
                value: "Cerrajería / Servicios de mudanza / Limpieza del hogar",
            },
            { id: 25, value: "Otro" },
        ],
    },
    {
        id: 4,
        value: "portafolio",
        label: "Portafolio",
        empresas: [
            { id: 26, value: "Blog personal / Blog de viajes / Blog de moda" },
            {
                id: 27,
                value: "Blog de tecnología / Blog de cocina / Blog de negocios",
            },
            {
                id: 28,
                value: "Portafolio de diseño gráfico / Portafolio de fotografía",
            },
            {
                id: 29,
                value: "Portafolio de desarrollo web / Portafolio de arte / CV en línea",
            },
            { id: 30, value: "Otro" },
        ],
    },
];
