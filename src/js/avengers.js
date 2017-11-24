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

    }

    render() {
        const {isLoading} = this.state;
        return (
            <div>
                <header>
                    <img src={image} alt=""/>
                    <h1>Collapsible Content</h1>
                </header>
                <div className={`content ${isLoading ? 'is-loading' : ''}`}>
                    <div className="panel-group">
                        <Collapsible title="清平调·其二" author="李白">
                            <p>一枝红艳露凝香，云雨巫山枉断肠。</p>
                            <p>借问汉宫谁得似，可怜飞燕倚新妆。</p>
                        </Collapsible>
                        <Collapsible title="汉宫曲" author="徐凝">
                            <p>水色帘前流玉霜，赵家飞燕侍昭阳。</p>
                            <p>掌中舞罢箫声绝，三十六宫秋夜长。</p>
                        </Collapsible>
                        <Collapsible title="赵飞燕" author="张耒">
                            <p>苦心膏沐不论赀，富贵人生各有时。</p>
                            <p>直使中流畏仙去，君王何啻似婴儿。</p>
                        </Collapsible>
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