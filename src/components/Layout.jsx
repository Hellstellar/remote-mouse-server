import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import {Divider, makeStyles} from "@material-ui/core";
import { ipcRenderer } from "electron";
import ConnectionStatus from "./ConnectionStatus";
import {EConnectionStatus, EHammerspoonStatusMessage, EMobileStatusMessage} from "../constants/enums";
import colors from '../constants/styling/colors'

const dividerStyles = makeStyles({
    root: {
        height: '15em',
        width: '4px',
        margin: '0 auto',
        background: colors.primary,
    }
})

export default () => {
    const [hammerspoonStatus, setHammerspoonStatus] = useState(EConnectionStatus.DISCONNECTED)
    const [mobileStatus, setMobileStatus] = useState(EConnectionStatus.DISCONNECTED)
    const dividerClasses = dividerStyles()

    ipcRenderer.on('hammerspoon-status', (event, message) => {
        setHammerspoonStatus(message)
    })

    ipcRenderer.on('mobile-status', (event, message) => {
        setMobileStatus(message)
    })

    return (
        <>
            <Grid container spacing={10}>
                <Grid item xs={5}>
                    <ConnectionStatus status={hammerspoonStatus} clientMessage={EHammerspoonStatusMessage}/>
                </Grid>
                <Grid item xs={2}>
                    <Divider classes={dividerClasses} orientation="vertical" flexItem />
                </Grid>
                <Grid item xs={5}>
                    <ConnectionStatus status={mobileStatus} clientMessage={EMobileStatusMessage}/>
                </Grid>
            </Grid>
        </>
    )
}