import * as React from "react"
import ViewSection from "../../components/common/Section";
import ComponentList from "../../components/common/ComponentList";
import SimpleInputRow from "../../components/rowComponents/SimpleInputRow";

export interface FamilyHistoryProps {
    history: string[];
}

export interface FamilyHistoryState {
    data: string[];
}

class FamilyHistory extends React.Component<FamilyHistoryProps, FamilyHistoryState> {
    constructor(props: FamilyHistoryProps) {
        super(props);
        this.state = {
            data: props.history
        }
    }
    addRow = () => {
        let currData = this.state.data;
        currData.push("");
        this.setState({
            data: currData
        })
    }
    onDataChange = (data: any[]) => {
        this.setState({data})
    }
    render() {
        return (
            <ViewSection header="Family History">
                <ComponentList onDataChange={this.onDataChange} onRowAddition={this.addRow} rowComponent={SimpleInputRow} data={this.state.data} />
            </ViewSection>
        )
    }
}

export default FamilyHistory;