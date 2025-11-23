import View404 from "@components/extras/404";
import { lazy, Suspense } from "preact/compat";
import { Route, Router, Switch } from "wouter-preact";
import DashboardLayout from "../components/DashboardLayout";

function App() {
    return (
        <Router base="/dashboard">
            <DashboardLayout>
                <Suspense fallback={null}>
                    <Switch>
                        <Route path="/" component={lazy(() => import(".."))} />
                        <Route
                            path="/configuracion"
                            component={lazy(() => import("../configuracion"))}
                        />
                        <Route
                            path="/configuracion/metodos_pago"
                            component={lazy(
                                () => import("../configuracion/metodos_pago")
                            )}
                        />
                        <Route
                            path="/configuracion/personalizacion"
                            component={lazy(
                                () => import("../configuracion/personalizacion")
                            )}
                        />
                        <Route>
                            <View404 />
                        </Route>
                    </Switch>
                </Suspense>
            </DashboardLayout>
        </Router>
    );
}
export default App;
