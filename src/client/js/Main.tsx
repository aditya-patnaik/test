import * as React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavbarContainer from "./containers/NavbarContainer";
import EmrWrapperContainer from "./containers/EmrWrapperContainer";

class Main extends React.Component {
    render() {
        return (
            <Router>
                <div id="app">
                    <NavbarContainer />
                    <div className="main-content-container">
                        <Route path="/emr/:patientId?" component={EmrWrapperContainer} />
                        {/* <Route path="/about" component={About} />
                        <Route path="/topics" component={Topics} /> */}
                    </div>
                </div>
            </Router>
        )
    }
}

export default Main;