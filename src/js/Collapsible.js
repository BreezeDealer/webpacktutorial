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
        const {avatar, name, username, location, email} = this.props.contact;
        const {isExpanded, height} = this.state;
        const currentHeight = isExpanded ? height : 0;
        return (
            <div 
                className={`panel ${isExpanded ? 'is-expanded' : ''}`}
            >
                <div className="panel-heading" onClick={this.handleToggle}>
                    <h3>{name}</h3>
                </div>
                <div className="panel-collapse" 
                    style={{height: currentHeight + 'px'}}
                >
                    <div className="panel-body"
                        ref="inner"
                    >   
                        <img src={avatar} alt="" className="img-circle"/>
                        <p>用户名：{username}</p>
                        <p>地址：{location}</p>
                        <p>邮箱：{email}</p>
                    </div>
                </div>
            </div>
        )
    }
}