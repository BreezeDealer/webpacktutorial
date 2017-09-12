import React from 'react';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            buyItems: ["milk", "bread", "fruit"],
            message: ""
        }
    }

    addItem(e){
        e.preventDefault();
        const {buyItems} = this.state;
        const newItem = this.newItem.value;
        const isOnTheList = buyItems.includes(newItem);
        if(isOnTheList){
            this.setState({
                message: "The item is already on the list."
            })
        }else{
            newItem !== "" && this.setState({
                buyItems: [...this.state.buyItems, newItem],
                message: ""
            })
        }

        this.addForm.reset()
    }

    removeItem(item){
        const newBuyItems = this.state.buyItems.filter(buyItem => {
            return buyItem !== item;
        });

        this.setState({
            buyItems: [...newBuyItems]
        })

        if(newBuyItems.length ===0){
            this.setState({
                message: "No items on your list, add some."
            })
        }
    }

    clearAll(){
        this.setState({
            buyItems: [],
            message: "No items on your list, add some."
        })
    }

    render(){
        const {buyItems, message} = this.state;
        return(
            <div className="col-md-9">
                <header className="panel text-center">
                    <h1>Shopping List</h1>

                    <form ref={input => this.addForm = input} className="form-inline" onSubmit={(e) => {this.addItem(e)}}>
                        <div className="form-group">
                            <label htmlFor="newItemInput" className="sr-only">Add New Item</label>
                            <input ref={input => this.newItem = input} type="text" placeholder="Bread" className="form-control" id="newItemInput" />
                            <button type="submit" className="btn btn-primary">Add</button>
                        </div>
                    </form>
                </header>
                {
                    (message !== "" || buyItems.length === 0) && <p className="alert alert-danger">{message}</p>
                }
                
                {
                    buyItems.length > 0 && 
                    <div className="panel panel-default">
                        <div className="panel-heading">Shopping List</div>
                        <table className="table"> 
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Item</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    buyItems.map((item,index) => {
                                        return (
                                            <tr key={item}>
                                                <th scope="row">{index+1}</th>
                                                <td>{item}</td>
                                                <td><button onClick={e => this.removeItem(item)} type="button" className="btn btn-default">Delete</button></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="2">&nbsp;</td>
                                    <td><button type="button" className="btn btn-info" onClick={e => this.clearAll()}>Clear List</button></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                }
            </div>
        )
    }
}

export default App;