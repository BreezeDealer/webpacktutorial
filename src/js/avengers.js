import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Button, Modal } from 'react-bootstrap';
var css = require("../scss/app.scss");

const Images = [
    {
        avatar: "http://oyvypldwv.bkt.clouddn.com/thor.png"
    }
]

class Example extends React.Component {
    componentWillMount = () => {
        this.setState({ showModal: false })
    }
    close = () => {
        this.setState({ showModal: false })
    }
    open = () => {
        this.setState({ showModal: true })
    }

    render() {
        return (
            <div>
                <p>点击按钮感受一下弹出的对话框。</p>
                <Button
                    bsStyle="primary"
                    bsSize="large"
                    onClick={ this.open }          >
                    弹出示例对话框
                </Button>

                <Modal show={ this.state.showModal } onHide={ this.close }>
                    <Modal.Header closeButton>
                        <Modal.Title>对话框标题</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>对话框的正文</h4>
                        <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={ this.close }>取消</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
class ImgBox extends React.Component {
    constructor(props) {
        super(props);
    }

    handleModal = () => {
        $("#myModal").modal();
    }

    render() {
        const images = this.props.images;
        return (
            <div className="container">
                {
                    this.props.images.map((item, index) => {
                        return (
                            <img
                                key={ index }
                                onClick={ this.handleModal }
                                src={ item.avatar }
                                className="img-circle" />
                        )

                    })
                }
                <Example />
            </div>
        )
    }
}

ReactDOM.render(
    <ImgBox images={ Images } />,
    document.getElementById("root")
)