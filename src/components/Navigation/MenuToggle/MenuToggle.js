import React from 'react'
import classes from './MenuToggle.module.sass'

export default props => {
    const cls = [
        classes.MenuToggle,
        'fa',
        props.state ? 'fa-times' : 'fa-bars',
        props.state ? classes.open : ''
    ]

    return (
        <div className={classes.MenuNav}>
            <i
                className={cls.join(' ')}
                onClick={props.onToggle}
            />
        </div>
    )
}