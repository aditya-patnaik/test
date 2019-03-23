import * as React from "react";
import EmrContainer from "../containers/EmrContainer";
import NavbarContainer from "../containers/NavbarContainer";

export interface HelloProps { compiler: string; framework: string; }

export class Main extends React.Component<HelloProps, {}> {
    render() {
        return (
            <div className="main-container">
                <NavbarContainer />
                <EmrContainer />
            </div>
        )
    }
}