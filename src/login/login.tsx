import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import {orange} from "@material-ui/core/colors";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import {LockOpen, Lock} from '@material-ui/icons';
import React from "react";
import {RouteComponentProps, withRouter} from "react-router";
import {AuthenticationProps} from "../security/auth-models";
import httpClientService from "../security/http-client.service";
import localStorageHelperService from "../security/local-storage-helper-service";
import {Style, styles} from "./styles";

type Props = Style & RouteComponentProps;

const inputProps = {
    style: {
        WebkitBoxShadow: `0 0 0 1000px ${orange[100]} inset`
    }
};

const Login: React.FunctionComponent<Props> = props => {
    console.log("RENDER");
    const {classes} = props;
    const [login, setLogin ] = React.useState<string>('')
    const [password, setPassword ] = React.useState<string>('')
    const submit = () => {
        httpClientService
            .post('auth/login', {login, password})
            .then(response => response.data as AuthenticationProps)
            .then(auth => {
                if(auth.accessToken) {
                    localStorageHelperService.setAccessToken(auth.accessToken);
                }
                if(auth.refreshToken) {
                    localStorageHelperService.setRefreshToken(auth.refreshToken);
                }
                if(auth.user) {
                    localStorageHelperService.setUserInfo(auth.user);
                }
                props.history.push("/");
                window.location.reload();
            })
    };
    return (
        <div className={classes.container}>
            <div className={classes.paper}>
                <Card style={{backgroundColor: orange[200]}}>
                    <div className={classes.form}>
                        <Lock/>
                        <TextField
                            id="login"
                            error={false}
                            autoFocus
                            fullWidth
                            required
                            label="Login"
                            margin="dense"
                            variant="outlined"
                            onChange={event => setLogin(event.target.value)}
                            value={login}
                            inputProps = {inputProps}
                        />
                        <TextField
                            id="password"
                            error={false}
                            fullWidth
                            required
                            type='password'
                            label="Password"
                            margin="dense"
                            variant="outlined"
                            onChange={event => setPassword(event.target.value)}
                            value={password}
                            inputProps = {inputProps}
                        />
                        <Button
                            variant="outlined"
                            style={{backgroundColor: orange[100], width: '100%', marginTop: '1em'}}
                            onClick={submit}
                        >
                            <LockOpen />
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}
export default withRouter(withStyles(styles)(Login));