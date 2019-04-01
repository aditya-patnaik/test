import * as React from "react"
import * as _ from "lodash"

export interface CustomDropdownProps {
    selectedItem: string;
    dropdownItems: string[];
    onItemSelect: (item: string) => void;
}

class CustomDropdown extends React.Component<CustomDropdownProps> {
    render() {
        let selectedItem = !_.isEmpty(this.props.selectedItem) ? this.props.selectedItem : "Select";
        let isDefaultOption = _.isEmpty(this.props.selectedItem);
        return (
            <div className={"custom-dropdown-container"}>
                <div className={`main-label ${isDefaultOption ? "default" : ""}`}>
                    {selectedItem}
                    <i className={"fas fa-angle-down"}></i>
                </div>
                {
                    this.props.dropdownItems.length > 0 &&
                    <div className={"dropdown-options-container"}>
                        {
                            _.map(this.props.dropdownItems, (item: string, index:number) => {
                                return <div key={index} className={"dropdown-item"} onClick={(evt) => this.props.onItemSelect(item)}>{item}</div>
                            })
                        }
                    </div>
                }
            </div>
        )
    }
}

export default CustomDropdown;