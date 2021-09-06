import React, {useEffect, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import {Fab, makeStyles} from "@material-ui/core";
import colors from '../constants/styling/colors'
import {EConnectionStatus} from "../constants/enums";
import ConnectionStatus from "../components/ConnectionStatus";
import QrCode from "../components/QrCode";
import CloseIcon from "@material-ui/icons/Close";

const ipcRenderer = window.require("electron").ipcRenderer;

const useStyles = makeStyles({
    root: {
        backgroundColor: colors.background,
        height: '100vh',
        width: '100%',
        textAlign: 'center'
    },
    close: {
        backgroundColor: colors.error,
        color: colors.background,
        '&:hover': {
            background: colors.primary
        }
    }
});

const Main = () => {
    const classes = useStyles()
    const [mobileStatus, setMobileStatus] = useState(EConnectionStatus.DISCONNECTED)

    useEffect(() => {
        ipcRenderer.removeAllListeners('mobile-status')
        ipcRenderer.on('mobile-status', (event, message) => {
            ipcRenderer.send('mobile-status', 'changed')
            setMobileStatus(message)
        })
    }, [])

    const closeConnectionHandler = () => {
        ipcRenderer.send('mobile-status', 'disconnect')
    }

    return (
        <React.Fragment>
            <CssBaseline/>
            <Container maxWidth="xl" className={classes.root} disableGutters={true}>
                <Grid
                    container
                    data-testid="container-grid"
                    alignItems="center"
                    justify="space-around"
                    direction={'column'}
                    style={{minHeight: '100vh'}}
                >
                    <Grid item>
                        <ConnectionStatus status={mobileStatus}/>
                    </Grid>
                    {mobileStatus === EConnectionStatus.CONNECTED ? (<Grid item>
                        <Fab className={classes.close} variant={"extended"} onClick={closeConnectionHandler} aria-label="close" size={'medium'}>
                            <CloseIcon />
                            Disconnect
                        </Fab>
                    </Grid>) : (<Grid item>
                        <QrCode/>
                    </Grid>)}
                </Grid>
            </Container>
        </React.Fragment>
    )
}
export default Main