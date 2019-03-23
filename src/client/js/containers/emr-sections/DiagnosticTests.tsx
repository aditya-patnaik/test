import * as React from "react"
import ViewSection from "../../components/common/Section";
import ComponentList from "../../components/common/ComponentList";
import SimpleInputRow from "../../components/rowComponents/SimpleInputRow";

export interface DiagnosticTestsProps {
    diagnosticTests: string[];
}

export interface DiagnosticTestsState {
    data: string[];
}

class DiagnosticTests extends React.Component<DiagnosticTestsProps, DiagnosticTestsState> {
    constructor(props: DiagnosticTestsProps) {
        super(props);
        this.state = {
            data: props.diagnosticTests
        }
    }
    onDataChange = (data: any[]) => {
        this.setState({data})
    }
    addRow = () => {
        let currData = this.state.data;
        currData.push("");
        this.setState({
            data: currData
        })
    }
    render() {
        return (
            <ViewSection header="Diagnostic Tests">
                <ComponentList onDataChange={this.onDataChange} onRowAddition={this.addRow} rowComponent={SimpleInputRow} data={this.state.data} />
            </ViewSection>
        )
    }
}

export default DiagnosticTests;