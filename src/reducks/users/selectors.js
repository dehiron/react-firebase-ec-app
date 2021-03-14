import { createSelector } from 'reselect'

const usersSelector = (state) => state.users;

const getUserId = createSelector(
    [usersSelector],
    state => state.uid
);

const getUserName = createSelector(
    [usersSelector],
    state => state.username
);

export {getUserId, getUserName};