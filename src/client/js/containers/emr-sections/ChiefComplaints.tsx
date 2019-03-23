import * as React from "react"
import ViewSection from "../../components/common/Section";
import ComponentList from "../../components/common/ComponentList";
import SimpleInputRow from "../../components/rowComponents/SimpleInputRow";

export interface ChiefComplaintsProps {
    complaints: string[];
}

export interface ChiefComplaintsState {
    data: string[];
}

class ChiefComplaints extends React.Component<ChiefComplaintsProps, ChiefComplaintsState> {
    constructor(props: ChiefComplaintsProps) {
        super(props);
        this.state = {
            data: props.complaints
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
            <ViewSection header="Chief Complaints">
                <ComponentList onDataChange={this.onDataChange} onRowAddition={this.addRow} rowComponent={SimpleInputRow} data={this.state.data} />
            </ViewSection>
        )
    }
}

export default ChiefComplaints;