import Alert from "@components/extras/alert";
import Aside from "@components/extras/aside";
import Avatar from "@components/extras/avatar";
import { Badge } from "@components/extras/badge";
import Breadcrumbs from "@components/extras/breadcrumbs";
import Button from "@components/extras/button";
import Cargando from "@components/extras/Cargando";
import Card from "@components/extras/card";
import Dropdown from "@components/extras/dropdown";
import EllipsisMenu from "@components/extras/ellipsis-button";
import Image from "@components/extras/image";
import { Progress } from "@components/extras/progress";
import Slider from "@components/extras/slider";
import Tabs from "@components/extras/tabs";
import Timeline from "@components/extras/timeline";
import Title from "@components/extras/title";
import Toast from "@components/extras/toast";
import Tooltip from "@components/extras/tooltip";
import YoutubeLite from "@components/extras/youtubeLite";
import Form from "@components/form";
import FormEditor from "@components/form/FormEditor";
import Table from "@components/table";
import { faker } from "@faker-js/faker";
import { sizeIcon } from "@libs/client/helpers";
import { reactComponent } from "@libs/client/preact";
import { useSignal } from "@preact/signals";
import { UserSchema } from "@services/user/schemas/user.schema";
import { useQuery } from "@vigilio/preact-fetching";
import { Columns, useTable } from "@vigilio/preact-table";
import {
    BagShoppingIconSolid,
    CakeSliceIconSolid,
    EnvelopeIconSolid,
    FileIconLight,
    LockIconSolid,
    PenIconLight,
    PlusIconLight,
    TrashIconLight,
    UserIconSolid,
} from "@vigilio/react-icons";
import { sweetAlert, sweetModal } from "@vigilio/sweet";
import { useEffect } from "preact/hooks";
import { useForm } from "react-hook-form";
import Accordion from "./components/Accordion";
import { Charts } from "./components/charts";
export const users: Pick<
    UserSchema,
    "full_name" | "mother_lastname" | "father_lastname" | "photo"
