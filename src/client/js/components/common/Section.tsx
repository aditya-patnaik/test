import * as React from "react";

export interface SectionProps {
    children: any;
    header: string;
}

class ViewSection extends React.Component<SectionProps> {
    render() {
        return (
            <div className="section-container">
                <h4>{this.props.header}</h4>
                {this.props.children}
            </div>
        )
    }
}

export default ViewSection;