import * as React from "react"
import ViewSection from "../../components/common/Section";
import ComponentList from "../../components/common/ComponentList";
import SimpleInputRow from "../../components/rowComponents/SimpleInputRow";
import * as _ from "lodash";

export interface AllergiesProps {
    allergies: string[];
}

export interface AllergiesState {
    data: string[];
}

class Allergies extends React.Component<AllergiesProps, AllergiesState> {
    constructor(props: AllergiesProps) {
        super(props);
        this.state = {
            data: props.allergies ? props.allergies : []
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
            <ViewSection header="Allergies">
                <ComponentList onDataChange={this.onDataChange}
                                onRowAddition={this.addRow}
                                rowComponent={SimpleInputRow}
                                data={this.state.data} />
            </ViewSection>
        )
    }
}

export default Allergies;