import Hr from "@components/extras/hr";

function CompromiseAlumno() {
    return (
        <div>
            {" "}
            <h3 class="font-black text-3xl !text-center block mx-auto">
                COMPROMISO DEL ALUMNO
            </h3>
            <Hr className="my-4" />
            <p id="modal-contenido" class="!text-justify">
                Como alumno de este programa académico organizado por CEAR
                LATINOAMERICANO, me comprometo a cumplir con las siguientes
                disposiciones, entendiendo que estas condiciones aseguran una
                experiencia académica justa y acorde con los valores y
                principios del centro:
                <div class="my-2" />
                1. En primer lugar, reconozco que el cumplimiento de las cuotas
                de pago en los plazos establecidos es fundamental para mantener
                mi acceso al programa. En el caso de que no cumpla con dichos
                plazos, autorizo a la institución a suspender mi acceso al
                empresa virtual y, si la situación persiste, proceder con el
                retiro definitivo del programa.
                <div class="my-2" />
                2. Además, entiendo que si no realizo los pagos en los tiempos
                estipulados o decido retirarme mientras mantengo una deuda
                pendiente, CEAR LATINOAMERICANO está autorizado a reportar dicha
                deuda a INFOCORP.
                <div class="my-2" />
                3. Respecto a la asistencia a las clases, me comprometo a
                participar activamente en el programa. Acepto que, en caso de
                tener inasistencias injustificadas que superen el 30% de las
                sesiones programadas, el centro tiene el derecho de proceder con
                mi retiro definitivo del programa.
                <div class="my-2" />
                4. Al aceptar este compromiso, asumo de manera voluntaria el
                cumplimiento de los siguientes lineamientos:
                <div class="my-2" />
                <b>•</b>{" "}
                <a
                    href="https://cearlatinoamericano.edu.pe/assets/REGLAMENTO%20ACADÉMICO%202024-DR716bzi.pdf"
                    target="_blank"
                    rel="noreferrer"
                    class="text-primary"
                >
                    Reglamento Académico
                </a>
                <div class="my-2" />
                <b>•</b>{" "}
                <a
                    href="https://cearlatinoamericano.edu.pe/assets/REGLAMENTO-ETICO-Dm5Q8SpZ.pdf"
                    target="_blank"
                    rel="noreferrer"
                    class="text-primary"
                >
                    Reglamento Ético
                </a>
                <div class="my-2" />
                <b>•</b>{" "}
                <a
                    href="https://cearlatinoamericano.edu.pe/nosotros/#politicas"
                    target="_blank"
                    rel="noreferrer"
                    class="text-primary"
                >
                    Políticas de CEAR LATINOAMERICANO
                </a>
                <div class="my-2" />
                Me comprometo a respetar y aplicar estos lineamientos,
                contribuyendo activamente a un entorno académico de excelencia,
                integridad y respeto para todos.
                <div class="my-2" />
                5. Finalmente, me comprometo a actuar de acuerdo con la{" "}
                <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://cearlatinoamericano.edu.pe/politicas/PO-02-Politica-SGAS-V1-18.11.22.pdf"
                    style={{ color: "blue", fontWeight: "bold" }}
                >
                    Política Antisoborno
                </a>{" "}
                de CEAR LATINOAMERICANO. Entiendo que cualquier caso comprobado
                de soborno o intento de soborno resultará en mi retiro inmediato
                del programa, sin derecho a reembolso de los montos pagados
                hasta la fecha.
            </p>
        </div>
    );
}

export default CompromiseAlumno;
