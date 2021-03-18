import React from 'react';
import Grid from "@material-ui/core/Grid";
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';

export default () => {
    return (
        <>
            <Grid container spacing={10}>
                <Grid item xs={6}>
                    <CheckCircleOutlineOutlinedIcon style={{ fontSize: 150, color: 'green' }}/>
                </Grid>
                <Grid item xs={6}>
                    <CheckCircleOutlineOutlinedIcon style={{ fontSize: 150, color: 'green' }}/>
                </Grid>
            </Grid>
        </>
    )
}