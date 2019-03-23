import * as React from "react"
import ViewSection from "../../components/common/Section";
import ComponentList from "../../components/common/ComponentList";
import SimpleInputRow from "../../components/rowComponents/SimpleInputRow";

export interface PastHistoryProps {
    history: string[];
}

export interface PastHistoryState {
    data: string[];
}

class PastHistory extends React.Component<PastHistoryProps, PastHistoryState> {
    constructor(props: PastHistoryProps) {
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
            <ViewSection header="Past History">
                <ComponentList onDataChange={this.onDataChange} onRowAddition={this.addRow} rowComponent={SimpleInputRow} data={this.state.data} />
            </ViewSection>
        )
    }
}

export default PastHistory;