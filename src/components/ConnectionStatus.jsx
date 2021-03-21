import React from 'react';
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import Typography from "@material-ui/core/Typography";
import {EConnectionStatus} from "../constants/enums";
import {makeStyles} from "@material-ui/core";
import {ErrorOutline} from "@material-ui/icons";

const useStyles = makeStyles({
    typography: {
        color: 'white'
    },
})

const ConnectionStatus = ({ status, clientMessage }) => {
    const classes = useStyles();
    return (
        <>
            { status === EConnectionStatus.CONNECTED &&
            <>
                <CheckCircleOutlineOutlinedIcon style={{fontSize: 150, color: 'green'}}/>
                <Typography className={classes.typography} noWrap variant='h5'>{clientMessage.CONNECTED}</Typography>
            </>
            }
            { status === EConnectionStatus.LOADING &&
                <>
                    <ErrorOutline style={{fontSize: 150, color: 'red'}}/>
                    <Typography className={classes.typography} noWrap variant='h5'>{clientMessage.LOADING}</Typography>
                </>
            }
        </>
    )
}
export default ConnectionStatus