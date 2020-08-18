import React from 'react'
import classes from './Backdrop.module.sass'

export default props => (
    <div className={classes.Backdrop} onClick={props.onClick} />
)