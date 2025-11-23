function Footer() {
    return (
        <footer class="bg-gradient-to-br from-gray-900 to-gray-800 text-white font-sans shadow-lg">
            <div class="max-w-7xl mx-auto px-5 py-10 flex flex-wrap justify-between gap-8">
                {/* Logo and About Section */}
                <div class="flex-1 min-w-[250px]">
                    <img
                        src="/images/settings/Logo-CEAR-1024x244.webp"
                        alt="CEAR LATINOAMERICANO"
                        class="max-w-[280px] h-auto mb-5 filter brightness-0 invert"
                    />
                    <p class="text-sm leading-relaxed text-gray-300 mb-5">
                        Centro especializado en arbitraje y resolución de
                        conflictos, comprometido con la excelencia académica y
                        profesional.
                    </p>
                    <div class="flex gap-4 mt-5">
                        {/* Social links would go here */}
                    </div>
                </div>

                {/* Contact Section */}
                <div class="flex-1 min-w-[250px]">
                    <h3 class="text-lg font-semibold mb-5 relative pb-2 text-center md:text-left">
                        Contacto
                        <span class="absolute left-0 md:left-0 bottom-0 w-12 h-0.5 bg-teal-400 md:left-0" />
                    </h3>
                    {/* <ul class="space-y-4">
                        <li class="flex items-start">
                            <FaPhoneAlt  className="text-teal-400 mr-3 mt-1 flex-shrink-0" />
                            <a
                                href="https://wa.me/51986605219"
                                class="text-gray-300 hover:text-teal-400 transition-colors"
                            >
                                (+51) 986 605 219
                            </a>
                        </li>
                        <li class="flex items-start">
                            <FaEnvelope class="text-teal-400 mr-3 mt-1 flex-shrink-0" />
                            <a
                                href="mailto:academico@cearlatinoamericano.edu.pe"
                                class="text-gray-300 hover:text-teal-400 transition-colors"
                            >
                                academico@cearlatinoamericano.edu.pe
                            </a>
                        </li>
                        <li class="flex items-start">
                            <FaMapMarkerAlt class="text-teal-400 mr-3 mt-1 flex-shrink-0" />
                            <span class="text-gray-300">
                                Av. Faustino Sánchez Carrión 615, Jesús María -
                                Oficina 306
                            </span>
                        </li>
                    </ul> */}
                    <a
                        href="/denuncias"
                        class="inline-block bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-full mt-4 transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg w-full text-center"
                    >
                        CANAL DE DENUNCIAS
                    </a>
                </div>

                {/* Map Section */}
                <div class="flex-1 min-w-[250px]">
                    <h3 class="text-lg font-semibold mb-5 relative pb-2 text-center md:text-left">
                        Ubicación
                        <span class="absolute left-0 md:left-0 bottom-0 w-12 h-0.5 bg-teal-400" />
                    </h3>
                    <div class="rounded-lg overflow-hidden shadow-md h-64">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15605.325726115054!2d-77.058149!3d-12.089448!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c91964b0b817%3A0xa1fb6b32a3fb8f9f!2sCentro%20de%20Arbitraje%20CEAR%20LATINOAMERICANO!5e0!3m2!1ses-419!2sus!4v1743206054397!5m2!1ses-419!2sus"
                            allowFullScreen
                            loading="lazy"
                            title="Mapa del centro de arbitraje"
                            referrerPolicy="no-referrer-when-downgrade"
                            class="w-full h-full border-0"
                        />
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div class="bg-black bg-opacity-20 py-5">
                <p class="text-sm text-gray-400 text-center">
                    &copy; {new Date().getFullYear()} CEAR LATINOAMERICANO.
                    Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
