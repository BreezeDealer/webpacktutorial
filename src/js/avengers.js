import React from 'react';
import ReactDOM from 'react-dom';
import Collapsible from './Collapsible';
import image from '../images/preload.svg';
var CSS = require('../scss/avengers.scss');

class Expandable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            contacts: []
        }
    }

    componentWillMount() {
        localStorage.getItem && this.setState({
            contacts: JSON.parse(localStorage.getItem('contacts')),
            isLoading: false
        })
    }

    componentDidMount() {
        if(!localStorage.getItem('contacts')) {  
            this.fetchData();
        } else {
            console.log('Using data form localstorage!');
        }
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('contacts', JSON.stringify(nextState.contacts));
        localStorage.setItem('contactsDate', Date.now());
    } 

    fetchData = () => {
        fetch('https://randomuser.me/api?results=5&nat=us')
        .then(response => response.json())
        .then(parsedJSON => parsedJSON.results.map(user => (
            {
                avatar: `${user.picture.medium}`,
                name: `${user.name.first} ${user.name.last}`,
                username: `${user.login.username}`,
                location: `${user.location.street} ${user.location.city}`,
                email: `${user.email}`
            }
        )))
        .then(contacts => this.setState({
            contacts,
            isLoading: false
        }))
        .catch(error => console.log('parsing failed', error))
    }

    render() {
        const {isLoading, contacts} = this.state;
        return (
            <div>
                <header>
                    <img src={image} alt=""/>
                    <h1>Fetching Data 
                        <input 
                            onClick={this.fetchData}
                            type="button" 
                            className="btn btn-danger" 
                            value="加载联系人" />
                    </h1>
                </header>
                <div className={`content ${isLoading ? 'is-loading' : ''}`}>
                    <div className="panel-group">
                        {
                            !isLoading && contacts.length > 0 ? contacts.map((contact, i) => {
                                return (
                                    <Collapsible key={i} contact={contact}>
                                    </Collapsible>
                                )
                            }) : null
                        }
                    </div>
                    <div className="loader">
                        <div className="icon"></div>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <Expandable />,
    document.getElementById("root")
)