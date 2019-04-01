import * as React from "react"

export interface TextInputProps {
    onChange: (evt: any) => void;
    value: string;
    placeholder?: string;
    cssClasses?: string;
    disabled?: boolean;
    onBlur?: (evt: any) => void;
}

class TextInput extends React.Component<TextInputProps> {
    render() {
        let value = this.props.value ? this.props.value : "";
        return (
            <div className="text-input-container">
                <input type="text"
                        onChange={this.props.onChange}
                        onBlur={this.props.onBlur}
                        value={value}
                        placeholder={this.props.placeholder}
                        disabled={this.props.disabled !== undefined ? this.props.disabled : false}
                        className={this.props.cssClasses} /> 
            </div>
        )
    }
}

export default TextInput;