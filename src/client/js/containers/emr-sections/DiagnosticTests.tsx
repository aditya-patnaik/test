import * as React from "react"
import ViewSection from "../../components/common/Section";
import ComponentList from "../../components/common/ComponentList";
import SimpleInputRow from "../../components/rowComponents/SimpleInputRow";
import * as _ from "lodash";

export interface DiagnosticTestsProps {
    diagnosticTests: string[];
    isReadOnly?: boolean;
}

export interface DiagnosticTestsState {
    data: string[];
}

class DiagnosticTests extends React.Component<DiagnosticTestsProps, DiagnosticTestsState> {
    constructor(props: DiagnosticTestsProps) {
        super(props);
        this.state = {
            data: props.diagnosticTests ? props.diagnosticTests : []
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
    getSaveObject = (): string[] => {
        let data: string[] = []
        _.map(this.state.data, (row) => {
            if (!_.isEmpty(row)) {
                data.push(row)
            }
        })
        return data;
    }
    render() {
        return (
            <ViewSection header="Diagnostic Tests">
                <ComponentList onDataChange={this.onDataChange}
                               onRowAddition={this.addRow}
                               hideRowAddition={this.props.isReadOnly}
                               rowComponent={SimpleInputRow}
                               data={this.state.data} />
            </ViewSection>
        )
    }
}

export default DiagnosticTests;