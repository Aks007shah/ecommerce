import React from 'react';
import Product from './Product';
import { Link } from 'react-router-dom';

function Homepage(props) {
    return (
        <>
        <div className='container-fluid'>
            <h1 className='text-center'>Welcome to Brands <span className='text-center text-danger'>Era</span></h1>
            <h4 className='text-center text-danger'>Get the Latest Brand Styles here...</h4>
        </div>

        <div className='container-fluid'>
            <Product/>
        </div>

          <div>
        <Link to='/addproduct'>Add Product</Link>
        <Link to='/modifyproduct'>Edit Product</Link>
        <Link to='/userdata'>All User Product</Link>
      </div>
        </>
    );
}

export default Homepage;