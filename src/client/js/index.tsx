import * as React from "react";
import * as ReactDOM from "react-dom";
import ReduxThunk from "redux-thunk";
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";

import "./../css/app.scss";
import Main from "./Main";
import reducers from "./reducers";

class App extends React.Component {
    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))
        return (
            <Provider store={store}>
                <Main />
            </Provider>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
);