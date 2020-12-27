import React from "react";
import classes from "./ActiveConnectionInfo.module.sass";

const ActiveConnectionInfo = (props) => {
  let completeDate = "";
  let completeAuthor = "";
  if (!props.isFirstRole)
    if (props.completeDate !== null && props.completeAuthor !== null) {
      completeDate = props.completeDate;
      completeAuthor = props.completeAuthor;
    } else {
      completeDate = props.activeConnection.completeDate;
      completeAuthor = props.activeConnection.completeAuthor;
    }
  return (
    <div className={classes.ActiveConnectionInfo}>
      <span className={classes.HeadData}>
        {props.activeConnection.colorNumber}{" "}
        {props.activeConnection.crossSectionalArea}
      </span>
      <p className={classes.TitleData}>Источник - Цель</p>
      <p className={classes.Data}>{props.activeConnection.sourceTarget}</p>

      <p className={classes.TitleData}>Цель - Источник</p>
      <p className={classes.Data}>{props.activeConnection.targetSource}</p>
      {props.isFirstRole ? (
        props.markType !== null ? (
          <img src={`/img/type${props.markType}.png`} alt="" />
        ) : (
          <img src={`/img/type${props.activeConnection.markType}.png`} alt="" />
        )
      ) : props.markType !== null ? (
        <img src={`/img/typePrint${props.markType}.png`} alt="" />
      ) : (
        <img
          src={`/img/typePrint${props.activeConnection.markType}.png`}
          alt=""
        />
      )}
      {!props.isFirstRole && (
        <div className={classes.completeInfo}>
          <p>
            <span>Выполнил: </span> {completeAuthor}
          </p>
          <p>
            <span>Дата: </span>
            {completeDate}
          </p>
        </div>
      )}
    </div>
  );
};

export default ActiveConnectionInfo;
