import React from 'react';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            buyItems: ["milk", "bread", "fruit"]
        }
    }

    addItem(e){
        e.preventDefault();
        const {buyItems} = this.state;
        const newItem = this.newItem.value;

        this.setState({
            buyItems: [...this.state.buyItems, newItem]
        })

        this.addForm.reset()
    }

    render(){
        const {buyItems} = this.state;
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
                                            <td><button className="btn btn-default">Delete</button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default App;