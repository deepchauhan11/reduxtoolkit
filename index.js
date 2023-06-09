// kfc store
// wings are available in the kitchen
// delivery manager 1 handles the WINGS_ORDERED from the customer and delivers
// coke is stored in the frezer
// delivery manager 2 handles the COKE_ORDERED from the customer



// import redux from 'redux';
const redux = require('redux');

// helper function
const bindActionCreators = redux.bindActionCreators


const createStore = redux.createStore
// const createStore = redux.configureStore
console.log("This is KFC example")

// Action
// This is the only way your application can interact with the store
// Action is a Plain js object
// Action carry some information from the app to the redux store
// Action have a type property, that describes something that has happened in a particular app
// type property defined as string constants 


// Action: WINGS_ORDERED
const WINGS_ORDERED = "WINGS_ORDERED"
// New Scenario
const WINGS_RESTOCKED = "WINGS_RESTOCKED"

const COKE_ORDERED = "COKE_ORDERED"
const COKE_RESTOCKED = "COKE_RESTOCKED"

// Define action

// Action Creator: function that returns action
function orderwings(){
    return {
        // Define action
        type: WINGS_ORDERED,
        // quantity: 1
        payload: 1
    }
}

function orderCoke(qnty=1){
    return {
        type: COKE_ORDERED,
        payload: qnty
    }
}

function restockCoke(qnty=1){
    return {
        type: COKE_RESTOCKED,
        payload: qnty
    }
}

// Action Creator
function restockWings(qnty=1){
    return {
        type: WINGS_RESTOCKED,
        // quantity: qnty,
        payload: qnty,
    }
}

// Reducer
// Specify how the app's state changes in response to a action sent to the store
// Reducers are function that accepts a state and action as a argument and returns the next state to the app
// (previousState, action) => newState


(previousState, action) => newState


const initialState = {
    numberOfWings: 50,
    numberOfCokes: 80,
}
// const initialWingsState = {
//     numberOfWings: 50,
// }
// const initialCokeState = {
//     numberOfCokes: 80,
// }

const reducer = (state = initialState, action) => {
    switch(action.type){
        case WINGS_ORDERED:
            return{
                // copy of state obj
                ...state,
                // updating the no of wings
                numberOfWings : state.numberOfWings - 1
            }
        case WINGS_RESTOCKED:
            return {
            ...state,
            // numberOfWings : state.numberOfWings + action.quantity
            numberOfWings : state.numberOfWings + action.payload
        }
        case COKE_ORDERED:
            return{
                // copy of state obj
                ...state,
                // updating the no of wings
                numberOfCokes : state.numberOfCokes - 1
            }
        case COKE_RESTOCKED:
            return {
            ...state,
            // numberOfWings : state.numberOfWings + action.quantity
            numberOfCokes : state.numberOfCokes + action.payload
        }
        default:
            return state
    }
}

// Redux store
// for entire app will have the one store
// Resposibilities:
// 1 - holds the application state
// 2 - allows access to state via getState()
// 3 - allows state to be updated via dispatch(action)
// 4 - Registers listeners via subscribe(listener)
// 5 - Unsubscribe from the store - store handles unregistering of listeners via 
// the function returned by the subscribe(listener)

// 1
const store = createStore(reducer)
// 2
console.log("Initial State", store.getState())
// 4
// store.subscribe(()=>console.log("Updated State: ", store.getState()))
// 5
const unsubscribe = store.subscribe(()=>
    console.log("Updated State: ", store.getState())
)

// 3
// (invoke the action creator)
// store.dispatch(orderwings())
// store.dispatch(orderwings())
// store.dispatch(orderwings())
// store.dispatch(restockWings(3))

const actions = bindActionCreators({orderwings, restockWings, orderCoke, restockCoke}, store.dispatch)
actions.orderwings()
actions.orderwings()
actions.orderwings()
actions.orderwings()
actions.orderwings()
actions.restockWings(5)
actions.orderCoke()
actions.orderCoke()
actions.orderCoke()
actions.restockCoke(3)

// 5
unsubscribe()


// Previous Scenario: ordering the wings

// New Scenario: Restock the wings