import { createSelector } from 'reselect'

const usersSelector = (state) => state.users;

const getUserId = createSelector(
    [usersSelector],
    state => state.uid
);

export {getUserId};