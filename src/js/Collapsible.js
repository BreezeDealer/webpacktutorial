import React from 'react';

export default class Collapsible extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const children = this.props.children;
        return (
            <div className="container">
                <h4>{this.props.title}</h4>
                <div className="panel">
                    {children}
                </div>
            </div>
        )
    }
}