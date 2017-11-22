import React from 'react';
import ReactDOM from 'react-dom';
import Collapsible from './Collapsible';

class Expandable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <header>
                    <img src="" alt=""/>
                    <h1>Collapsible Content</h1>
                </header>
                <div className="content">
                    <div className="panel-group">
                        <Collapsible title="Overview">
                            <p>一枝红艳露凝香，雨云巫山枉断肠。</p>
                        </Collapsible>
                        <div className="panel">
                            <div className="panel-heading">
                                <h2>Reviews</h2>
                            </div>
                        </div>
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