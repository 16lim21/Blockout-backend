import { Switch, Route } from "react-router-dom";
import Login from "./Login";

const Main = () => (
    <Switch>
        <Route path="/" component={Login}></Route>
    </Switch>
);

export default Main;