>[] = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    full_name: faker.person.firstName(),
    mother_lastname: faker.person.lastName(),
    father_lastname: faker.person.lastName(),
    photo: [
        {
            file: faker.image.avatar(),
            name: faker.person.firstName(),
            size: 100,
        },
    ],
}));
function DashboardPage() {
    const openAside = useSignal<boolean>(false);
    const stats = [
        {
            label: "Total Revenue",
            value: "$12,584",
            change: "+14.2%",
            icon: "💰",
        },
        { label: "Active Users", value: "2,543", change: "+23.1%", icon: "👥" },
        { label: "Total Orders", value: "1,234", change: "+4.3%", icon: "📦" },
        {
            label: "Conversion Rate",
            value: "3.24%",
            change: "+1.2%",
            icon: "📈",
        },
    ];

    const form = useForm({});
    function onStore(body) {}
    interface Pokemon {
        id: number;
        name: string;
        abilities: string[];
        stats: string[];
        photo_front: string;
        photo_back: string;
        enabled: boolean;
    }
    const columns: Columns<Pokemon, "index" | "acciones"> = [
        {
            key: "index",
            header: "N°",
            cell: (_, i) => i + 1,
        },
        {
            key: "photo_front",
            cell: (props) => (
                <div>
                    <Image
                        src={props.photo_front}
                        alt={props.name}
                        title={props.name}
                        size="sm"
                    />
                </div>
            ),
            header: "Imagen",
        },
        {
            key: "name",
            cell: (props) => props.name,
            header: "Nombre",
        },
        {
            key: "enabled",
            cell: (props) => (
                <Badge variant={props.enabled ? "primary" : "danger"}>
                    {props.enabled ? "Disponible" : "No disponible"}
                </Badge>
            ),
            header: "Disponibilidad",
            isSort: true,
        },
        {
            key: "abilities",
            cell: (props) => (
                <div class="flex gap-2">
                    {props.abilities.map((ability) => (
                        <Badge>{ability}</Badge>
                    ))}
                </div>
            ),
            header: "Habilidades",
        },

        {
            key: "acciones",
            header: "Acciones",
            cell(index) {
                return (
                    <div>
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => {}}
                            className="flex! gap-2! items-center! fill-blue-600! text-blue-600!  hover:text-blue-500! hover:fill-blue-500!"
                        >
                            <PenIconLight {...sizeIcon.small} />
                            Editar
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => {
                                console.log(index);
                            }}
                            className="flex! gap-2! items-center! fill-red-600 text-red-600! hover:text-red-500! hover:fill-red-500!"
                        >
                            <TrashIconLight {...sizeIcon.small} />
                            Eliminar
                        </Button>
                    </div>
                );
            },
        },
    ];
    const table = useTable({
        columns: columns,
        pagination: { limit: 5, offset: 0 },
    });
    const query = useQuery(
        "/pokemon",
        async (url) => {
            const data = new URLSearchParams();
            data.append("offset", String(table.pagination.value.offset));
            data.append("limit", String(table.pagination.value.limit));
            for (const [key, value] of Object.entries(table.sort.value)) {
                data.append(key, value);
            }
            const response = await fetch(
                `https://pokeapi.co/api/v2${url}?${data}`
            );
            const result = await response.json();
            return result;
        },
        {
            onSuccess: async (data) => {
                const result = await Promise.all(
                    (data.results as []).map(async (_, i) => {
                        const response = await fetch(
                            `https://pokeapi.co/api/v2/pokemon/${
                                table.pagination.value.offset + i + 1
                            }`
                        );
                        const result = await response.json();
                        return {
                            id: table.pagination.value.offset,
                            name: result.name,
                            abilities: result.abilities.map(
                                (ability) => ability.ability.name
                            ),
                            stats: result.stats.map((stat) => stat.stat.name),
                            photo_front: result.sprites.front_default,
                            photo_back: result.sprites.back_default,
                        };
                    })
                );
                table.updateData({
                    result,
                    count: data.count,
                });
            },
        }
    );

    useEffect(() => {
        query.refetch(false);
    }, [
        table.pagination.value.offset,
        table.pagination.value.limit,
        table.sort.value,
    ]);
    return (
        <div className="flex flex-col gap-4">
            {/* Header */}
            <Title
                title="Dashboard"
                subtitle="Welcome back to your SaaS platform"
            />
            {/* Stats grid */}
            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="p-6 bg-card border border-border rounded-lg
                   hover:shadow-lg hover:border-primary/50
                   transition-all duration-200"
                    >
                        <div className="flex items-start justify-between">
                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">
                                    {stat.label}
                                </p>
                                <p className="text-2xl font-bold text-foreground">
                                    {stat.value}
                                </p>
                            </div>
                            <span className="text-3xl text-foreground/80 fill-black dark:fill-white">
                                {stat.icon}
                            </span>
                        </div>

                        {/* Cambio respecto al período anterior */}
                        <p
                            className={`text-sm font-semibold mt-4 ${
                                stat.change.startsWith("+")
                                    ? "text-green-600 dark:text-green-400"
                                    : "text-red-600 dark:text-red-400"
                            }`}
                        >
                            {stat.change}
                        </p>
                    </div>
                ))}
            </div>
            <Charts />
            {/* COMPONENTS */}
            <Title title="Componentes" />
            <Card className="p-6 flex flex-col gap-4">
                <h3 class="text-lg font-semibold">Accordions</h3>
                <Accordion title="Accordion">
                    {/* Lista estilo “settings” */}
                    <div class="divide-y divide-border">
                        {/* Item 1 */}
                        <label class="group flex cursor-pointer items-center justify-between px-5 py-3.5 hover:bg-accent/50 transition-colors">
                            <span class="text-sm text-foreground">
                                Enable notifications
                            </span>
                            <input
                                type="checkbox"
                                class="accent-primary h-4 w-4 rounded"
                            />
                        </label>

                        {/* Item 2 */}
                        <button
                            type="button"
                            class="group flex w-full items-center justify-between px-5 py-3.5 hover:bg-accent/50 transition-colors"
                        >
                            <span class="text-sm text-foreground">
                                Appearance
                            </span>
                            <span class="text-xs text-muted-foreground">
                                System
                            </span>
                        </button>

                        {/* Item 3 */}
                        <button
                            type="button"
                            class="group flex w-full items-center justify-between px-5 py-3.5 hover:bg-accent/50 transition-colors"
                        >
                            <span class="text-sm text-foreground">Billing</span>
                            <span class="text-xs text-muted-foreground">
                                Pro plan
                            </span>
                        </button>

                        {/* Item 4 (destructivo) */}
                        <button
                            type="button"
                            class="group flex w-full items-center justify-between px-5 py-3.5 text-destructive hover:bg-destructive/10 transition-colors"
                        >
                            <span class="text-sm">Delete account</span>
                        </button>
                    </div>
                </Accordion>
                <Accordion title="¿Cómo funciona?">
                    <div class="px-5 pb-4 pt-2 text-sm text-muted-foreground leading-relaxed ">
                        <p>
                            Nuestra plataforma despliega tu código
                            automáticamente cada vez que haces push a la rama
                            principal.
                        </p>
                        <p>
                            No necesitas configurar servidores ni pipelines;
                            solo conecta tu repo y listo.
                        </p>
                        <p>
                            Si necesitas más ayuda, visita nuestra documentación
                            o escríbenos al chat.
                        </p>
                    </div>
                </Accordion>
            </Card>{" "}
            <Card className="p-6 flex flex-col gap-4">
                <h3 class="text-lg font-semibold">Alert</h3>
                <Alert
                    message=" This is a success alert"
                    type="success"
                    title="Success"
                />
                <Alert
                    message=" This is a error alert"
                    type="error"
                    title="Error"
                />
                <Alert
                    message=" This is a warning alert"
                    type="warning"
                    title="Warning"
                />
                <Alert
                    message=" This is a info alert"
                    type="info"
                    title="Info"
                />
            </Card>
            <Card className="p-6 flex flex-col gap-4">
                <h3 class="text-lg font-semibold">Aside</h3>
                <Button
                    variant="primary"
                    onClick={() => {
                        openAside.value = true;
                    }}
                    type="button"
                >
                    Abrir aside
                </Button>
                <Aside
                    isOpen={openAside.value}
                    onClose={() => {
                        openAside.value = false;
                    }}
                >
                    <p>Contenido del aside</p>
                </Aside>
            </Card>
            <Card className="p-6 flex flex-col gap-4">
                <h3 class="text-lg font-semibold">Avatar</h3>
                <div>
                    <div>
                        <Avatar user={users[0]} size="lg" status="online" />
                        <Avatar user={users[1]} size="lg" status="away" />
                        <Avatar user={users[2]} size="lg" status="busy" />
                        <Avatar user={users[3]} size="lg" status="offline" />
                        <Avatar user={users[4]} size="lg" />
                    </div>
                    <div>
                        <Avatar user={users[4]} size="xl" />
                        <Avatar user={users[3]} size="lg" status="away" />
                        <Avatar user={users[2]} size="md" status="away" />
                        <Avatar user={users[1]} size="sm" status="offline" />
                        <Avatar user={users[0]} size="xs" status="online" />
                    </div>
                </div>
            </Card>
            <Card className="p-6 flex flex-col gap-4">
                <h3 class="text-lg font-semibold">Badge</h3>
                <div class="flex gap-2 items-center">
                    <Badge variant="info">Info</Badge>
                    <Badge variant="default">Default</Badge>
                    <Badge variant="primary">Primary</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="danger">Danger</Badge>
                    <Badge variant="outline">Outline</Badge>
                </div>
            </Card>
            <Card className="p-6 flex flex-col gap-4">
                <h3 class="text-lg font-semibold">BreadCrumbs</h3>
                <div class="flex gap-2 items-center">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Dashboard", href: "/dashboard" },
                            {
                                label: "Componentes",
                                href: "/dashboard/components",
                            },
                        ]}
                    />
                </div>
            </Card>
            <Card className="p-6 flex flex-col gap-4">
                <h3 class="text-lg font-semibold">Button</h3>
                <div class="flex flex-col gap-2">
                    <div class="flex gap-2 items-center">
                        <Button variant="primary">Primary</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="success">Success</Button>
                        <Button variant="danger">Danger</Button>
                        <Button variant="outline">Outline</Button>
                    </div>
                    <div class="flex gap-2 items-center">
                        <Button variant="primary" size="sm">
                            Primary
                        </Button>
                        <Button variant="ghost" size="lg">
                            Ghost
                        </Button>
                        <Button variant="secondary" size="md">
                            Secondary
                        </Button>
                        <Button
                            variant="success"
                            loading
                            loading_title="Cargando.."
                        >
                            Success
                        </Button>
                        <Button variant="danger" disabled>
                            Danger
                        </Button>
                        <Button variant="outline">Outline</Button>
                    </div>
                </div>
            </Card>
            <Card className="p-6 flex flex-col gap-4">
                <h3 class="text-lg font-semibold">Card</h3>
                <div class="flex gap-3">
                    <Card className="max-w-[300px] w-full">
                        <Card.header>
                            <Card.title>Card Title</Card.title>
                        </Card.header>
                        <Card.content>
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Porro mollitia enim autem?
                                Eveniet harum accusamus veniam quae ipsum eaque
                                voluptatum!
                            </p>
                        </Card.content>
                        <Card.footer>
                            <p>Card Footer</p>
                        </Card.footer>
                    </Card>
                    <Card className="max-w-[250px] w-full">
                        <Card.header>
                            <Card.title as="h2" className="text-center!">
                                Card Title
                            </Card.title>
                        </Card.header>
                        <Card.content>
                            <Image
                                className="w-full!"
                                size="xxl"
                                src="https://m.media-amazon.com/images/I/B1pppR4gVKL._CLa%7C2140%2C2000%7C61loBko3ljL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_UY1000_.png"
                                alt="react js tshirt"
                                title="react js tshirt"
                            />
                        </Card.content>
                        <Card.footer>
                            <Button
                                type="button"
                                variant="primary"
                                className="flex gap-2 items-center"
                                fullWidth
                            >
                                <BagShoppingIconSolid {...sizeIcon.small} />
                                Buy
                            </Button>
                        </Card.footer>
                    </Card>
                    <Card>
                        <Card.header>
                            <Card.title>Card Title</Card.title>
                        </Card.header>
                        <Card.content>
                            <p>Card Content</p>
                        </Card.content>
                        <Card.footer>
                            <p>Card Footer</p>
                        </Card.footer>
                    </Card>
                </div>
            </Card>
            <Card className="p-6 flex flex-col gap-4">
                <h3 class="text-lg font-semibold">Cargando</h3>
                <div class="flex gap-3">
                    <Cargando />
                </div>
            </Card>
            <Card className="p-6 flex flex-col gap-4">
                <h3 class="text-lg font-semibold">Confirmar Modal</h3>
                <div class="flex gap-3">
                    <Button
                        onClick={() => {
                            sweetModal({
                                title: "Confirmar",
                                text: "¿Estas seguro de eliminar este elemento?",
                            });
                        }}
                        type="button"
                        variant="primary"
                    >
                        Confirmar Modal
                    </Button>
                    <Button
                        onClick={() => {
                            sweetAlert({
                                icon: "danger",
                                html: reactComponent(
                                    <Toast
                                        type="error"
                                        message="asdasd"
                                        title="Hay un error"
                                    />
                                ),
                                height: 80,
                                timer: 3,
                            });
                        }}
                        type="button"
                        variant="outline"
                    >
                        Confirmar a
                    </Button>
                </div>
            </Card>
            <Card className="p-6 flex flex-col gap-4">
                <h3 class="text-lg font-semibold">Dropdown</h3>
                <div class="flex gap-3">
                    <Dropdown
                        className="top-12! left-0!"
                        triggerChildren={(props) => {
                            return (
                                <Button
                                    onClick={props.onOpen}
                                    type="button"
                                    variant="primary"
                                >
                                    Abrir dropdown
                                </Button>
                            );
                        }}
                    >
                        <div class="flex flex-col">
                            <p class="py-2 px-2">Hola mundo</p>
                            <p class="py-2 px-2">Hola mundo</p>
                            <p class="py-2 px-2">Hola mundo</p>
                        </div>
                    </Dropdown>
                </div>
            </Card>
            <Card className="p-6 flex flex-col gap-4">
                <h3 class="text-lg font-semibold">Ellipsis button</h3>
                <div class="flex gap-3">
                    <EllipsisMenu size="medium">
                        <div class="flex flex-col">
                            <p class="py-2 px-2">Hola mundo</p>
                            <p class="py-2 px-2">Hola mundo</p>
                            <p class="py-2 px-2">Hola mundo</p>
                        </div>
                    </EllipsisMenu>
                </div>
            </Card>{" "}
            {/* <Toast
                message="asdasd"
                title="Hay un error"
                type="error"
                position="bottom-right"
                duration={1000000}
            /> */}
            <Card className="p-6 flex flex-col gap-4">
                <h3 class="text-lg font-semibold">Progress</h3>
                <div class="flex gap-3">
                    <Progress value={10} variant="danger" />
                    <Progress value={80} variant="warning" />
                    <Progress value={50} variant="success" />
                    <Progress size="md" value={50} variant="default" />
                </div>
            </Card>
            <Card className="p-6 flex flex-col gap-4">
                <h3 class="text-lg font-semibold">Slider</h3>
                <div class="flex gap-3">
                    <Slider
                        value={[1, 4, 5]}
                        onValueChange={(value) => console.log(value)}
                        max={10}
                        min={1}
                        step={1}
                        disabled={false}
                    />
                </div>
            </Card>
            <Card className="p-6 flex flex-col gap-4">
                <h3 class="text-lg font-semibold">Tabs</h3>
                <div class="flex gap-3">
                    <Tabs
                        activeTab="tab-1"
                        onTabChange={(tabId) => console.log(tabId)}
                        tabs={[
                            {
                                id: "tab-1",
                                label: "Tab 1",
                                content: <div>{faker.lorem.sentence(120)}</div>,
                                disabled: false,
                            },
                            {
                                id: "tab-2",
                                label: "Tab 2",
                                content: <div>{faker.lorem.sentence(120)}</div>,
                                disabled: false,
                            },
                            {
                                id: "tab-3",
                                label: "Tab 3",
                                content: <div>{faker.lorem.sentence(120)}</div>,
                                disabled: false,
                            },
                        ]}
                    />
                </div>
            </Card>
            <Card className="p-6 flex flex-col gap-4">
                <h3 class="text-lg font-semibold">Timeline</h3>
                <div class="flex gap-3">
                    <Timeline
                        items={[
                            {
                                id: "1",
                                title: "Titulo",
                                date: "Fecha",
                                description: "Descripción",
                                status: "completed",
                            },
                            {
                                id: "2",
                                title: "Titulo",
                                date: "Fecha",
                                description: "Descripción",
                                status: "current",
                            },
                            {
                                id: "3",
                                title: "Titulo",
                                date: "Fecha",
                                description: "Descripción",
                                status: "pending",
                            },
                        ]}
                    />
                </div>
            </Card>
            <Card className="p-6 flex flex-col gap-4">
                <h3 class="text-lg font-semibold">Tooltip</h3>
                <div class="flex gap-3">
                    <Tooltip content="Tooltip">
                        <Button variant="primary">Tooltip</Button>
                    </Tooltip>
                    <Tooltip content="Tooltip" position="top">
                        <Button variant="secondary">Tooltip</Button>
                    </Tooltip>
                    <Tooltip content="Tooltip" position="bottom">
                        <Button variant="outline">Tooltip</Button>
                    </Tooltip>
                    <Tooltip content="Tooltip" position="left">
                        <Button variant="danger">Tooltip</Button>
                    </Tooltip>
                    <Tooltip content="Tooltip" position="right">
                        <Button variant="success">Tooltip</Button>
                    </Tooltip>
                </div>
            </Card>
            <Card className="flex flex-col gap-4 p-6">
                <Title
                    title="Nuevo producto"
                    isPrimary
                    subtitle="Manage all product details and configurations"
                />
                <Tabs
                    tabs={[
                        {
                            id: "general_info",
                            label: "General info",
                        },
                        {
                            id: "pricing",
                            label: "Precio",
                        },
                        {
                            id: "characteristics",
                            label: "Caracterísiticas",
                        },
                        {
                            id: "images",
                            label: "Imagenes",
                        },
                        {
                            id: "Disponibilidad",
                            label: "enabled",
                        },
                    ]}
                    isCustomContent
                    onTabChange={() => {}}
                    activeTab="general_info"
                />
                <div class="w-full">
                    <Form {...form} onSubmit={onStore}>
                        <div class="grid grid-cols-2 gap-4">
                            <Form.control
                                ico={<UserIconSolid />}
                                name="name"
                                title="Nombre"
                                required
                                disabled
                            />
                            <Form.control
                                ico={<CakeSliceIconSolid />}
                                name="age"
                                title="Edad"
                                required
                                type="number"
                                options={{ setValueAs: Number }}
                            />
                            <Form.control
                                type="email"
                                ico={<EnvelopeIconSolid />}
                                name="email"
                                title="Correo Electrónico"
                                required
                            />
                            <Form.control
                                type="password"
                                ico={<LockIconSolid />}
                                name="password"
                                title="Contraseña"
                                required
                            />
                            <Form.control.select
                                array={[
                                    { key: 1, value: "Femenino" },
                                    { key: 2, value: "Masculino" },
                                ]}
                                placeholder="Seleccionar"
                                name="gender"
                                title="Genero"
                                required
                            />
                            <Form.control.toggle
                                name="is_disabled"
                                required
                                title="Disponibilidad"
                            />
                        </div>
                        <div>
                            <FormEditor name="editor" title="Editor" />
                            <FormEditor name="editor_2" title="Editor" />
                        </div>
                        <Form.control.file
                            name="image"
                            title="Archivo"
                            required
                        />
                        <div class="grid grid-cols-2 gap-4 items-center">
                            <Form.control.file
                                name="file"
                                title="Archivo"
                                required
                                fileNormal="normal"
                            />
                            <Form.control.file
                                name="file_2"
                                title=""
                                required
                                fileNormal="small"
                                smallContent={
                                    <Button
                                        type="button"
                                        className="flex items-center gap-2"
                                    >
                                        <FileIconLight {...sizeIcon.small} />
                                    </Button>
                                }
                            />
                        </div>
                        <Form.control.check
                            name="a"
                            title="Product Enabled"
                            subtitle="Main product status"
                        />
                        <Form.button.submit
                            title="Guardar"
                            isLoading
                            loading_title="Guardando..."
                        />
                    </Form>
                </div>
            </Card>
            <Card className="flex flex-col  p-6">
                <Table query={query} table={table}>
                    <div class="flex flex-col md:flex-row justify-between  gap-4 mb-6">
                        <Button
                            type="button"
                            variant="secondary"
                            className="flex items-center gap-2 md:w-auto! min-w-[120px]!"
                            onClick={() => {
                                // navigate("/users");
                            }}
                        >
                            <PlusIconLight {...sizeIcon.small} /> Nuevo pokemon
                        </Button>
                        <div class="flex gap-2 self-auto">
                            <Table.header.tools hiddenFetching />
                            <Table.header.refetch />
                        </div>
                    </div>
                    <Table.table>
                        <Table.thead>
                            <Table.thead.row>
                                <Table.thead.th />
                            </Table.thead.row>
                        </Table.thead>
                        <Table.tbody>
                            <Table.tbody.row title="No hay estudiantes">
                                {(data) => <Table.tbody.td data={data} />}
                            </Table.tbody.row>
                        </Table.tbody>
                    </Table.table>
                    <Table.footer>
                        <div class="flex flex-col md:flex-row justify-between gap-2 w-full items-center">
                            <div />
                            <div class="flex flex-col gap-2 justify-center items-center">
                                <Table.footer.paginator />
                                <Table.footer.show />
                            </div>
                            <Table.header.limit />
                        </div>
                    </Table.footer>
                </Table>
            </Card>
            <div class="flex flex-col gap-4">
                <h3 class="text-lg font-semibold">Youtube Lite</h3>
                <div class="w-full h-[200px]">
                    <YoutubeLite id="dQw4w9WgXcQ" title="Titulo" />
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;
