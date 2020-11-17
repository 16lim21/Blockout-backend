/**
 * The router that switches page content between components
 * @exports Router
 */
import { Switch, Route } from "react-router-dom";
import Login from "./pages/Login";

const Router = () => (
    <Switch>
        <Route exact path="/" component={Login}></Route>
    </Switch>
);

export default Router;
