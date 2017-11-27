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

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        fetch('https://randomuser.me/api?results=30&nat=uk,fr')
        .then(response => response.json())
        .then(parsedJSON => parsedJSON.map(user => (
            {
                name: `${user.name.first} ${user.name.last}`,
                username: `${user.login.username}`,
                location: `${location.street} ${location.city}`,
                email: `${user.email}`,
                
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
                            type="button" 
                            className="btn btn-danger" 
                            value="加载联系人" />
                    </h1>
                </header>
                <div className={`content ${isLoading ? 'is-loading' : ''}`}>
                    <div className="panel-group">
                        {
                            !isLoading && contacts.length > 0 ? contacts.map(contact => {
                                return (
                                    <Collapsible title="清平调·其二" author="李白">
                                        <p>一枝红艳露凝香，云雨巫山枉断肠。</p>
                                        <p>借问汉宫谁得似，可怜飞燕倚新妆。</p>
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