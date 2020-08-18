import React, {Component} from 'react';
import XLSX from 'xlsx';
import classes from './ExcelReader.module.sass'
import {uploadProject} from "../../redux/actions/project";
import {connect} from "react-redux";
import Loader from "../UI/Loader/Loader";

class ExcelReader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: {},
            data: [],
            connections: [],
            isFileInHandler: false
        }
        this.handleFile = this.handleFile.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const files = e.target.files;
        if (files && files[0])
            this.setState({
                file: files[0],
                isFileInHandler: true
            });
    };

    handleFile() {
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
        reader.onload = (e) => {
            const headers = ["serialNumber", "targetCode", "targetName", "targetElement", "targetCleatNumber", "targetSource", "sourceTarget", "sourceCode", "sourceName", "sourceElement", "sourceCleatNumber", "crossSectionalArea", "colorNumber", "potencial", "ouCable"]

            const bstr = e.target.result;
            const wb = XLSX.read(bstr, {type: 'binary'});

            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            let range = XLSX.utils.decode_range(ws['!ref']);
            range.s.c = 0; // 0 == XLSX.utils.decode_col("A")
            range.e.c = 14; // 14 == XLSX.utils.decode_col("O")
            let new_range = XLSX.utils.encode_range(range);

            const data = XLSX.utils.sheet_to_json(ws, {
                header: headers,
                range: new_range,
                blankRows: false,
                defval: null
            });
            const connections = []
            const project = {connections}

            this.setState({connections: connections}, () => {
                data.forEach((connection) => {
                    if (Number.isInteger(connection.serialNumber) &&
                        (connection.crossSectionalArea !== null) &&
                        (connection.colorNumber === connection.colorNumber.toUpperCase())) {
                        connection.markType = ''
                        connection.markDate = ''
                        connection.markAuthor = ''
                        connection.completeDate = ''
                        connection.completeAuthor = ''
                        connections.push(connection)
                    }
                })
                connections.sort((a, b) => {
                    if (a.colorNumber > b.colorNumber) return 1;
                    if (a.colorNumber < b.colorNumber) return -1;
                    if (a.crossSectionalArea > b.crossSectionalArea) return 1;
                    if (a.crossSectionalArea < b.crossSectionalArea) return -1;
                    return 0
                })
                connections.forEach((connection, i) => {
                    connection.serialNumber = i + 1
                })

            });
            this.props.uploadProject(project)
        };
        if (rABS) {
            reader.readAsBinaryString(this.state.file);
        } else {
            reader.readAsArrayBuffer(this.state.file);
        }
    }

    render() {
        return (
            <div className={classes.ExcelReader}>
                {
                    this.props.isUploadingProject
                        ? <Loader
                            marginTop={'50px'}
                        />
                        : <div>
                            <label htmlFor="file">Загрузите новый проект</label>
                            <br/>
                            <input
                                type="file"
                                className="form-control"
                                id="file"
                                onChange={this.handleChange}/>
                            <br/>
                            <button className={classes.submitButton}
                                    onClick={() => {
                                        if (this.state.isFileInHandler)
                                            this.handleFile()
                                    }}><i className="fa fa-upload"/>Загрузить
                            </button>
                        </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isUploadingProject: state.projects.isUploadingProject
    }
}

function mapDispatchToProps(dispatch) {
    return {
        uploadProject: (project) => dispatch(uploadProject(project))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExcelReader)