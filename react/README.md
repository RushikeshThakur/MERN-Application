pacckage.json

1. react
   1. The base object model for React.js app
      1. Component<props, state> object
         1. Reusable UI with Data aka state and events
   2. Hooks
      1. useState(), useEffects(), useContext()
      2. useReducer()
2. react-dom
   1. Used to render and mount the component in Browser's DOM
3. JSX
   1. Html start-tag must have end-tag
      1. e.g. <input type="text"></input>
   2. Replacement for some of the ES 6 keyword attributes
      1. e.g. use className instead of class attribute
         1. <input type="text" className="">
         2. use htmlFor instead of for attribute
      2. use style binding
         1. standard html
            1. style="height:100px;width:400px"
         2. React.js
            1. style={{height:100px;width:400px}}
4. Components
   1. export <classname>
      1. import {<classname>} from '<FILE-PATH>'
   2. export default <classname> --> provides instance by default
      1. import <classname> from '<FILE-PATH>'

# ============================================================================

1. React Components
   1. Class Component
      1. Class derived from 'Component<props, state>' base class
         1. props, the dynamic immutable JS object that is used to pass data across components
            1. We can add any number properties in component using props
         2. state, the mutable object that represents the state of the current component aka data values used by the current component
            1. The JS object
            2. Used to pass data to HTML elements using the HTML attributes
      2. Component has following methods
         1. Must have constructor() with super(props); call
         2. setState({}, callback)
            1. Update the state of current component
         3. forceUpdate()
            1. Forcefully update the state
         4. Lifecycle method
            1. e.g. getProps()/getState()/componentDidMount(), etc
         5. render() method to render HTML elements
   2. Function Component
      1. JavaScript function that returns HTML DOM
      2. Uses Hooks to manage state
      3. function MyComponent(){return HTML}; export default MyComponent
      4. const MyComponent=()=>{ return HTML}; export default MyComponent
   3. Stateless compnents
   4. Statefull
      1. Controlled Components, suitable for LOB apps
         1. State object that will be changed with setState()
         2. props, these will be accepted from parent of the current component
      2. UnControlled Components
         1. Use the 'ref' attributed to read/write state from and to UI Elements
   5. Higher-Order-Component (HOC)
   6. PureComponent

# =============================================================================================

Hooks in React.js 16.8+

1. useState(state as any, behavior callback)
   1. state: the schema of the state of the component
      1. any --> string, number, date, array, {}, etc.
   2. behavior --> the object using which the state is updated
2. e.g.
   1. const [x, updateX] = useState(0); <-- the ES 6 destructuring syntax
      1. x will be 0 by default
      2. updateX will update the value of x using some method
3. useContext()
   1. Provides a global objectthat will be used to share data across components
   2. createContext() method will create a global object that will provide data/events across components
      1. <DataContext.Provider value={<DATA and EVENT to be shared>}>
      2. <CHILD COMPONENT>
      3. </DataContext.Provider>

# ============================================================================================

The Action is dispatched by Store object using store.dispatch() method. This method accepts 'Action' as input parameter and the action accepts 'payload' as input. Payload can be 'premptive type' or 'object'.

--> store is created at application level
--> use the 'createStore()' metjod from redux package to creare store at application level

1. Define actions
   1. Define Action-Type
   2. Define Action Creator
      1. Method with logic
2. Define reducer
   1. A pure function that is used to update state in store
      1. a function that uses ACTION_TYPE to decide how the store is updated
      2. We may have multiple reducers but all these will be combine togather using 'combineReducer' object
      3. The bobibe reducer will then further used to create store
3. Define Store using createStore() method. This will accept the reducer as input parameter
4. Displatch Actions using store and pass payload to it
