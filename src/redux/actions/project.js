import firebase from '../../firebase/firebase-config'
import {instance} from "../../axios/axios-config";
import {
    CHANGE_ROLE,
    COMPLETE_DATE_AUTHOR,
    GET_ACTIVE_CONNECTION_SUCCESS,
    GET_PROJECT_SUCCESS,
    GET_PROJECTS_ERROR,
    GET_PROJECTS_START,
    GET_PROJECTS_SUCCESS,
    MARKING_TYPE_CLICK,
    POST_PROJECT_START,
    POST_PROJECT_SUCCESS,
    RESET_COMPLETE_DATE_AUTHOR,
    RESET_MARKTYPE,
    SWITCH_TO_ACTIVE_CONNECTION
} from "./actionTypes";

export function getProjects() {
    return async dispatch => {
        dispatch(getProjectsStart())
        try {
            const response = await instance.get('projects.json')
            const projects = response.data
            const projectsList = []

            if (projects) {

                Object.keys(projects).forEach((key) => {
                    const projectName = projects[key].connections[0].sourceName
                    projectsList.push({
                        id: key,
                        name: projectName
                    })
                })
            }
            dispatch(getProjectsSuccess(projects, projectsList))
        }
        catch (e) {
            dispatch(getProjectsError(e))
        }
    }
}

export function getProjectSuccess(project) {
    return {
        type: GET_PROJECT_SUCCESS,
        project
    }
}

export function getProjectsStart() {
    return {
        type: GET_PROJECTS_START
    }
}

export function getProjectsSuccess(projects, projectsList) {
    return {
        type: GET_PROJECTS_SUCCESS,
        projects,
        projectsList
    }
}

export function getActiveConnectionSuccess(activeConnection) {
    return {
        type: GET_ACTIVE_CONNECTION_SUCCESS,
        activeConnection
    }
}

export function getProjectsError(e) {
    return {
        type: GET_PROJECTS_ERROR,
        error: e
    }
}

export function getProjectById(id) {
    return async dispatch => {
        dispatch(getProjectsStart())
        try {
            const response = await instance.get(`projects/${id}.json`)
            const project = response.data

            dispatch(getProjectSuccess(project))
        }
        catch (e) {
            dispatch(getProjectsError(e))
        }
    }
}

export function getActiveConnection(projectId, id) {
    return async dispatch => {
        dispatch(getProjectsStart())
        try {
            const response = await instance.get(`projects/${projectId}/connections/${id}.json`)
            const activeConnection = response.data

            dispatch(getActiveConnectionSuccess(activeConnection))
        }
        catch (e) {
            dispatch(getProjectsError(e))
        }
        dispatch(resetMarkType())
        dispatch(resetCompleteDateAuthor())
    }
}

export function switchToActiveConnection() {
    return {
        type: SWITCH_TO_ACTIVE_CONNECTION
    }
}

export function onChangeRole() {
    return {
        type: CHANGE_ROLE
    }
}

function onMarkingTypeClick(markType) {
    return {
        type: MARKING_TYPE_CLICK,
        markType
    }
}

export function setActiveConnectionData(markType, projectId, id, markDate, markAuthor) {
    const connectionNum = id - 1;
    let connectionRef = firebase.database().ref(`projects/${projectId}/connections/${connectionNum}`);
    return async (dispatch, getState) => {
        dispatch(onMarkingTypeClick(markType))
        await connectionRef.update({"markType": getState().projects.markType , "markDate": markDate , "markAuthor": markAuthor })
    }
}

function onCompleteClick(completeDate, completeAuthor) {
    return {
        type: COMPLETE_DATE_AUTHOR,
        completeDate,
        completeAuthor
    }
}

export function setCompleteDateAuthor(projectId, id, completeDate, completeAuthor) {
    let connectionRef = firebase.database().ref(`projects/${projectId}/connections/${id}`);
    return async (dispatch) => {
        dispatch(onCompleteClick(completeDate, completeAuthor))
        await connectionRef.update({"completeDate": completeDate, "completeAuthor": completeAuthor})
    }
}

export function resetMarkType() {
    return {
        type: RESET_MARKTYPE
    }
}

export function resetCompleteDateAuthor() {
    return {
        type: RESET_COMPLETE_DATE_AUTHOR
    }
}

export function postProjectStart() {
    return {
        type: POST_PROJECT_START
    }
}

export function postProjectSuccess() {
    return {
        type: POST_PROJECT_SUCCESS
    }
}

export function uploadProject(project){
    return async dispatch => {
        dispatch(postProjectStart())
        try {
            await instance.post('projects.json', JSON.stringify(project))
            dispatch(postProjectSuccess())
            dispatch(getProjects())
        }
        catch (e) {
            dispatch(getProjectsError(e))
        }
    }
}