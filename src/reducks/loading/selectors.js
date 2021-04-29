import { createSelector } from "reselect";

const loadingSelector = (state) => state.loading;

const getLoadingState = createSelector(
    [loadingSelector],
    state => state.state
)

const getLoadingText = createSelector(
    [loadingSelector],
    state => state.text

)

export { getLoadingState, getLoadingText }