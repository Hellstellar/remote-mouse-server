import React, {useEffect} from 'react'
import MouseOutlinedIcon from "@material-ui/icons/MouseOutlined";
import Typography from "@material-ui/core/Typography";
import {Fade} from "@material-ui/core";


export default ({ handleTitleUnmount }) => {
    const [showTitle, setShowTitle] = React.useState(true);
    useEffect(() => {
        setTimeout(() => setShowTitle(false), 2000)
    }, [])

    return (
        <>
            <Fade in={showTitle} timeout={1000} mountOnEnter unmountOnExit onExited={handleTitleUnmount}>
                <div>
                    <MouseOutlinedIcon style={{ fontSize: 150, color: 'white' }}/>
                    <Typography style={{ color: 'white' }} variant="h2" gutterBottom>
                        Remote Mouse
                    </Typography>
                </div>
            </Fade>
        </>
    )
}