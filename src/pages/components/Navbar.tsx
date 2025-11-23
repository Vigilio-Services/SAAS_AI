// import { useEffect, useState, useRef } from "preact/hooks";
// import { JSXInternal } from "node_modules/preact/src/jsx";

// interface OpenMenus {
// 	programs: boolean;
// 	courses: boolean;
// 	diplomas: boolean;
// 	arbitros: boolean;
// 	adjudicadores: boolean;
// }

// export default function Navbar() {
// 	// Estados con tipado
// 	const [scrolled, setScrolled] = useState<boolean>(false);
// 	const [openSidebar, setOpenSidebar] = useState<boolean>(false);
// 	const [typePrograma, setTypePrograma] = useState<string | null>(
// 		"programa-de-formacion-de-arbitros",
// 	);
// 	const [openMenus, setOpenMenus] = useState<OpenMenus>({
// 		programs: false,
// 		courses: false,
// 		diplomas: false,
// 		arbitros: false,
// 		adjudicadores: false,
// 	});
// 	const programaEducacionIndexQuery = programaEducacionIndexApi(false);
// 	const programasEducacions = programaEducacionIndexQuery.data?.data;

// 	const cursos = programasEducacions
// 		?.find((programa) => programa.slug === typePrograma)
// 		?.cursos.filter((curso) => curso.type === "curso");

// 	const diplomados = programasEducacions
// 		?.find((programa) => programa.slug === typePrograma)
// 		?.cursos.filter((curso) => curso.type === "diplomado");

// 	// Referencias para los menús desplegables
// 	const programsMenuRef = useRef<HTMLLIElement>(null);
// 	const coursesMenuRef = useRef<HTMLLIElement>(null);
// 	const diplomasMenuRef = useRef<HTMLLIElement>(null);

// 	// Manejo del sidebar para móvil
// 	const handleOpenSidebar = () => {
// 		setOpenSidebar(true);
// 		document.body.style.overflow = "hidden";
// 	};

// 	const handleCloseSidebar = () => {
// 		setOpenSidebar(false);
// 		document.body.style.overflow = "auto";
// 		setOpenMenus({
// 			programs: false,
// 			courses: false,
// 			diplomas: false,
// 			arbitros: false,
// 			adjudicadores: false,
// 		});
// 	};

// 	// Funciones para manejar interacciones con menús
// 	const toggleMenu = (menu: keyof OpenMenus) => {
// 		setOpenMenus((prev) => {
// 			const newState = {
// 				...prev,
// 				[menu]: !prev[menu],
// 			};
// 			// Lógica especial para mantener programs abierto si se abre cursos/diplomas
// 			if ((menu === "courses" || menu === "diplomas") && !newState.programs) {
// 				newState.programs = true;
// 			}

// 			// Si cerramos programs, cerramos también sus submenús
// 			if (menu === "programs" && !newState.programs) {
// 				newState.courses = false;
// 				newState.diplomas = false;
// 			}

// 			return newState;
// 		});
// 	};

// 	// Manejo de navegación por teclado
// 	const handleKeyDown = (
// 		e: JSXInternal.TargetedKeyboardEvent<HTMLButtonElement>,
// 		menuType: keyof OpenMenus,
// 	) => {
// 		if (e.key === "Enter" || e.key === " ") {
// 			e.preventDefault();
// 			toggleMenu(menuType);
// 		}
// 		if (e.key === "Escape") {
// 			setOpenMenus({
// 				programs: false,
// 				courses: false,
// 				diplomas: false,
// 				arbitros: false,
// 				adjudicadores: false,
// 			});
// 		}
// 	};

// 	// Cierra los menús cuando se hace clic fuera de ellos
// 	useEffect(() => {
// 		const handleClickOutside = (event: MouseEvent) => {
// 			if (
// 				programsMenuRef.current &&
// 				!programsMenuRef.current.contains(event.target as Node)
// 			) {
// 				setOpenMenus((prev) => ({ ...prev, programs: false }));
// 			}
// 			if (
// 				coursesMenuRef.current &&
// 				!coursesMenuRef.current.contains(event.target as Node)
// 			) {
// 				setOpenMenus((prev) => ({ ...prev, courses: false }));
// 			}
// 			if (
// 				diplomasMenuRef.current &&
// 				!diplomasMenuRef.current.contains(event.target as Node)
// 			) {
// 				setOpenMenus((prev) => ({ ...prev, diplomas: false }));
// 			}
// 		};

// 		document.addEventListener("mousedown", handleClickOutside);
// 		return () => {
// 			document.removeEventListener("mousedown", handleClickOutside);
// 		};
// 	}, []);

