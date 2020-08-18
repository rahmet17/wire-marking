import React, {Component} from "react"
import classes from './ActiveConnection.module.sass'
import {connect} from "react-redux"
import {
    getActiveConnection,
    onChangeRole,
    setActiveConnectionData,
    setCompleteDateAuthor
} from "../../redux/actions/project"
import Loader from "../UI/Loader/Loader"
import ActiveConnectionInfo from "./ActiveConnectionInfo/ActiveConnectionInfo";
import MarkTypes from "./MarkTypes/MarkTypes";
import {DateFormat} from "../../utils/DateFormat";


class ActiveConnection extends Component {

    state = {
        markTypesMode: 1
    }

    componentDidMount() {
        this.props.getActiveConnection(this.props.match.params.id, this.props.match.params.serialNumber)
    }

    setMarkTypesMode = (markTypesId) => {
        this.setState({
            markTypesMode: markTypesId
        })
    }

    renderMarkTypesActionBlock() {
        return (
            <div className={classes.MarkTypesActionBlock}>
                <button className={classes.MarkTypesGroupChange} onClick={() => {
                    if (this.state.markTypesMode > 1)
                        this.setMarkTypesMode(this.state.markTypesMode - 1)
                }}>
                    <i className="fa fa-angle-double-left"/>
                </button>

                <MarkTypes
                    projectId={this.props.match.params.id}
                    activeConnection={this.props.activeConnection}
                    setActiveConnectionData={this.props.setActiveConnectionData}
                    markTypesMode={this.state.markTypesMode}
                />
                <button className={classes.MarkTypesGroupChange} onClick={() => {
                    if (this.state.markTypesMode < 4)
                        this.setMarkTypesMode(this.state.markTypesMode + 1)
                }}>
                    <i className="fa fa-angle-double-right"/>
                </button>
            </div>
        )
    }

    renderCompleteActionBlock() {
        return (
            <button className={classes.CompleteButton} onClick={() => {
                this.props.setCompleteDateAuthor(
                    this.props.match.params.id,
                    this.props.activeConnection.serialNumber - 1,
                    DateFormat.getDateNow(),
                    localStorage.getItem('userEmail'))
            }}>Выполнено
            </button>
        )
    }

    renderSwitchActionBlock() {
        const nextConnectionId = this.props.activeConnection.serialNumber
        const prevConnectionId = (this.props.activeConnection.serialNumber) - 2

        return (
            <div className={classes.ActionBlock}>
                <button className={classes.DirectionButtons} onClick={() => {
                    if (prevConnectionId >= 0) {
                        this.props.getActiveConnection(this.props.match.params.id, prevConnectionId)
                    }
                }}>
                    <i className={'fa fa-arrow-left'}/>
                </button>

                <button className={classes.SwitchModeButton} onClick={this.props.onChangeRole}>
                    <i className={'fa fa-retweet'}/>
                </button>

                <button className={classes.DirectionButtons} onClick={() => {
                    if (nextConnectionId < this.props.project.connections.length) {
                        this.props.getActiveConnection(this.props.match.params.id, nextConnectionId)
                    }
                }}>
                    <i className={'fa fa-arrow-right'}/>
                </button>
            </div>
        )
    }

    render() {
        const isFirstRole = this.props.isFirstRole;
        return (
            <div className={classes.ActiveConnection}>
                {this.props.isLoading || !this.props.activeConnection
                    ? <Loader
                        marginTop={'50px'}
                    />
                    : <ActiveConnectionInfo
                        activeConnection={this.props.activeConnection}
                        markType={this.props.markType}
                        isFirstRole={this.props.isFirstRole}
                        completeDate={this.props.completeDate}
                        completeAuthor={this.props.completeAuthor}
                    />
                }
                {isFirstRole
                    ? this.renderMarkTypesActionBlock()
                    : this.renderCompleteActionBlock()
                }
                {this.renderSwitchActionBlock()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isLoading: state.projects.isLoading,
        isFirstRole: state.projects.isFirstRole,
        activeConnection: state.projects.activeConnection,
        markType: state.projects.markType,
        project: state.projects.project,
        completeDate: state.projects.completeDate,
        completeAuthor: state.projects.completeAuthor
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getActiveConnection: (projectId, id) => dispatch(getActiveConnection(projectId, id)),
        onChangeRole: () => dispatch(onChangeRole()),
        setActiveConnectionData: (markType, projectId, id, markDate, markAuthor) => dispatch(setActiveConnectionData(markType, projectId, id, markDate, markAuthor)),
        setCompleteDateAuthor: (projectId, id, time, author) => dispatch(setCompleteDateAuthor(projectId, id, time, author)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveConnection)
