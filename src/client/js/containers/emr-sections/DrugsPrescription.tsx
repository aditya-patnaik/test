import * as React from "react"
import ViewSection from "../../components/common/Section";
import ComponentList from "../../components/common/ComponentList";
import SimpleInputRow from "../../components/rowComponents/SimpleInputRow";

export interface DrugsPrescriptionProps {
    drugs: string[];
}

export interface DrugsPrescriptionState {
    data: string[];
}

class DrugsPrescription extends React.Component<DrugsPrescriptionProps, DrugsPrescriptionState> {
    constructor(props: DrugsPrescriptionProps) {
        super(props);
        this.state = {
            data: props.drugs
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
            <ViewSection header="Drug Prescription">
                <ComponentList onDataChange={this.onDataChange} onRowAddition={this.addRow} rowComponent={SimpleInputRow} data={this.state.data} />
            </ViewSection>
        )
    }
}

export default DrugsPrescription;