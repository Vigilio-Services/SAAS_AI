import Button from "@components/extras/button";
import Dropdown from "@components/extras/dropdown";
import { VIGILIO_SERVICES_URL } from "@config/index";
import { useAuthContext } from "@contexts/auth.context";
import { useThemeContext } from "@contexts/theme.context";
import { useMediaQueryNoReactive } from "@hooks/useMediaQuery";
import { cn, sizeIcon } from "@libs/client/helpers";
import { useSignal } from "@preact/signals";
import {
    BarsIconLight,
    BellIconLight,
    BoxIconLight,
    ChevronDownIconLight,
    CircleUserIconLight,
    DollarSignIconLight,
    EnvelopeIconLight,
    GaugeIconLight,
    GearIconLight,
    MoonIconLight,
    RightFromBracketIconSolid,
    RobotIconLight,
    SunIconLight,
    UserIconLight,
    UsersIconLight,
    XIconLight,
} from "@vigilio/react-icons/fontawesome";
import { sweetAlert } from "@vigilio/sweet";
import { JSX } from "preact/jsx-runtime";
import { Link } from "wouter-preact";
import { users } from "..";

interface DashboardLayoutProps {
    children: JSX.Element | JSX.Element[];
}
function DashboardLayout({ children }: DashboardLayoutProps) {
    const authContext = useAuthContext();
    const themeContext = useThemeContext();
    // const notificationContext = useNotificationContext();
    const mediaQuery = useMediaQueryNoReactive("(min-width: 768px)");
    const isOpen = useSignal<boolean>(mediaQuery);
    const pathname = useSignal("/");
    const openSubmenu = useSignal<string | null>(null);
    interface Path {
        uri: string;
        title: string;
        ico?: JSX.Element;
        children?: Path[];
        disabled?: boolean;
    }
    function isActive(href: string, isStart = false) {
        return isStart
            ? pathname.value.startsWith(href)
            : pathname.value === href;
    }
    const navItems: Path[] = [
        {
            uri: "/",
            title: "Dashboard",
            ico: <GaugeIconLight {...sizeIcon.small} />,
        },
        {
            title: "Productos",
            uri: "/productos",
            ico: <BoxIconLight {...sizeIcon.small} />,
        },
        {
            title: "Usuarios",
            uri: "/usuarios",
            ico: <UsersIconLight {...sizeIcon.small} />,
        },
        {
            title: "Inteligencia Artificial",
            uri: "/ia",
            ico: <RobotIconLight {...sizeIcon.small} />,
        },
        {
            title: "Ganancias",
            uri: "/ganancias",
            ico: <DollarSignIconLight {...sizeIcon.small} />,
        },
        {
            title: "Mi perfil",
            uri: "/perfil",
            ico: <UserIconLight {...sizeIcon.small} />,
        },
        {
            title: "Configuración",
            uri: "/configuracion",
            ico: <GearIconLight {...sizeIcon.small} />,
            children: [
                {
                    title: "Métodos de pago",
                    uri: "/configuracion/metodos_pago",
                },
                {
                    title: "Seo y rastreamiento",
                    uri: "/configuracion/metodos_pago",
                },
                {
                    title: "Personalización",
                    uri: "/configuracion/personalizacion",
                },
            ],
        },
    ];

    return (
        <div class="flex">
            <div
                class={`bg-background border-r border-border   h-screen md:transition-all  md:duration-300 md:ease-in-out ${
                    isOpen.value
                        ? "w-full sm:w-[350px] fixed top-0 bottom-0 z-9999 md:relative md:top-auto md:bottom-auto"
                        : "w-0 overflow-hidden relative"
                }`}
            >
                <Button
                    type="button"
                    className=" md:hidden z-99!   absolute! top-2! right-2!  rounded-none fill-gray-400! flex items-center gap-2  "
                    onClick={() => {
                        isOpen.value = false;
                    }}
                    variant="ghost"
                >
                    {" "}
                    <XIconLight {...sizeIcon.large} />
                </Button>
                <div class="px-2 pb-2 pt-6 relative md:pt-4">
                    <Link href="/">
                        <img
                            class="mx-auto"
                            width={80}
                            height={80}
                            src="/settings/images/logo-ico.webp"
                            alt="logo empresa"
                            title="logo empresa"
                        />
                    </Link>
                </div>
                <div
                    className={`flex p-4 flex-col  gap-1 transition-all duration-300
          ${isOpen.value ? "" : "items-center"}
        `}
                >
                    {navItems.map((item) => (
                        <div key={item.uri} className="relative w-full ">
                            <div className="flex items-center">
                                <Link
                                    href={item.uri}
                                    className={cn(
                                        "py-3 px-3 flex text-sm font-semibold items-center group rounded-md gap-2  tracking-wide flex-1",
                                        isActive(
                                            `/dashboard${item.uri}`,
                                            true
                                        ) || pathname.value === item.uri
                                            ? "fill-primary text-primary dark:bg-white/10 bg-black/5"
                                            : "fill-black dark:fill-white hover:bg-white/10 hover:text-primary hover:fill-primary!"
                                    )}
                                    onClick={(e) => {
                                        if (item.disabled) {
                                            e.preventDefault();
                                            sweetAlert({
                                                title: "Muy pronto estará disponible esta sección.",
                                                icon: "info",
                                            });
                                        }
                                    }}
                                >
                                    {item.ico}
                                    <span>{item.title}</span>
                                    {item.children && (
                                        <button
                                            onClick={() => {
                                                openSubmenu.value =
                                                    openSubmenu.value ===
                                                    item.uri
                                                        ? null
                                                        : item.uri;
                                            }}
                                            className={cn(
                                                `p-2 absolute right-0 top-1 ${
                                                    pathname.value.startsWith(
                                                        `${item.uri}/`
                                                    )
                                                        ? ""
                                                        : ""
                                                } focus:outline-none group-hover:fill-primary`,
                                                pathname.value.startsWith(
                                                    `${item.uri}/`
                                                ) && ""
                                            )}
                                            type="button"
                                        >
                                            <ChevronDownIconLight
                                                className={cn(
                                                    "w-4 h-4 transition-transform",
                                                    openSubmenu.value ===
                                                        item.uri && "rotate-180"
                                                )}
                                            />
                                        </button>
                                    )}
                                </Link>
                            </div>

                            {/* Submenú desplegable debajo */}
                            {item.children && (
                                <div
                                    className={cn(
                                        "w-full bg-gray-45 rounded-b-md -top-1 relative overflow-hidden transition-all duration-300",
                                        openSubmenu.value === item.uri
                                            ? "max-h-96"
                                            : "max-h-0",
                                        !isOpen.value && "hidden!"
                                    )}
                                >
                                    {item.children.map((child) => (
                                        <Link
                                            key={child.uri}
                                            href={child.uri}
                                            className={cn(
                                                "block px-4 py-3 text-muted-foreground hover:bg-muted text-sm",
                                                pathname.value === child.uri &&
                                                    "bg-gray-200 "
                                            )}
                                            onClick={() => {
                                                pathname.value = child.uri;
                                                openSubmenu.value = null;
                                                isOpen.value = false; // opcional cerrar menú al click
                                            }}
                                        >
                                            {child.title}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div class="absolute bottom-4 flex left-2 right-2 p-2  flex-col gap-2">
                    <Button
                        type="button"
                        className="   rounded-lg!  font-bold!  items-center! gap-2! "
                        aria-label="logout"
                        variant="primary"
                        onClick={() => {
                            // localStorage.removeItem("access_token");
                            window.location.href = "/auth/logout";
                        }}
                    >
                        <span
                            class={cn(
                                isOpen.value && " md:flex!",
                                "gap-2 flex items-center"
                            )}
                        >
                            <RightFromBracketIconSolid {...sizeIcon.medium} />
                            <span>Cerrar sesión</span>
                        </span>
                    </Button>
                    <a
                        href={VIGILIO_SERVICES_URL}
                        target="_blank"
                        class="text-center opacity-60 font-light text-xs  py-1.5 px-4 text-foreground flex items-center justify-center fill-primary gap-2"
                    >
                        Powered by <b class="font-bold">Vigilio Services</b>
                    </a>
                </div>
            </div>
            <div class="w-full h-screen overflow-auto border-l border-border">
                <div class="flex justify-between py-2 px-2 items-center bg-background sticky top-0 z-999 border-b border-border">
                    <div class="flex gap-2">
                        <Button
                            variant="primary"
                            type="button"
                            onClick={() => {
                                isOpen.value = !isOpen.value;
                                if (isOpen.value) {
                                    localStorage.setItem(
                                        "interno-aside",
                                        "true"
                                    );
                                    return;
                                }
                                localStorage.setItem("interno-aside", "false");
                            }}
                            className="md:flex  hidden w-[40px] h-[40px]  justify-center rounded-full! items-center"
                        >
                            {isOpen.value ? (
                                <XIconLight {...sizeIcon.medium} />
                            ) : (
                                <BarsIconLight {...sizeIcon.medium} />
                            )}
                        </Button>
                    </div>
                    <div class="flex gap-2 items-center">
                        <Dropdown
                            triggerChildren={(props) => (
                                <Button
                                    type="button"
                                    className="rounded-full w-[40px] h-[40px] relative!"
                                    variant="ghost"
                                    onClick={props.onOpen}
                                >
                                    <EnvelopeIconLight {...sizeIcon.small} />
                                    {/* {(() => {
										const count =
											notificationContext.notificationCountEmailQuery.data
												?.count!;
										// si es menor que uno la cantidad de notificiones que se oculte
										if (count < 1) return null;
										return (
											<span class="bg-red-600 absolute top-1 right-1 w-[16px] h-[16px] rounded-full flex justify-center items-center text-xs text-white">
												{notificationContext.notificationCountEmailQuery
													.isLoading ? (
													<Loader size="sm" />
												) : count > 99 ? (
													"+99"
												) : (
													count
												)}
											</span>
										);
									})()} */}
                                </Button>
                            )}
                            isHover={false}
                            className="top-7 -left-20 md:left-auto"
                        >
                            {/* <Notificacions type="email" /> */}
                        </Dropdown>
                        <Dropdown
                            triggerChildren={(props) => (
                                <Button
                                    type="button"
                                    className="rounded-full relative! w-[40px] h-[40px]"
                                    variant="ghost"
                                    onClick={props.onOpen}
                                >
                                    <BellIconLight
                                        {...sizeIcon.small}
                                        className="fill-foreground"
                                    />

                                    {/* {(() => {
                                        const count =
                                            notificationContext
                                                .notificationCountQuery.data
                                                ?.count!;
                                        // si es menor que uno la cantidad de notificiones que se oculte
                                        if (count < 1) return null;
                                        return (
                                            <span class="bg-red-600 absolute top-1 right-1 w-[16px] h-[16px] rounded-full flex justify-center items-center text-xs text-white">
                                                {notificationContext
                                                    .notificationCountQuery
                                                    .isLoading ? (
                                                    <Loader size="sm" />
                                                ) : count > 99 ? (
                                                    "+99"
                                                ) : (
                                                    count
                                                )}
                                            </span>
                                        );
                                    })()} */}
                                </Button>
                            )}
                            isHover={false}
                            className="top-7 -left-20 md:left-auto"
                        >
                            {/* <Notificacions type="normal" /> */}
                        </Dropdown>
                        {/* <div class="grid grid-cols-3 gap-1  border border-gray-300 rounded-full min-h-[25px] px-2 py-1 w-[100px]">
                            <span
                                class="bg-[#00A135] h-[25px]   rounded-full "
                                onClick={() => {}}
                            />
                            <span class="bg-[#FFC400]   rounded-full " />
                            <span class="bg-[#FF3001]   rounded-full " />
                        </div> */}
                        <Button
                            type="button"
                            className="rounded-full w-[40px] h-[40px] relative!"
                            variant="outline"
                            onClick={() => {
                                themeContext.methods.changeThemeMode(
                                    themeContext.state === "dark"
                                        ? "light"
                                        : "dark"
                                );
                            }}
                        >
                            {themeContext.state === "dark" ? (
                                <SunIconLight {...sizeIcon.small} />
                            ) : (
                                <MoonIconLight {...sizeIcon.small} />
                            )}
                        </Button>
                        <Dropdown
                            className="top-[2.8rem] -left-8 max-w-[200px]"
                            triggerChildren={() => (
                                <div class="flex gap-2  items-center">
                                    <img
                                        width={80}
                                        className="rounded-full w-[45px] h-[45px] object-cover "
                                        height={80}
                                        src={
                                            // authContext.user?.photo
                                            //     ? printFileWithDimension(
                                            //           authContext.user?.photo,
                                            //           100
                                            //       )[0]
                                            //     : noprofilesmallimg
                                            users[0].photo![0]!.file
                                        }
                                        alt=""
                                    />
                                    <div class="flex flex-col">
                                        <span className="font-medium  m-0 text-sm">
                                            {authContext.user?.full_name}{" "}
                                            {authContext.user?.father_lastname}
                                        </span>
                                        <span class="text-gray-500 m-0 text-sm">
                                            {authContext.user?.email}
                                        </span>
                                    </div>
                                </div>
                            )}
                        >
                            <div class="">
                                <div>
                                    <Link
                                        href="/perfil"
                                        class="text-center font-bold py-1.5 text-sm px-4 text-primary flex items-center justify-center fill-primary gap-2"
                                    >
                                        <CircleUserIconLight
                                            {...sizeIcon.small}
                                        />
                                        Mi perfil
                                    </Link>
                                </div>
                                <div>
                                    <a
                                        href="/auth/logout"
                                        class="text-center font-bold text-sm  py-1.5 px-4 text-primary flex items-center justify-center fill-primary gap-2"
                                    >
                                        <RightFromBracketIconSolid
                                            {...sizeIcon.small}
                                        />
                                        Cerrar sesión
                                    </a>
                                </div>
                            </div>
                        </Dropdown>
                    </div>
                </div>
                <div class="p-4 xl:p-8 min-h-[calc(100vh-70px)] overflow-hidden">
                    {children}
                </div>
            </div>{" "}
            {/* message chat */}
            {/* <ButtonChat /> */}
        </div>
    );
}

export default DashboardLayout;
