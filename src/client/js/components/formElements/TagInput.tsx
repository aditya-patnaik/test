import * as React from "react"
import {ChangeEvent} from "react";
import TextInput from "./TextInput";

export interface TagInputProps {
    onChange: (input: string) => Promise<any[]>;
    placeholder?: string;
    cssClasses?: string;
    disabled?: boolean;
    options?: string[];
    onOptionSelect?: (option: string) => void;
    tags?: string[];
}

interface TagInputState {
    text: string;
    options: string[];
}

class TagInput extends React.Component<TagInputProps, TagInputState> {
    constructor(props: TagInputProps) {
        super(props);
        this.state = {
            text: "",
            options: []
        }
    }
    onTextChange = (evt: any) => {
        let text = evt.target.value;
        this.setState({text}, () => {
            this.props.onChange(text).then((data: any[]) => {
                this.setState({
                    options: data
                })
            })
        })
    }
    onTextInputBlur = (evt: any) => {
        setTimeout(() => {
            this.setState({
                options: []
            })
        }, 100)
    }
    onOptionSelect = (option: any) => {
        this.setState({
            text: ""
        }, () => {
            this.props.onOptionSelect(option);
        })
    }
    render() {
        return (
            <div className="tag-input-container">
                {
                    this.props.tags &&
                        <div className={"tags-container"}>
                            {
                                this.props.tags.map((tag: string, index: number) => {
                                    return <span key={index} className={"tag"}>{tag}</span>
                                })
                            }
                        </div>
                }
                <div className={"text-input-wrapper"}>
                    <TextInput onChange={this.onTextChange}
                               onBlur={this.onTextInputBlur}
                               value={this.state.text}
                               disabled={this.props.disabled !== undefined ? this.props.disabled : false}
                               cssClasses={this.props.cssClasses}
                               placeholder={"Start typing to get suggestions"}/>
                    {
                        this.state.options &&
                        <div className={"options-container"}>
                            {
                                this.state.options.map((option: string, index: number) => {
                                    return <div key={index} className={"option"} onClick={(evt: any) => {
                                        this.onOptionSelect(option)}
                                    }>{option}</div>
                                })
                            }
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default TagInput;