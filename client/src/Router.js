/**
 * The router that switches page content between components
 * @exports Router
 */
import { Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";

const Router = () => (
    <Switch>
        <Route exact path="/" component={Login}></Route>
        <Route exact path="/home" component={Home}></Route>
    </Switch>
);

export default Router;
