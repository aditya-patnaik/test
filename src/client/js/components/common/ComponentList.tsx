import * as React from "react";
import * as _ from "lodash";

export interface ComponentListProps {
    rowComponent: any;
    data: any[];
    onRowAddition: () => void;
    onDataChange: (data: any[]) => void;
}

export interface ComponentListState {
    
}

class ComponentList extends React.Component<ComponentListProps, ComponentListState> {
    onRowRemove = (index: number) => {
        let currData = this.props.data;
        currData.splice(index, 1);
        this.props.onDataChange(currData);
    }
    onDataChange = (data: any, index: number) => {
        let currData = this.props.data;
        currData[index] = data;
        this.props.onDataChange(currData);
    }
    render() {
        let listData = this.props.data;
        let RowComponent = this.props.rowComponent;
        return (
            <div className={"component-list-container"}>
                {
                    _.isEmpty(listData) &&
                    <div className="empty-list-label">No data to show</div>
                }
                {
                    _.map(listData, (data, index) => {
                        return <div className="row-container" key={index}>
                                <div className="row-component-container">
                                    <RowComponent data={data} onDataChange={(data: any) => {
                                            this.onDataChange(data, index)
                                        }} />
                                </div>
                                <div className="remove-row-container">
                                    <button className="remove-row-button"
                                            onClick={this.onRowRemove.bind(this, index)}>x</button>
                                </div>
                            </div>
                    })
                }
                <div className="add-row-container">
                    <span onClick={this.props.onRowAddition}>+ Add occurence</span>
                </div>
            </div>
        )
    }
}

export default ComponentList;