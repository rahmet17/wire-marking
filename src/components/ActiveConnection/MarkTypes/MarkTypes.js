import React from "react";
import classes from './MarkTypes.module.sass'
import MarkTypeItem from "./MarkTypeItem/MarkTypeItem";

function defineMarkTypes(id) {
    let markTypesMode = [1, 2, 3, 4]
    switch (id) {
        case 1:
            return markTypesMode = [1, 2, 3, 4]
        case 2:
            return markTypesMode = [5, 6, 7, 8]
        case 3:
            return markTypesMode = [9, 10, 11, 12]
        case 4:
            return markTypesMode = [13, 14, 15, 16]
        default:
            return markTypesMode
    }
}

const MarkTypes = (props) => {

    const markType = defineMarkTypes(props.markTypesMode)
        return (
            <div className={classes.markTypes}>
                { markType.map((markType, index) => {
                    return (
                        <MarkTypeItem
                            markType={markType}
                            key={index}
                            setActiveConnectionData={props.setActiveConnectionData}
                            projectId={props.projectId}
                            serialNumber={props.activeConnection.serialNumber}
                        />
                    )
                })}
            </div>
        )
}

export default MarkTypes
