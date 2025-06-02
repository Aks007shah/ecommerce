import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Product() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    onHandleProduct();
  }, []);

  const onHandleProduct = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5100/product/getproducts/"
      );
      if (response.status === 200) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const filteredProduct = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="py-4"
      style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}
    >
      <h2 className="text-center mb-4">Our Products</h2>
      <div className="container">
        <div className="container justify-content-center align-items-center">
          <div className="row justify-content-center align-items-center">
            <div className="col-sm-5 justify-content-center align-items-center">
              <input
            className="form-control m-5"
            type="text" placeholder="Search Product Here..."
            onChange={(e) => setSearchTerm(e.target.value)}
            name=""
            id=""
          />
            </div>
          </div>
        </div>
        <div className="row g-4">
          {filteredProduct.map((item) => (
            <div className="col-sm-6 col-md-4 col-lg-3" key={item._id}>
              <div className="card h-100 shadow-sm border-0 rounded-4 product-card transition">
                <Link to={`/product/${item._id}`}>
                  <img
                    src={`http://localhost:5100/uploads/${item.image}`}
                    alt={item.name}
                    className="card-img-top rounded-top-4"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                </Link>
                <div className="card-body text-start p-3">
                  <h5 className="card-title mb-2 fw-semibold">{item.name}</h5>
                  <p className="card-text text-muted mb-1">
                    <strong>Description:</strong> {item.description}
                  </p>
                  <p className="card-text text-muted mb-1">
                    <strong>Category:</strong> {item.category}
                  </p>
                  <p className="card-text text-muted mb-1">
                    <strong>Price:</strong> ${item.price}
                  </p>
                  <p className="card-text text-muted">
                    <strong>Stock:</strong> {item.stock}
                  </p>
                </div>
                <div className="card-footer bg-white border-0 d-flex justify-content-between px-3 pb-3">
                  <button className="btn btn-sm btn-outline-danger">
                    Wishlist
                  </button>
                  <button className="btn btn-sm btn-primary">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Optional card hover effect */}
      <style>{`
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }
        .transition {
          transition: all 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default Product;
