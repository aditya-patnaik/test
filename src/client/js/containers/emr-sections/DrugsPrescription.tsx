import * as React from "react"
import ViewSection from "../../components/common/Section";
import ComponentList from "../../components/common/ComponentList";
import SimpleInputRow from "../../components/rowComponents/SimpleInputRow";
import * as _ from "lodash";

export interface DrugsPrescriptionProps {
    drugs: string[];
    isReadOnly?: boolean;
}

export interface DrugsPrescriptionState {
    data: string[];
}

class DrugsPrescription extends React.Component<DrugsPrescriptionProps, DrugsPrescriptionState> {
    constructor(props: DrugsPrescriptionProps) {
        super(props);
        this.state = {
            data: props.drugs ? props.drugs : []
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
            <ViewSection header="Drug Prescription">
                <ComponentList onDataChange={this.onDataChange}
                               onRowAddition={this.addRow}
                               hideRowAddition={this.props.isReadOnly}
                               rowComponent={SimpleInputRow}
                               data={this.state.data} />
            </ViewSection>
        )
    }
}

export default DrugsPrescription;