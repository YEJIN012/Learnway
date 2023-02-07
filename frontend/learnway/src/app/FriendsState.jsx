const myFriends = [];

function FriendsState(state = myFriends, action) {
    if (action.type === "update") {
        state = action.payload;
        return state;
    } else if (action.type === "push") {
        state = [...state, action.payload]
    } else {
        return state;
    }
}

export default FriendsState;
