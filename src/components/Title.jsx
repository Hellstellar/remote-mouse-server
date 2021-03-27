import React, {useEffect} from 'react'
import MouseOutlinedIcon from "@material-ui/icons/MouseOutlined";
import Typography from "@material-ui/core/Typography";
import {Fade, makeStyles} from "@material-ui/core";
import colors from "../constants/styling/colors"

const useStyles = makeStyles({
    icon: {
        fontSize: 150,
        color: colors.primary,
    },
    title: {
        color: colors.primary,
    }
})

const Title = ({ handleTitleUnmount }) => {
    const [showTitle, setShowTitle] = React.useState(true);
    const classes = useStyles();

    useEffect(() => {
        setTimeout(() => setShowTitle(false), 2000)
    }, [])

    return (
        <>
            <Fade in={showTitle} timeout={1000} mountOnEnter unmountOnExit onExited={handleTitleUnmount}>
                <div>
                    <MouseOutlinedIcon className={classes.icon}/>
                    <Typography className={classes.title} variant="h2" gutterBottom>
                        Remote Mouse
                    </Typography>
                </div>
            </Fade>
        </>
    )
}
export default Title