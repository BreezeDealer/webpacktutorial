import React from 'react';
import PropTypes from 'prop-types';

export default class Collapsible extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isExpanded: false
        }
    }

    handleToggle = e => {
        e.preventDefault();
        this.setState({
            isExpanded: !this.state.isExpanded,
            height: this.refs.inner.clientHeight
        })
    }

    render() {
        const {title, author, children} = this.props;
        const {isExpanded, height} = this.state;
        const currentHeight = isExpanded ? height : 0;
        return (
            <div 
                className={`panel ${isExpanded ? 'is-expanded' : ''}`}
                onClick={this.handleToggle}
            >
                <div className="panel-heading">
                    <h3>{title}</h3>
                </div>
                <div className="panel-collapse" 
                    style={{height: currentHeight + 'px'}}
                >
                    <div className="panel-body"
                        ref="inner"
                    >   
                        <h4>{author}</h4>
                        {children}
                    </div>
                </div>
            </div>
        )
    }
}