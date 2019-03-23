import * as React from "react"
import ViewSection from "../../components/common/Section";
import ComponentList from "../../components/common/ComponentList";
import SimpleInputRow from "../../components/rowComponents/SimpleInputRow";

export interface CurrentMedicationProps {
    medication: string[];
}

export interface CurrentMedicationState {
    data: string[];
}

class CurrentMedication extends React.Component<CurrentMedicationProps, CurrentMedicationState> {
    constructor(props: CurrentMedicationProps) {
        super(props);
        this.state = {
            data: props.medication
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
            <ViewSection header="Current Medication">
                <ComponentList onDataChange={this.onDataChange} onRowAddition={this.addRow} rowComponent={SimpleInputRow} data={this.state.data} />
            </ViewSection>
        )
    }
}

export default CurrentMedication;