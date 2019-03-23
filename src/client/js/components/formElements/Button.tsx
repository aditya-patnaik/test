import * as React from "react"

export interface ButtonProps {
    text: string;
    onBtnClick?: () => void;
}

class Button extends React.Component<ButtonProps> {
    render() {
        return (
            <button className="custom-button" onClick={this.props.onBtnClick}>{this.props.text}</button>
        )
    }
}

export default Button;