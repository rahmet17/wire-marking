import React from "react";
import classes from "./ProjectConnections.module.sass";
import { Link } from "react-router-dom";

const ProjectConnections = (props) => {
  return (
    <div className={classes.ProjectConnections}>
      <h1>Всего {props.project.connections.length} соединений</h1>
      <ul>
        {props.project.connections.map((connection, index) => {
          const connectionId = connection.serialNumber - 1;
          return (
            <Link
              to={"/project/" + props.projectId + "/" + connectionId}
              key={index}
            >
              <li
                className={classes.ProjectConnections}
                key={index}
                onClick={() => {
                  props.switchToActiveConnection(index);
                }}
              >
                <div className={classes.gridContainer}>
                  <div className={classes.sourceTarget}>
                    <p className={classes.TitleData}>Источник - Цель</p>
                    <p>{connection.sourceTarget}</p>
                  </div>
                  <div className={classes.targetSource}>
                    <p className={classes.TitleData}>Цель - Источник</p>
                    <p>{connection.targetSource}</p>
                  </div>
                  <div className={classes.crossSectionalArea}>
                    <p>{connection.crossSectionalArea}</p>
                  </div>
                  <div className={classes.markType}>
                    <img src={`/img/type${connection.markType}.png`} alt="" />
                  </div>
                  <div className={classes.colorNumber}>
                    <p>{connection.colorNumber}</p>
                  </div>
                  <div className={classes.completeBlock}>
                    <p className={classes.completeData}>
                      {connection.completeDate}
                    </p>
                    <p className={classes.completeData}>
                      {connection.completeAuthor}
                    </p>
                  </div>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default ProjectConnections;
