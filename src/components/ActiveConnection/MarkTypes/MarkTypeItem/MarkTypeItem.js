import React from "react";
import classes from './MarkTypeItem.module.sass'
import {DateFormat} from "../../../../utils/DateFormat";

const MarkTypeItem = (props) => {
    return (
        <button
            style={{backgroundImage: `url("/img/type${props.markType}.png")`, backgroundSize: "cover"}}
            className={classes.MarkTypeButton} onClick={() => {
            props.setActiveConnectionData(
                props.markType,
                props.projectId,
                props.serialNumber,
                DateFormat.getDateNow(),
                localStorage.getItem('userEmail'))
        }}>
        </button>
    )
}

export default MarkTypeItem