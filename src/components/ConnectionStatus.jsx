import React from 'react';
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import Typography from "@material-ui/core/Typography";
import {EConnectionStatus} from "../constants/enums";
import {makeStyles} from "@material-ui/core";
import {ErrorOutline} from "@material-ui/icons";
import colors from "../constants/styling/colors"

const useStyles = makeStyles({
    typography: {
        color: colors.primary
    },
})

const ConnectionStatus = ({ status, clientMessage }) => {
    const classes = useStyles();
    return (
        <>
            { status === EConnectionStatus.CONNECTED &&
            <>
                <CheckCircleOutlineOutlinedIcon style={{fontSize: '120px'}} color='primary'/>
                <Typography className={classes.typography} noWrap variant='h5'>{clientMessage.CONNECTED}</Typography>
            </>
            }
            { status === EConnectionStatus.LOADING &&
                <>
                    <ErrorOutline style={{fontSize: '120px'}} color='secondary'/>
                    <Typography className={classes.typography} noWrap variant='h5'>{clientMessage.LOADING}</Typography>
                </>
            }
        </>
    )
}
export default ConnectionStatus