// 	// Detectar scroll para cambiar apariencia del navbar
// 	useEffect(() => {
// 		const handleScroll = () => {
// 			setScrolled(window.scrollY > 50);
// 		};

// 		window.addEventListener("scroll", handleScroll);
// 		return () => window.removeEventListener("scroll", handleScroll);
// 	}, []);

// 	// Cargar datos de cursos al inicio

// 	// Restaurar overflow cuando se desmonta el componente
// 	useEffect(() => {
// 		return () => {
// 			document.body.style.overflow = "auto";
// 		};
// 	}, []);

// 	return (
// 		<div
// 			className={`fixed top-0 left-0 right-0 z-[100] bg-white py-4 px-4 shadow-md transition-all duration-300 ${
// 				scrolled ? "py-2.5 shadow-lg" : ""
// 			}`}
// 		>
// 			<div className="mx-auto w-[90%] max-w-[1400px] flex items-center justify-between">
// 				<div
// 					className="p-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-300 md:order-1 hidden md:block"
// 					onClick={handleOpenSidebar}
// 				>
// 					<img
// 						src="/icons/hamburger_icon.svg"
// 						alt="Menú"
// 						title="Abrir menú"
// 						width="24"
// 					/>
// 				</div>

// 				<div className="flex-shrink-0 transition-transform duration-300 hover:scale-105 md:order-2 md:mx-auto">
// 					<a href="/">
// 						<img
// 							src="/images/settings/LOGO-CEAR.png"
// 							alt="CEAR LATINOAMERICANO"
// 							title="CEAR LATINOAMERICANO"
// 							width={108}
// 						/>
// 					</a>
// 				</div>

// 				<div className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 md:order-3 hidden md:block">
// 					<a href="https://cearlatinoamericano.edu.pe/cursos/">
// 						<img src="/icons/cart.svg" alt="Carrito" width="32" />
// 					</a>
// 				</div>

// 				{/* Menú Desktop */}
// 				<div className="hidden md:flex items-center justify-center">
// 					<ul className="flex list-none m-0 p-0">
// 						<li className="mx-4">
// 							<a
// 								href="/"
// 								className="text-[#324a6d] font-medium text-sm tracking-wider py-2 hover:text-cyan-500 transition-colors duration-300"
// 							>
// 								INICIO
// 							</a>
// 						</li>
// 						<li className="mx-4">
// 							<a
// 								href="/nosotros"
// 								className="text-[#324a6d] font-medium text-sm tracking-wider py-2 hover:text-cyan-500 transition-colors duration-300"
// 							>
// 								NOSOTROS
// 							</a>
// 						</li>

// 						{/* Menú PROGRAMAS */}
// 						<li
// 							className={`relative ${openMenus.programs ? "active" : ""}`}
// 							ref={programsMenuRef}
// 						>
// 							<button
// 								type="button"
// 								onClick={(e) => {
// 									e.preventDefault();
// 									toggleMenu("programs");
// 								}}
// 								onKeyDown={(e) => handleKeyDown(e, "programs")}
// 								tabIndex={0}
// 								aria-haspopup="true"
// 								aria-expanded={openMenus.programs}
// 								className="text-[#324a6d] font-medium text-sm tracking-wider py-2 flex items-center hover:text-cyan-500 transition-colors duration-300 focus:outline-2 focus:outline-cyan-500 focus:outline-offset-4 focus:rounded"
// 							>
// 								PROGRAMAS
// 								<img
// 									src="/icons/arrow-down.svg"
// 									alt="Expandir menú"
// 									className={`w-3 h-3 ml-2 transition-transform duration-300 ${
// 										openMenus.programs ? "rotate-180" : ""
// 									}`}
// 								/>
// 							</button>

// 							{/* Submenú de Programas */}
// 							<ul
// 								className={`absolute top-full mt-2 bg-white shadow-lg rounded p-2 flex flex-col min-w-[200px] z-20 transition-all duration-300 ${
// 									openMenus.programs
// 										? "opacity-100 visible transform translate-y-0"
// 										: "opacity-0 invisible transform translate-y-2.5 pointer-events-none"
// 								}`}
// 								role="menu"
// 							>
// 								{cursos && cursos?.length > 0 && (
// 									<li
// 										className={`relative ${openMenus.courses ? "active" : ""}`}
// 										ref={coursesMenuRef}
// 									>
// 										<button
// 											type="button"
// 											onClick={(e) => {
// 												e.preventDefault();
// 												toggleMenu("courses");
// 											}}
// 											onKeyDown={(e) => handleKeyDown(e, "courses")}
// 											tabIndex={0}
// 											aria-haspopup="true"
// 											aria-expanded={openMenus.courses}
// 											className="py-2 px-4 text-[#324a6d] font-normal text-sm flex justify-between items-center hover:bg-gray-100 hover:text-cyan-500 transition-all duration-200 focus:outline-2 focus:outline-cyan-500 focus:outline-offset-[-2px]"
// 										>
// 											Cursos
// 											<img
// 												src="/icons/arrow-down.svg"
// 												alt="Expandir menú"
// 												className={`w-3 h-3 ml-2 transition-transform duration-300 ${
// 													openMenus.courses ? "rotate-180" : ""
// 												}`}
// 											/>
// 										</button>

