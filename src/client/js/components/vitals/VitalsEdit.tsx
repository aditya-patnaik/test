import * as React from "react"
import * as _ from "lodash"
import TextInput from "../formElements/TextInput";
import Button from "../formElements/Button";

export const VitalConfig = [{
    name: "Heart Rate",
    internalValue: "heartRate",
    displayValue: "HR"
},{
    name: "Pulse",
    internalValue: "pulseRate",
    displayValue: "Pulse"
},{
    name: "Oxygen Saturation",
    internalValue: "oxygenSaturation",
    displayValue: "SPO2"
},{
    name: "ECG",
    displayValue: "ECG",
    internalValue: "ecg"
},{
    name: "Systolic Blood Pressure",
    displayValue: "SBP",
    internalValue: "systolic"
},{
    name: "Diastolic Blood Pressure",
    displayValue: "DBP",
    internalValue: "diastolic"
},]

class VitalsEdit extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            vitals: {}
        };
    }
    onVitalChange = (evt: any, vital: string) => {
        if (!isNaN(Number(evt.target.value)) || evt.target.value === "") {
            let currentVitals = { ...this.state.vitals };
            if (evt.target.value === "") {
                delete currentVitals[vital];
            } else {
                currentVitals[vital] = Number(evt.target.value);
            }
            this.setState({ vitals: currentVitals })
        }
    }
    saveVitals = () => {
        let {systolic, diastolic} = this.state.vitals;
        let vitals = { ...this.state.vitals, bloodPressure: { systolic, diastolic } };
        this.props.saveVitals(vitals).then(() => {
            this.props.onVitalsSave();
        });
    }
    render() {
        return (
            <div className={"vitals-container"}>
                {
                    _.map(VitalConfig, (vital, index) => {
                        return <div className="vital-value-container" key={index}>
                            <div>{vital.displayValue}</div>
                            <div className="vital-input-container">
                                <TextInput value={this.state.vitals[vital.internalValue]} key={index} onChange={(evt) => this.onVitalChange(evt, vital.internalValue)} />
                            </div>
                        </div>
                    })
                }
                <div className="save-btn-container">
                    <Button text={"Save"} onBtnClick={this.saveVitals}></Button>
                </div>
            </div>
        )
    }
}

export default VitalsEdit;