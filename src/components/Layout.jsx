import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import {Divider} from "@material-ui/core";
import { ipcRenderer } from "electron";
import ConnectionStatus from "./ConnectionStatus";
import {EConnectionStatus, EHammerspoonStatusMessage, EMobileStatusMessage} from "../constants/enums";

export default () => {
    const [hammerspoonStatus, setHammerspoonStatus] = useState(EConnectionStatus.LOADING)
    const [mobileStatus, setMobileStatus] = useState(EConnectionStatus.LOADING)
    ipcRenderer.on('hammerspoon-status', (event, message) => {
        if(message === EConnectionStatus.CONNECTED) {
            setHammerspoonStatus(EConnectionStatus.CONNECTED)
        }
    })
    ipcRenderer.on('mobile-status', (event, message) => {
        if(message === EConnectionStatus.CONNECTED) {
            setMobileStatus(EConnectionStatus.CONNECTED)
        }
    })

    return (
        <>
            <Grid container spacing={10}>
                <Grid item xs={5}>
                    <ConnectionStatus status={hammerspoonStatus} clientMessage={EHammerspoonStatusMessage}/>
                </Grid>
                <Grid item xs={2}>
                    <Divider orientation="vertical" flexItem />
                </Grid>
                <Grid item xs={5}>
                    <ConnectionStatus status={mobileStatus} clientMessage={EMobileStatusMessage}/>
                </Grid>
            </Grid>
        </>
    )
}