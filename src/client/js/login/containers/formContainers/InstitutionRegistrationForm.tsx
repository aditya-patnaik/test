import * as React from "react";

export default class InstitutionRegistrationForm extends React.Component {
    render() {
        return (
            <div>
                <div className="form-row">
                    <input type="text" className="form-control form-control-sm" placeholder="Name" />
                </div>
                <div className="form-row">
                    <input type="text" className="form-control form-control-sm" placeholder="Registration number" />
                </div>
                <div className="form-row">
                    <input type="text" className="form-control form-control-sm" placeholder="Drug license number" />
                </div>
                <div className="form-row">
                    <input type="text" className="form-control form-control-sm" placeholder="Aadhar / Passport number" />
                </div>
                <div className="form-row"><input type="button" className="btn btn-primary btn-sm register-btn" value="Submit" /></div>
            </div>
        )
    }
}