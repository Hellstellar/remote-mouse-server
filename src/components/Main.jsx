import React, {useEffect, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Title from "./Title";
import {Fade, makeStyles} from "@material-ui/core";
import colors from '../constants/styling/colors'
import {EConnectionStatus, EMobileStatusMessage} from "../constants/ui-enums";
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
    const [showStatus, setShowStatus] = useState(false)
    const [mobileStatus, setMobileStatus] = useState(EConnectionStatus.DISCONNECTED)
    const handleTitleUnmount = () => {
        setShowStatus(true)
    }

    useEffect(() => {
        ipcRenderer.on('mobile-status', (event, message) => {
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
                        { showStatus ? (
                             <Grid style={{textAlign: 'center'}} item xs={12}>
                                    <Fade in>
                                        <div>
                                            <ConnectionStatus status={mobileStatus} clientMessage={EMobileStatusMessage}/>
                                            <QrCode/>
                                        </div>
                                    </Fade>
                                </Grid>
                            ) : (
                                <Grid style={{textAlign: 'center'}} item xs={12}>
                                    <Title handleTitleUnmount={handleTitleUnmount}/>
                                </Grid>
                            )
                        }
                    </Grid>
            </Container>
        </React.Fragment>
    )
}
export default Main