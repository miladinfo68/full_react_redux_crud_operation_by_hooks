//run this file by nodejs server 
const redux = require("redux");

const initialState = { counter: 0 }

//reducer 
//make up new state by old state and an action
const rootReducer = function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        // case "Add_1_to_state":
        //     //wrong way to change state
        //     //state must be changed immutable not mutable           
        //     state.counter++;
        //     return state;

        case "Add_1_to_state":
            return {
                ...state,
                counter: state.counter + payload
            }

        case "Add_10_to_state":
            return {
                ...state,
                counter: state.counter + payload
            }

        case "Subtract_1_from_state":
            return {
                ...state,
                counter: state.counter - payload
            }

        case "Subtract_10_from_state":
            return {
                ...state,
                counter: state.counter - payload
            }
    }
    return state;
}


//store
//an object to keep all app states
const store = redux.createStore(rootReducer);
console.log("[initialStale]--> ", store.getState());


//subscription
//inform and aprise consumers that store has changed
store.subscribe(() => {
    console.log('[currentState]', store.getState());
});





//dispatching actions to reducer
store.dispatch({ type: "Add_1_to_state", payload: 1 });
//console.log("[dispatch action add 1]--> ",store.getState());

store.dispatch({ type: "Add_10_to_state", payload: 10 });
//console.log("[dispatch action add 10]--> ",store.getState());

store.dispatch({ type: "Subtract_1_from_state", payload: 1 });
//console.log("[dispatch action minus 1]--> ",store.getState());

store.dispatch({ type: "Subtract_10_from_state", payload: 10 });
//console.log("[dispatch action minus 10]--> ",store.getState());
