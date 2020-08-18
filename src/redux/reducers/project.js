import {
    CHANGE_ROLE,
    COMPLETE_DATE_AUTHOR,
    GET_ACTIVE_CONNECTION_SUCCESS,
    GET_PROJECT_SUCCESS,
    GET_PROJECTS_ERROR,
    GET_PROJECTS_START,
    GET_PROJECTS_SUCCESS,
    MARKING_TYPE_CLICK,
    POST_PROJECT_START, POST_PROJECT_SUCCESS,
    RESET_COMPLETE_DATE_AUTHOR,
    RESET_MARKTYPE,
    SWITCH_TO_ACTIVE_CONNECTION
} from "../actions/actionTypes";

const initialState = {
    projectsList: [],
    projects: [],
    project: null,
    activeConnection: [],
    markType: null,
    markTypeCurrent: null,
    isLoading: false,
    isUploadingProject: false,
    isFirstRole: true,
    isActiveConnectionShow: false,
    completeAuthor: null,
    completeDate: null
}

export default function projectReducer(state = initialState, action){
    switch (action.type) {
        case GET_PROJECTS_START:
            return {
                ...state,
                isLoading: true
            }
        case GET_PROJECTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                projects: action.projects,
                projectsList: action.projectsList
            }
        case GET_PROJECTS_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        case GET_PROJECT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                project: action.project
            }
        case GET_ACTIVE_CONNECTION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                activeConnection: action.activeConnection
            }
        case SWITCH_TO_ACTIVE_CONNECTION:
            return {
                ...state,
                isActiveConnectionShow: true
            }
        case CHANGE_ROLE:
            return {
                ...state,
                isFirstRole: !state.isFirstRole
            }
        case MARKING_TYPE_CLICK:
            return {
                ...state,
                markType: action.markType
            }
        case RESET_MARKTYPE:
            return {
                ...state,
                markType: null
            }
        case COMPLETE_DATE_AUTHOR:
            return {
                ...state,
                completeDate: action.completeDate,
                completeAuthor: action.completeAuthor
            }
        case RESET_COMPLETE_DATE_AUTHOR:
            return {
                ...state,
                completeDate: null,
                completeAuthor: null
            }

        case POST_PROJECT_START:
            return {
                ...state,
                isUploadingProject: true
            }
        case POST_PROJECT_SUCCESS:
            return {
                ...state,
                isUploadingProject: false
            }
        default:
            return state

    }
}
