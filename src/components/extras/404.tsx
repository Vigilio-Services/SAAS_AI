import { useEmpresaContext } from "@contexts/empresa.context";

function View404() {
    const empresaContext = useEmpresaContext();
    return (
        <img
            src={empresaContext.getFile("404")}
            width={800}
            height={800}
            title="404"
            alt="404"
        />
    );
}

export default View404;
