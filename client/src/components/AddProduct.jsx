import React, { useState } from "react";
import axios from "axios";

function AddProduct() {
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  const [image, setImage] = useState(null);
  const [msg, setMsg] = useState();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setImage(files[0]);
    } else {
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (
        !data.name ||
        !data.description ||
        !data.price ||
        !data.category ||
        !data.stock
      ) {
        return window.alert("Please fill all field");
      }

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", Number(data.price));
      formData.append("category", data.category);
      formData.append("stock", Number(data.stock));
      if (image) {
        formData.append("image", image);
      }

      const response = await axios.post(
        "http://localhost:5100/product/addproducts",
        formData
      );

      if (response.status === 201) {
        setMsg(response.data.message);

        setData({
          name: "",
          description: "",
          price: "",
          category: "",
          stock: "",
        });
        setImage(null);
        setMsg("");
      } else {
        setMsg(response?.error?.message || "Error Adding Product");
      }
    } catch (error) {
      console.log(error);
      setMsg("Error While Adding Product");
    }
  };

  const onHandleRefresh = (e) => {
    window.location.reload();
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center">Add Product</h3>
      <p className="text-center text-success">{msg}</p>
      <form className="form-control" onSubmit={handleSubmit}>
        <input
          className="form-control mt-2"
          type="text"
          name="name"
          placeholder="Product Name"
          value={data.name}
          onChange={handleChange}
        />
        <input
          className="form-control mt-2"
          type="text"
          name="description"
          placeholder="Description"
          value={data.description}
          onChange={handleChange}
        />
        <input
          className="form-control mt-2"
          type="number"
          name="price"
          placeholder="Price"
          value={data.price}
          onChange={handleChange}
        />
        <input
          className="form-control mt-2"
          type="text"
          name="category"
          placeholder="Category"
          value={data.category}
          onChange={handleChange}
        />
        <select
          className="form-control mt-2"
          name="stock"
          value={data.stock}
          onChange={handleChange}
        >
          <option value="">Select Stock</option>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          className="form-control mt-2"
          type="file"
          name="image"
          onChange={handleChange}
        />
        <button className="btn btn-success mt-3">Submit</button>
        <button onClick={onHandleRefresh} className="btn btn-success mt-3">
          Refresh
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
