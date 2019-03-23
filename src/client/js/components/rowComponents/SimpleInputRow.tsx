import * as React from "react"

export interface SimpleInputRowProps {
    data: string;
    onDataChange: (data: string) => void;
}

class SimpleInputRow extends React.Component<SimpleInputRowProps> {
    onTextChange = (evt: any) => {
        this.props.onDataChange(evt.target.value);
    }
    render() {
        return (
            <div>
                <input className="text-input" type="text" value={this.props.data} onChange={this.onTextChange} />
            </div>
        )
    }
}

export default SimpleInputRow;