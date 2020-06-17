import {MuiThemeProvider} from "@material-ui/core";
import createMuiTheme, {ThemeOptions} from "@material-ui/core/styles/createMuiTheme";
import {createBrowserHistory} from "history";
import React from "react";
import {Switch, Route, Router} from 'react-router';
import App from "../App";
import Login from "../login/login";

export const localHistory = createBrowserHistory();
const themeConfig = {}
const theme = createMuiTheme(themeConfig as ThemeOptions);

function PortalContainer() {
    return (
        <MuiThemeProvider theme={theme}>
            <Router history={localHistory}>
                <Switch>
                    <Route exact path={"/"} component={App}/>
                    <Route exact path={"/login"} component={Login}/>
                </Switch>
            </Router>
        </MuiThemeProvider>
    );
}

export default PortalContainer;