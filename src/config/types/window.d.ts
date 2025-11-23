import { EmpresaSchemaFromServer } from "@services/empresa/schemas/empresa.schema";

// Interfaces TypeScript para los tipos
interface VisanetCheckoutParams {
    channel: "web";
    email: "vigilioservicesperu@gmail.com";
    token: "15DCC4D94D444C849CC4D94D44AC841A";
    url: "";
}

interface VisanetCheckoutConfig {
    sessiontoken: string;
    channel: string;
    merchantid: string;
    purchasenumber: string | number;
    amount: number;
    expirationminutes: string;
    timeouturl: string;
    merchantlogo: string;
    formbuttoncolor: string;
    action: string;
    complete: (params: VisanetCheckoutParams) => void;
}

interface VisanetCheckout {
    configure: (config: VisanetCheckoutConfig) => void;
    open: () => void;
    configuration: {
        complete: (params: VisanetCheckoutParams) => void;
    };
}

declare global {
    interface Window {
        props: {
            empresa: EmpresaSchemaFromServer;
        };
        VisanetCheckout: VisanetCheckout;
    }
}
