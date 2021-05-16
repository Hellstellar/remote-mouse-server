import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import {Fab} from "@material-ui/core";
import CropFreeIcon from '@material-ui/icons/CropFree';
import QRCode from 'qrcode'
const ipcRenderer = window.require("electron").ipcRenderer;

const useStyles = makeStyles((theme) => ({
    fab: {
        margin: theme.spacing(2),
    },
}));

const QrCode = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [imageUrl, setImageUrl] = useState('')

    useEffect(() => {
        ipcRenderer.send('qr-code', 'mounted')
        ipcRenderer.on('local-ip-address', async (event, message) => {
            try {
                const response = await QRCode.toDataURL(message)
                setImageUrl(response)
            } catch (err) {
                console.error(err)
            }
        })
    }, [])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    log
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <Fab aria-describedby={id} color="primary" className={classes.fab} onClick={handleClick}>
                <CropFreeIcon />
            </Fab>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                {imageUrl && <img alt="QR code" src={imageUrl} />}
            </Popover>
        </div>
    );
}
export default QrCode