// 										{/* Submenú de Cursos */}
// 										<ul
// 											className={`absolute top-0 left-full bg-white shadow-lg rounded p-2 flex flex-col min-w-[250px] max-w-[450px] max-h-[400px] overflow-y-auto z-30 transition-all duration-300 ${
// 												openMenus.courses
// 													? "opacity-100 visible transform translate-x-0"
// 													: "opacity-0 invisible transform translate-x-2.5 pointer-events-none"
// 											}`}
// 											role="menu"
// 										>
// 											{cursos?.map((curso) => (
// 												<li key={curso.slug}>
// 													<a
// 														href={`/${curso.slug}`}
// 														tabIndex={0}
// 														className="py-2 px-4 text-[#324a6d] font-normal text-sm hover:bg-gray-100 hover:text-cyan-500 transition-all duration-200  focus:outline-2 focus:outline-cyan-500 focus:outline-offset-[-2px]"
// 													>
// 														{curso.name}
// 													</a>
// 												</li>
// 											))}
// 										</ul>
// 									</li>
// 								)}

// 								{diplomados && diplomados?.length > 0 && (
// 									<li
// 										className={`relative ${openMenus.diplomas ? "active" : ""}`}
// 										ref={diplomasMenuRef}
// 									>
// 										<button
// 											type="button"
// 											onClick={(e) => {
// 												e.preventDefault();
// 												setTypePrograma("programa-de-formacion-de-arbitros");
// 												toggleMenu("diplomas");
// 											}}
// 											onKeyDown={(e) => handleKeyDown(e, "diplomas")}
// 											tabIndex={0}
// 											aria-haspopup="true"
// 											aria-expanded={openMenus.diplomas}
// 											className="py-2 px-4 text-[#324a6d] font-normal text-sm flex justify-between items-center hover:bg-gray-100 hover:text-cyan-500 transition-all duration-200 focus:outline-2 focus:outline-cyan-500 focus:outline-offset-[-2px]"
// 										>
// 											Programa de Formación de Árbitros
// 											<img
// 												src="/icons/arrow-down.svg"
// 												alt="Expandir menú"
// 												className={`w-3 h-3 ml-2 transition-transform duration-300 ${
// 													openMenus.diplomas ? "rotate-180" : ""
// 												}`}
// 											/>
// 										</button>

// 										{/* Submenú de Diplomados */}
// 										<ul
// 											className={`absolute top-0 left-full bg-white shadow-lg rounded p-2 flex flex-col min-w-[250px] max-w-[450px] max-h-[400px] overflow-y-auto z-30 transition-all duration-300 ${
// 												openMenus.diplomas
// 													? "opacity-100 visible transform translate-x-0"
// 													: "opacity-0 invisible transform translate-x-2.5 pointer-events-none"
// 											}`}
// 											role="menu"
// 										>
// 											{typePrograma &&
// 												cursos?.map((item) => (
// 													<li key={item.slug}>
// 														<a
// 															href={`/${item.slug}`}
// 															tabIndex={0}
// 															className="py-2 px-4 text-[#324a6d] font-normal text-sm hover:bg-gray-100 hover:text-cyan-500 transition-all duration-200  focus:outline-2 focus:outline-cyan-500 focus:outline-offset-[-2px]"
// 														>
// 															{item.name}
// 														</a>
// 													</li>
// 												))}
// 										</ul>
// 									</li>
// 								)}
// 							</ul>
// 						</li>

// 						<li className="mx-4">
// 							<a
// 								href="/para-instituciones"
// 								className="text-[#324a6d] font-medium text-sm tracking-wider py-2 hover:text-cyan-500 transition-colors duration-300"
// 							>
// 								PARA INSTITUCIONES
// 							</a>
// 						</li>
// 						<li className="mx-4">
// 							<a
// 								href="/contacto"
// 								className="text-[#324a6d] font-medium text-sm tracking-wider py-2 hover:text-cyan-500 transition-colors duration-300"
// 							>
// 								CONTACTO
// 							</a>
// 						</li>
// 					</ul>
// 				</div>

