import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetchProduct();
  });

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5100/product/getsingleproduct/${id}`
      );
      if (response.status === 200) {
        setProduct(response.data.data);
        setMsg(response.message);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={`http://localhost:5100/uploads/${product.image}`}
            alt={product.name}
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p>
            <strong>Description:</strong> {product.description}
          </p>
          <p>
            <strong>Category:</strong> {product.category}
          </p>
          <p>
            <strong>Price:</strong> ₹{product.price}
          </p>
          <p>
            <strong>Stock:</strong> {product.stock}
          </p>
          <button className="btn btn-success">Add to Cart</button>
          <div>{msg}</div>

          <div className="mt-3">
            <div class="accordion accordion-flush" id="accordionFlushExample">
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                  >
                    More Details About: {product.name}
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  class="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div class="accordion-body">
                    {product.description}: Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Saepe molestiae, aperiam
                    placeat quasi commodi ab mollitia quidem maiores cumque
                    facilis ad aliquid in harum ratione nesciunt pariatur dolor,
                    atque porro deleniti voluptas. Iusto voluptate cum esse
                    facilis porro recusandae, deserunt illo est ea fuga
                    consequatur earum blanditiis? Illum tempore et beatae earum
                    exercitationem recusandae nemo amet nesciunt ut placeat
                    itaque aperiam harum animi cum, veniam sit non, culpa ex
                    magnam laudantium hic nam voluptas. Qui perspiciatis sequi
                    corrupti molestiae sunt!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Link to='/addproduct'>Add Product</Link>
        <Link to='/modifyproduct'>Edit Product</Link>
        <Link to='/userdata'>All User Product</Link>
      </div>
    </div>
  );
}

export default SingleProduct;
