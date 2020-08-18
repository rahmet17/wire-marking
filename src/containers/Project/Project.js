import React from "react";
import classes from './Project.module.sass'
import ProjectConnections from "../../components/ProjectConnections/ProjectConnections";
import {connect} from "react-redux";
import {getProjectById, switchToActiveConnection} from "../../redux/actions/project";
import Loader from "../../components/UI/Loader/Loader";

class Project extends React.Component {

    componentDidMount() {
        this.props.getProjectById(this.props.match.params.id)
    }

    render() {
        return (
            <div className={classes.ProjectConnections}>
                {
                    this.props.isLoading || !this.props.project
                        ? <Loader/>
                        : <ProjectConnections
                            project={this.props.project}
                            projectId={this.props.match.params.id}
                            switchToActiveConnection={this.props.switchToActiveConnection}
                        />
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isLoading: state.projects.isLoading,
        project: state.projects.project
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getProjectById: (id) => dispatch(getProjectById(id)),
        switchToActiveConnection: () => dispatch(switchToActiveConnection()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Project)