// 				<div className="hidden md:flex items-center">
// 					<a
// 						href="https://cearlatinoamericano.q10.com"
// 						title="Ingresa al empresa virtual"
// 						className="bg-cyan-500 text-white px-6 py-3 rounded-full font-medium tracking-wider shadow-md hover:bg-cyan-600 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
// 					>
// 						CAMPUS VIRTUAL
// 					</a>
// 				</div>
// 			</div>

// 			{/* Sidebar móvil */}
// 			<div
// 				className={`fixed top-0 left-0 h-screen w-screen bg-black/50 z-[200] transition-all duration-300 ${
// 					openSidebar ? "opacity-100 visible" : "opacity-0 invisible"
// 				}`}
// 				onClick={handleCloseSidebar}
// 			>
// 				<div
// 					className={`bg-white w-[300px] h-screen shadow-lg transform transition-transform duration-300 ${
// 						openSidebar ? "translate-x-0" : "-translate-x-full"
// 					} overflow-y-auto p-5 flex flex-col`}
// 					onClick={(e) => e.stopPropagation()}
// 				>
// 					<div
// 						className="text-right text-2xl text-[#324a6d] cursor-pointer p-2"
// 						onClick={handleCloseSidebar}
// 					>
// 						×
// 					</div>

// 					<ul className="list-none m-0 p-0">
// 						<li>
// 							<a
// 								href="/"
// 								onClick={handleCloseSidebar}
// 								className="py-3 px-5 flex items-center justify-between text-[#324a6d] font-medium hover:bg-gray-100 hover:border-l-4 hover:border-cyan-500 hover:text-cyan-500 transition-all duration-300"
// 							>
// 								INICIO
// 							</a>
// 						</li>
// 						<li>
// 							<a
// 								href="/nosotros"
// 								onClick={handleCloseSidebar}
// 								className="py-3 px-5 flex items-center justify-between text-[#324a6d] font-medium hover:bg-gray-100 hover:border-l-4 hover:border-cyan-500 hover:text-cyan-500 transition-all duration-300"
// 							>
// 								NOSOTROS
// 							</a>
// 						</li>
// 						<li>
// 							<a
// 								href="/programa-de-formacion-de-arbitros"
// 								onClick={handleCloseSidebar}
// 								className="py-3 px-5 flex items-center justify-between text-[#324a6d] font-medium hover:bg-gray-100 hover:border-l-4 hover:border-cyan-500 hover:text-cyan-500 transition-all duration-300"
// 							>
// 								PROGRAMA DE FORMACIÓN DE ÁRBITROS
// 							</a>
// 						</li>
// 						<li>
// 							<a
// 								href="/programa-de-formacion-de-adjudicadores"
// 								onClick={handleCloseSidebar}
// 								className="py-3 px-5 flex items-center justify-between text-[#324a6d] font-medium hover:bg-gray-100 hover:border-l-4 hover:border-cyan-500 hover:text-cyan-500 transition-all duration-300"
// 							>
// 								PROGRAMA DE FORMACIÓN DE ADJUDICADORES
// 							</a>
// 						</li>
// 						<li>
// 							<a
// 								href="/para-instituciones"
// 								onClick={handleCloseSidebar}
// 								className="py-3 px-5 flex items-center justify-between text-[#324a6d] font-medium hover:bg-gray-100 hover:border-l-4 hover:border-cyan-500 hover:text-cyan-500 transition-all duration-300"
// 							>
// 								PARA INSTITUCIONES
// 							</a>
// 						</li>
// 						<li>
// 							<a
// 								href="/contacto"
// 								onClick={handleCloseSidebar}
// 								className="py-3 px-5 flex items-center justify-between text-[#324a6d] font-medium hover:bg-gray-100 hover:border-l-4 hover:border-cyan-500 hover:text-cyan-500 transition-all duration-300"
// 							>
// 								CONTACTO
// 							</a>
// 						</li>
// 					</ul>

// 					<div className="m-4">
// 						<a
// 							href="https://cearlatinoamericano.q10.com"
// 							title="Ingresa al empresa virtual"
// 							onClick={handleCloseSidebar}
// 							className="bg-cyan-500 text-white px-5 py-3.5 rounded-full flex justify-center items-center font-medium tracking-wider shadow-md hover:bg-cyan-600 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
// 						>
// 							CAMPUS VIRTUAL
// 						</a>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }
