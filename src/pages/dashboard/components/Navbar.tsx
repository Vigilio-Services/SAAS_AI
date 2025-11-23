import { useSignal } from "@preact/signals";
import { ChevronLeftIconSolid } from "@vigilio/react-icons/fontawesome";
import { useEffect } from "preact/hooks";
import { useLocation } from "wouter-preact";

interface NavbarProps {
	title: string;
	customBack?: () => void;
}
function Navbar({ title, customBack }: NavbarProps) {
	const [location, setLocation] = useLocation();
	const tieneHistorial = useSignal(false);
	useEffect(() => {
		tieneHistorial.value = window.history.state?.idx > 0;
	}, [location]);

	function goOnBack() {
		if (tieneHistorial) {
			window.history.back();
		} else {
			setLocation("/");
		}
	}
	return (
		<div class="flex gap-2 items-center">
			<button
				onClick={customBack ? customBack : goOnBack}
				type="button"
				aria-label="onback"
			>
				<ChevronLeftIconSolid class="w-[25px] h-[25px]" />
			</button>
			<h3 class="text-xl md:text-2xl font-bold before:content-[''] w-full max-w-[400px] relative before:w-full before:h-[2px] before:bg-black before:absolute before:-bottom-0.5 text-justify">
				{title}
			</h3>
		</div>
	);
}

export default Navbar;
