import React from 'react'
import classes from './Loader.module.sass'

export default props => (
    <div className={classes.Center}>
        <div className={classes.Loader} style={{marginTop: `${props.marginTop}`}}>
            <div />
            <div />
        </div>
    </div>
)