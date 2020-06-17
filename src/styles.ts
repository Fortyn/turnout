import {Theme} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import {WithStyles} from "@material-ui/core/styles/withStyles";

export type Style = WithStyles<typeof styles>;

export const styles = (theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            height: window.innerHeight * 0.95,
            justifyContent: 'center',
            alignItems: 'center',
        }
    });