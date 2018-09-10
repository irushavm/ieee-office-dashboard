import {
    SET_DATA_STALE,
    REQUEST_DATA,
    RECEIVE_DATA,
    RECEIVE_ERROR
} from '../actions'


const dataStates = (state = { isFetching: false, isStale: false, data: [] }, action) => {
    switch (action.type) {
        case SET_DATA_STALE:
            return Object.assign({}, state, {
                isStale: true
            })
        case REQUEST_DATA:
            return Object.assign({}, state, {
                isFetching: true,
                isStale: false
            })
        case RECEIVE_DATA:
            delete state.error;
            return Object.assign({}, state, {
                isFetching: false,
                isStale: false,
                isValid: true,
                data: action.data,
                lastUpdated: action.lastUpdated
            })
        case RECEIVE_ERROR:
            if(state.data === []) delete state.data;
            return Object.assign({}, state, {
                isFetching: false,
                isStale: true,
                isValid: false,
                error: action.error
            })
        default:
            return state
    }
}

function cardsStateReducer(state = {cards: {}}, action) {
    switch (action.type) {
        case SET_DATA_STALE:
        case REQUEST_DATA:
        case RECEIVE_DATA:
        case RECEIVE_ERROR:
            return Object.assign({}, state, {
                cards: Object.assign(state.cards, {
                    [action.card]: dataStates(state.cards[action.card], action)
                })
            })
        default:
            return state
    }
}

export default cardsStateReducer
