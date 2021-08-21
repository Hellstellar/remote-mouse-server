import React, {useEffect, useState} from 'react';
import QRCode from 'qrcode'
import {EErrors, EErrorsMessage} from "../constants/enums";
import Typography from "@material-ui/core/Typography";
import {Card, CardMedia, Fab, makeStyles} from "@material-ui/core";
import ReplayIcon from '@material-ui/icons/Replay';
import colors from "../constants/styling/colors";
import Grid from "@material-ui/core/Grid";
const ipcRenderer = window.require("electron").ipcRenderer;

const useStyles = makeStyles({
    error: {
        color: colors.error
    },
    retry: {
        backgroundColor: colors.primary,
        color: colors.background
    },
    image: {
        width: '150px',
        height: '150px',
    },
    card: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& .overlay': {
            display: 'none'
        },
        '&:hover .overlay': {
            display: 'block',
            position: 'absolute'
        }
    },

})

const QrCode = () => {
    const classes = useStyles();
    const [imageUrl, setImageUrl] = useState('')
    const [networkError, setNetworkError] = useState(false)
    useEffect(() => {
        ipcRenderer.removeAllListeners('local-ip-address')
        ipcRenderer.send('qr-code', 'mounted')
        ipcRenderer.on('local-ip-address', async (event, message) => {
            try {
                if(message === EErrors.WIRELESS_NETWORK_ERROR) {
                    setImageUrl('')
                    setNetworkError(true)
                }
                else {
                    setNetworkError(false)
                    const response = await QRCode.toDataURL(message)
                    console.log(response)
                    setImageUrl(response)
                }
            } catch (err) {
                console.error(err)
            }
        })
    }, [])



    const retryHandler = () => {
        ipcRenderer.send('qr-code', 'retry')
    };

    return (
        <div>
            <Grid
                container
                direction={'column'}
            >
                <Grid item xs={12}>
                    <Card className={classes.card}>
                        <CardMedia >
                            {imageUrl && <img className={classes.image} src={imageUrl} alt='QR-code' />}
                        </CardMedia>
                        <Fab className={`overlay ${classes.retry}`} onClick={retryHandler} aria-label="replay" size={'medium'}>
                            <ReplayIcon />
                        </Fab>
                    </Card>
                </Grid>
                {networkError &&
                    <>
                        <Grid item xs={12}>
                            <Fab className={classes.retry} onClick={retryHandler} aria-label="replay" size={'medium'}>
                                <ReplayIcon />
                            </Fab>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className={classes.error} noWrap variant='h6'>{EErrorsMessage.WIRELESS_NETWORK_ERROR}</Typography>
                        </Grid>
                    </>
                }
            </Grid>
        </div>
    );
}
export default QrCode