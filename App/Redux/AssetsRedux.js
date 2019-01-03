import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
    getAssetsAttempt: null,
    getAssetsSuccess: ['data'],
    getAssetsFailure: ['error'],
    getBarsAttempt: ['timeframe', 'symbols', 'day'],
    getBarsSuccess: ['data', 'day'],
    getBarsFailure: ['error'],
    resetBars: null
})

export const AssetsTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
    assets: [],
    bars: null,
    preBars: null,
    fetching: true,
    errorMessage: '',
    error: false
})

export const getAssetsAttempt = (state, action) => {
    return state.merge({ fetching: true, error: false, errorMessage: '' })
}

export const getAssetsSuccess = (state, action) => {
    return state.merge({ fetching: false, error: false, errorMessage: '', assets: action.data })
}

export const getAssetsFailure = (state, action) => {
    return state.merge({ fetching: false, error: true, errorMessage: action.error })
}

export const getBarsAttempt = (state, action) => {
    return state.merge({ fetching: true, error: false, errorMessage: '' })
}

export const getBarsSuccess = (state, action) => {
    if (action.day === 'today') {
        return state.merge({ fetching: false, error: false, errorMessage: '', bars: action.data })
    } else {
        return state.merge({ fetching: false, error: false, errorMessage: '', preBars: action.data })
    }
}

export const getBarsFailure = (state, action) => {
    return state.merge({ fetching: false, error: true, errorMessage: action.error })
}

export const resetBars = (state, action) => (
    state.merge({ bars: null, preBars: null })
)

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_ASSETS_ATTEMPT]: getAssetsAttempt,
    [Types.GET_ASSETS_SUCCESS]: getAssetsSuccess,
    [Types.GET_ASSETS_FAILURE]: getAssetsFailure,
    [Types.GET_BARS_ATTEMPT]: getBarsAttempt,
    [Types.GET_BARS_SUCCESS]: getBarsSuccess,
    [Types.GET_BARS_FAILURE]: getBarsFailure
})