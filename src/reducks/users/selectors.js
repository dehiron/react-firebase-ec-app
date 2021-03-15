import { createSelector } from 'reselect'

const usersSelector = (state) => state.users;

const getIsSignedIn = createSelector(
    [usersSelector],
    state => state.isSignedIn
);

const getUserId = createSelector(
    [usersSelector],
    state => state.uid
);

const getUserName = createSelector(
    [usersSelector],
    state => state.username
);

export {getUserId, getUserName, getIsSignedIn};