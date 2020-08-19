import React, {Component} from "react";
import classes from './ProjectList.module.sass'
import ExcelReader from "../../components/ExcelReader/ExcelReader";
import XLSX from 'xlsx';
import {NavLink} from "react-router-dom";
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {getProjects} from "../../redux/actions/project";

class ProjectList extends Component {

    exportReportToXLSX(id) {
        const project = this.props.projects[id]
        const filename = `Отчет по ${project.connections[0].sourceName}.xlsx`;
        const header = ["Источник - Цель", "Цель - Источник", "Автор метки", "Дата метки", "Автор выполнения", "Дата выполнения"]
        let writeConnection = []
        let data = []
        data.push(header)

        project.connections.forEach((connection) => {
            writeConnection.push(connection.sourceTarget)
            writeConnection.push(connection.targetSource)
            writeConnection.push(connection.markAuthor)
            writeConnection.push(connection.markDate)
            writeConnection.push(connection.completeAuthor)
            writeConnection.push(connection.completeDate)
            data.push(writeConnection)
            writeConnection = []
        })
        let ws_name = 'Соединения';
        let ws = XLSX.utils.aoa_to_sheet(data);
        ws['!cols'] = [{wch: 40}, {wch: 40}, {wch: 25}, {wch: 20}, {wch: 25}, {wch: 20}]
        ws['!rows'] = [{level: 0}]
        let wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, ws_name);
        XLSX.writeFile(wb, filename);
    }

    renderProjects() {
        if (this.props.projects !== null && this.props.projects.length !== 0) {
            return this.props.projectsList.map((project, index) => {
                let pathToProject = 'project/' + project.id
                return (
                    <li key={project.id}>
                        <NavLink
                            to={pathToProject}>
                            {project.name}
                        </NavLink>
                        <button onClick={() => {
                            return this.exportReportToXLSX(project.id)
                        }}><i className={"fa fa-exchange"}/> Export to .xlsx
                        </button>
                    </li>

                )
            })
        } else {
            return (<h2>No party</h2>)
        }
    }

    componentDidMount() {
        this.props.getProjects()
    }


    render() {
        return (
            <div className={classes.ProjectList}>
                <h2>Все проекты</h2>
                {
                    this.props.isLoading
                        ? <Loader
                            marginTop={'50px'}
                        />
                        : <div className={classes.ProjectsContainer}>
                            <ul>
                                {this.renderProjects()}
                            </ul>
                        </div>
                }
                <ExcelReader
                    getProjects={this.props.getProjects}
                />
            </div>
        );
    }


}

function mapStateToProps(state) {
    return {
        projects: state.projects.projects,
        projectsList: state.projects.projectsList,
        isLoading: state.projects.isLoading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getProjects: () => dispatch(getProjects())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList)