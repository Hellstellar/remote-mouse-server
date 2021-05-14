import React, {useEffect, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import {Fade, makeStyles} from "@material-ui/core";
import colors from '../constants/styling/colors'
import { EConnectionStatus, EMobileStatusMessage } from "../constants/enums";
import ConnectionStatus from "./ConnectionStatus";
import QrCode from "./QrCode";
const ipcRenderer = window.require("electron").ipcRenderer;

const useStyles = makeStyles({
    root: {
        backgroundColor: colors.background,
        height: '100vh',
        width: '100%',
        textAlign: 'center'
    },
});

const Main = () => {
    const classes = useStyles()
    const [mobileStatus, setMobileStatus] = useState(EConnectionStatus.DISCONNECTED)

    useEffect(() => {
        ipcRenderer.on('mobile-status', (event, message) => {
            ipcRenderer.send('mobile-status', 'changed')
            setMobileStatus(message)
        })
    }, [])
    return (
        <React.Fragment>
            <CssBaseline/>
            <Container maxWidth="xl" className={classes.root} disableGutters={true}>
                    <Grid
                        container
                        alignItems="center"
                        justify="center"
                        style={{minHeight: '100vh'}}
                    >
                            <Fade in>
                                <div>
                                    <ConnectionStatus status={mobileStatus} clientMessage={EMobileStatusMessage}/>
                                    <br/>
                                    <QrCode/>
                                </div>
                            </Fade>
                    </Grid>
            </Container>
        </React.Fragment>
    )
}
export default Main