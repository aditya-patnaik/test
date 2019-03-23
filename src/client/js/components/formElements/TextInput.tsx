import * as React from "react"

export interface TextInputProps {
    onChange: (evt: any) => void;
    value: string;
    placeholder?: string;
    cssClasses?: string;
}

class TextInput extends React.Component<TextInputProps> {
    render() {
        let value = this.props.value ? this.props.value : "";
        return (
            <div className="text-input-container">
                <input type="text"
                        onChange={this.props.onChange}
                        value={value}
                        placeholder={this.props.placeholder}
                        className={this.props.cssClasses} /> 
            </div>
        )
    }
}

export default TextInput;