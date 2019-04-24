import * as React from "react"
import TextInput from "../formElements/TextInput";
import { USER_ROLES } from "../../constants/AppConstants";

export interface DiagnosticTestsRowProps {
    data: {test: string, report: string};
    onDataChange: (data: {test: string, report: string}) => void;
    meta: any;
}

class DiagnosticTestsRow extends React.Component<DiagnosticTestsRowProps> {
    onPrescribedTestChange = (evt: any) => {
        this.props.onDataChange({ ...this.props.data, test: evt.target.value});
    }
    onTestReportChange = (evt: any) => {
        this.props.onDataChange({ ...this.props.data, report: evt.target.value });
    }
    render() {
        const {test, report} = this.props.data;
        return (
            <div className={"diagnostic-tests-row"}>
                <div className="diagnostic-test-prescribed">
                    <TextInput onChange={this.onPrescribedTestChange}
                               value={test} 
                               placeholder="Test name (to be filled by doctor)"
                               disabled={this.props.meta.userGroup !== USER_ROLES.DOCTOR} />
                </div>
                <div className="diagnostic-test-prescribed">
                    <TextInput onChange={this.onPrescribedTestChange} 
                               value={report}
                               placeholder="Test Report (to be filled by phlebotomist)"
                               disabled={this.props.meta.userGroup !== USER_ROLES.LAB} />
                </div>
            </div>
        )
    }
}

export default DiagnosticTestsRow;