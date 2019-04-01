import * as React from "react"

export interface ButtonProps {
    text: string;
    onBtnClick?: () => void;
    disabled?: boolean;
    cssClasses?: string;
}

class Button extends React.Component<ButtonProps> {
    render() {
        return (
            <button className={`custom-button ${this.props.cssClasses}`} onClick={this.props.onBtnClick} disabled={this.props.disabled}>
                {this.props.text}
                {this.props.children}
            </button>
        )
    }
}

export default Button;