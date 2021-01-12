import React from "react";
import classes from "./ProjectConnections.module.sass";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { onChangeSelect } from "../../redux/actions/project";
import { UniqueArray } from "../../utils/UniqueArray";

class ProjectConnections extends React.Component {
  onChange = (event) => {
    this.props.onChangeSelect(event.target.value);
  };

  render() {
    let uniqArr = UniqueArray.getUniqueArray(this.props.project.connections);
    let connectionsArr;
    if (
      this.props.selectColorCrossValue === null ||
      this.props.selectColorCrossValue === "all"
    ) {
      connectionsArr = this.props.project.connections;
    } else {
      let colorNum = this.props.selectColorCrossValue.split("-")[0];
      let crossSection = this.props.selectColorCrossValue.split("-")[1];
      connectionsArr = this.props.project.connections.filter(
        (connection) =>
          connection.colorNumber === colorNum &&
          connection.crossSectionalArea === crossSection
      );
    }
    return (
      <div className={classes.ProjectConnections}>
        <h1>Всего: {connectionsArr.length}</h1>

        <div className={classes.selectOption}>
          <select onChange={this.onChange}>
            <option value="all">Все</option>
            {uniqArr.map((connection, index) => {
              return (
                <option
                  value={
                    connection.colorNumber + "-" + connection.crossSectionalArea
                  }
                  key={index}
                >
                  {connection.colorNumber} {connection.crossSectionalArea}
                </option>
              );
            })}
          </select>
        </div>

        <ul>
          {connectionsArr.map((connection, index) => {
            const connectionId = connection.serialNumber - 1;
            return (
              <Link
                to={"/project/" + this.props.projectId + "/" + connectionId}
                key={index}
              >
                <li
                  className={classes.ProjectConnections}
                  key={index}
                  onClick={() => {
                    this.props.switchToActiveConnection(index);
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
  }
}

function mapStateToProps(state) {
  return {
    selectColorCrossValue: state.projects.selectColorCrossValue,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChangeSelect: (value) => dispatch(onChangeSelect(value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectConnections);
