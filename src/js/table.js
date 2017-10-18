import React from 'react';
import ReactDOM from 'react-dom';

const PRODUCT = [
    { category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football" },
    { category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball" },
    { category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball" },
    { category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch" },
    { category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5" },
    { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" }
];
//商品列表
class ProductRow extends React.Component {
    render() {
        return(
            <tr>
                <td>{this.props.index+1}</td>
                <td>{this.props.product.name}</td>
                <td>{this.props.product.price}</td>
            </tr>
        )
    }
}
//商品种类
class ProductCategoryRow extends React.Component {
    render() {
        return(
            <tr className="info">
                <th colSpan="3">{this.props.category}</th>
            </tr>
        )
    }
}
//商品表
class ProductTable extends React.Component {
    render() {
        var rows = [];
        var lastCategory = null;
        this.props.products.forEach( (product, index) => {
            if(product.category !== lastCategory) {
                rows.push(
                    <ProductCategoryRow category={product.category} key={product.category} />
                )
            }
            rows.push(
                <ProductRow index={index} product={product} key={product.name} />
            );
            lastCategory = product.category;
        })
        return(
            <table className="table table table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        )
    }
}
//搜索框
class SearchBar extends React.Component {
    render() {
        return(
            <div>
                <form className="form-group">
                    <input 
                        placeholder="搜索..."
                        className="form-control" />
                    <div className="checkbox">
                        <label>
                            <input type="checkbox"/>
                            Only show product in stock
                        </label>
                    </div>
                </form>
            </div>
        )
    }
}
//外围
class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const data = this.props.product;
        return (
            <div className="container">
                <SearchBar />
                <ProductTable products={data} />
            </div>
        )
    }
}

ReactDOM.render(
    <FilterableProductTable product={PRODUCT} />,
    document.getElementById("root")
)