import type { RequestVigilio } from "@config/server/const";
import {
    Controller,
    Get,
    Injectable,
    Query,
    Req,
    Res,
} from "@vigilio/express-core";
import type { Response } from "express";
import { render } from "../libs";
import { WebService } from "../service/web.service";

@Injectable()
@Controller("/")
export class WebController {
    constructor(private readonly webService: WebService) {}

    @Get("/")
    async home(@Req() req: RequestVigilio, @Res() res: Response) {
        const props = await this.webService.home();
        return await render({
            head: { title: "Home" },
            props,
        })(req, res);
    }

    @Get("/nosotros")
    async nosotros(@Req() req: RequestVigilio, @Res() res: Response) {
        return await render({
            head: { title: "Nosotros" },
        })(req, res);
    }

    @Get("/404")
    async page404(
        @Req() req: RequestVigilio,
        @Res() res: Response,
        @Query("message") message: string
    ) {
        res.statusCode = 404;
        return await render({
            head: { title: "Opps.. 404, CEAR LATINOAMERICANO " },
            props: {
                message: message || "Página no encontrada",
            },
        })(req, res);
    }

    @Get("/500")
    async page500(@Req() req: RequestVigilio, @Res() res: Response) {
        res.statusCode = 500;
        return res.send(
            render({ head: { title: "Opps.. 500, CEAR LATINOAMERICANO " } })(
                req,
                res
            )
        );
    }
    @Get("/dashboard*")
    async Dashboard(@Req() req: RequestVigilio, @Res() res: Response) {
        return res.send(render({ head: { title: "Dashboard" } })(req, res));
    }
}
