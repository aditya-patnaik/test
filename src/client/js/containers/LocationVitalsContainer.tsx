import * as React from "react"
import * as _ from "lodash"
import { connect } from "react-redux"
import { Chart } from "react-google-charts"
import PatientActions from "../actions/PatientActions"
import { VitalConfig } from "../components/vitals/VitalsEdit";

const data = [
    ['City', '2010 Population', '2000 Population'],
    ['New York City, NY', 8175000, 8008000],
    ['Los Angeles, CA', 3792000, 3694000],
    ['Chicago, IL', 2695000, 2896000],
    ['Houston, TX', 2099000, 1953000],
    ['Philadelphia, PA', 1526000, 1517000],
]

interface LocationVitalsContainerState {
    isLoading: boolean;
    currentVitals: any;
    city1Name: string;
    city2Name: string;
    city1: any;
    city2: any;
}

class LocationVitalsContainer extends React.Component<IMapDispatchToProps, LocationVitalsContainerState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isLoading: false,
            city1: null,
            city2: null,
            currentVitals: null,
            city1Name: null,
            city2Name: null
        }
    }

    getAvgVitalValue = (vitalList: any[]) => {
        let total = 0;
        let iteratedItems = 0;
        _.map(vitalList, (vitals) => {
            if (vitals && vitals.length) {
                _.map(vitals, (vital, index) => {
                    total = total + vital.value;
                    iteratedItems+=1;
                })
            }
        })
        return total ? total / iteratedItems : null;
    }

    formatVitalsBasedOnLocationResponse = (vitalResponse: any) => {
        let vitalsObj = {} as any;
        VitalConfig.map((vital: any) => {
            if (vital.id !== "systolic" || vital.id !== "diastolic") {
                let vitalList = vitalResponse.map((item: any) => item.ecg)
                let vitalAvg = this.getAvgVitalValue(vitalList)
                vitalsObj[vital.internalValue] = vitalAvg;
            }
        })
        return vitalsObj;
    }

    updateLocation = (evt: any) => {
        let location = evt.target.value;
        let elemId = evt.target.id;
        this.setState({
            isLoading: true
        }, () => {
            this.props.getLocationBasedVitals(location).then((vitalResponse: any) => {
                if (elemId === "city1") {
                    this.setState({
                        city1: this.formatVitalsBasedOnLocationResponse(JSON.parse(vitalResponse.msg)),
                        city1Name: location
                    })
                } else {
                    this.setState({
                        city2: this.formatVitalsBasedOnLocationResponse(JSON.parse(vitalResponse.msg)),
                        city2Name: location
                    })
                }
            })
        })
    }

    getChartData() {
        let chartData = [];
        let titleRow = ["City", this.state.city1Name];
        if (this.state.city2Name) titleRow.push(this.state.city2Name);
        chartData.push(titleRow);
        VitalConfig.map((vital: any) => {
           if (vital.id !== "systolic" || vital.id !== "diastolic") {
               let row = [vital.internalValue, this.state.city1[vital.internalValue]];
               if (this.state.city2Name) {
                    row.push(this.state.city2[vital.internalValue])
               }
               chartData.push(row);
            }
        });
        return chartData;
    }

    render() {
        let shouldChartDisplay = this.state.city1 || this.state.city2;
        return (
            <div className="location-based-vitals-container">
                <select id="city1" onChange={this.updateLocation}>
                    <option>Select a City</option>
                    <option value="bangalore">Bangalore</option>
                    <option value="kolkata">Kolkata</option>
                </select>
                <select id="city2" onChange={this.updateLocation}>
                    <option>Select a City</option>
                    <option value="bangalore">Bangalore</option>
                    <option value="kolkata">Kolkata</option>
                </select>
                {
                    shouldChartDisplay &&
                    <Chart
                        chartType="BarChart"
                        loader={<div>Loading Chart</div>}
                        data={this.getChartData()}
                        options={{
                            title: 'Vitals Comparison',
                            chartArea: { width: '50%' },
                            hAxis: { title: 'Vital Value', minValue: 0 },
                            vAxis: { title: 'Vital Name' }
                        }} />
                }
            </div>
        )
    }
}

interface IMapDispatchToProps {
    getLocationBasedVitals: (location: string) => Promise<any>;
}

const mapDispatchToProps = () => {
    return {
        getLocationBasedVitals: (location: string) => {
            return PatientActions.getVitalsForLocation(location);
        }
    }
}

export default connect(null, mapDispatchToProps)(LocationVitalsContainer);