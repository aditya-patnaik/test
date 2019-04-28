import * as React from "react"
import * as _ from "lodash"
import * as moment from "moment"
import {Chart} from "react-google-charts"
import { VitalConfig } from "./VitalsEdit";

// const data = [
//     ["Year", "Sales", "Expenses"],
//     ["2004", 1000, 400],
//     ["2005", 1170, 460],
//     ["2006", 660, 1120],
//     ["2007", 1030, 540]
//   ];
const options = {
    title: "Vitals Trend",
    curveType: "function",
    legend: { position: "bottom" }
};

class VitalsView extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            vitals: props.currentVitals,
            vitalChartData: null,
            currentVital: null
        };
    }
    formatVitalData = (vitalsList: any[], vitalName: string) => {
        let vitalNameToDisplay = VitalConfig.filter(vital => vital.internalValue === vitalName)[0].name;
        let chartData = [["Time", vitalNameToDisplay]];
        _.map(vitalsList, (vital) => {
            chartData.push([moment(vital.timeStamp * 1000).format("Do MMM, YYYY"), vital.value])
        })
        return chartData;
    }
    getVitalChartData = (selectedVital: string) => {
        if (selectedVital !== "systolic" && selectedVital !== "diastolic") {
            let requiredVitals = this.state.vitals[selectedVital];
            return this.formatVitalData(requiredVitals, selectedVital);
        } else {
            let bpList = this.state.vitals.bloodPressure;
            let reqVitalList = bpList.map((item: any) => { return { value: item[selectedVital], timeStamp: item.timeStamp } });
            return this.formatVitalData(reqVitalList, selectedVital);
        }
    }
    updateSelectedVital = (evt: any) => {
        if (!evt.target.value) {
            this.setState({
                vitalChartData: null
            })
        } else {
            let selectedVital = evt.target.value
            let chartData = this.getVitalChartData(selectedVital)
            this.setState({
                vitalChartData: chartData
            })
        }
    }
    render() {
        return (
            <div className={"vitals-container"}>
                <select onChange={this.updateSelectedVital}>
                    <option value="">Select a vital</option>
                    {
                        _.map(VitalConfig, (vital, index) => {
                            return <option key={index} value={vital.internalValue}>{vital.displayValue}</option>
                        })
                    }
                </select>
                {
                    !this.state.vitalChartData &&
                    <div>
                        <h2>Select a vital to view it's trend</h2>
                    </div>
                }
                {
                    this.state.vitalChartData && this.state.vitalChartData.length > 1 &&
                    <Chart
                    chartType="LineChart"
                    width="100%"
                    height="400px"
                    data={this.state.vitalChartData}
                    options={options} />
                }
                {
                    this.state.vitalChartData && this.state.vitalChartData.length === 1 &&
                    <div className="no-recorded-values">No Recorded Values found</div>
                }
            </div>
        )
    }
}

export default VitalsView;