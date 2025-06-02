import axios from "axios";
import { useEffect, useState } from "react";

function ModifyProduct() {
  const [data, setData] = useState([]);
  const [selectProduct, setSelectProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });
  const [editId, setEditId] = useState(null);
  const [msg, setMsg] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5100/product/getproducts/"
      );
      if (response.status === 200) {
        setData(response.data.data);
        setMsg(response.data.message);
      } else {
        setMsg(response.data.message);
      }

      setTimeout(() => {
        setMsg("");
      }, 1500);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const onHandleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setImage(files[0]);
    } else {
      setSelectProduct((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const editProduct = (id) => {
    const productToEdit = data.find((item) => item._id === id);

    if (productToEdit) {
      setEditId(id);

      setSelectProduct({
        name: productToEdit.name || "",
        description: productToEdit.description || "",
        price: productToEdit.price || "",
        category: productToEdit.category || "",
        stock: productToEdit.stock || "",
      });
    }
  };

  const updateProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("name", selectProduct.name);
      formData.append("description", selectProduct.description);
      formData.append("price", Number(selectProduct.price));
      formData.append("category", selectProduct.category);
      formData.append("stock", Number(selectProduct.stock));
      if (image) formData.append("image", image);

      const response = await axios.put(
        `http://localhost:5100/product/editproduct/${editId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("✅ Update Success:", response.data);
      if (response.status === 200) {
        setMsg(response.data.message || "");

        setTimeout(() => {
          fetchProducts();
          setMsg("");
        }, [1500]);
      } else {
        setMsg("");
      }
    } catch (error) {
      console.error("❌ Update Error", error);
    }
  };

  return (
    <>
      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Product
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <form className="form-control">
                <input
                  onChange={onHandleChange}
                  className="form-control my-2"
                  type="text"
                  value={selectProduct.name}
                  name="name"
                  placeholder="Enter Name"
                />
                <input
                  onChange={onHandleChange}
                  className="form-control my-2"
                  type="text"
                  value={selectProduct.description}
                  name="description"
                  placeholder="Enter Description"
                />
                <input
                  onChange={onHandleChange}
                  className="form-control my-2"
                  type="number"
                  value={selectProduct.price}
                  name="price"
                  placeholder="Enter Price"
                />
                <input
                  onChange={onHandleChange}
                  className="form-control my-2"
                  type="text"
                  value={selectProduct.category}
                  name="category"
                  placeholder="Enter Category"
                />
                <input
                  onChange={onHandleChange}
                  className="form-control my-2"
                  type="number"
                  value={selectProduct.stock}
                  name="stock"
                  placeholder="Enter Stock (Max 10)"
                  max="10"
                />
                <input
                  onChange={onHandleChange}
                  className="form-control my-2"
                  type="file"
                  name="image"
                />
              </form>
            </div>

            <div className="modal-footer">
              <div>{msg}</div>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={updateProduct}
                type="button"
                className="btn btn-primary"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center">
          <div className="col-sm-9">
            <table className="table table-primary table-striped mt-3">
              <thead>
                <tr>
                  <th className="p-3">Sr No.</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">Edit</th>
                  <th className="p-3">Delete</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={item._id}>
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{item.name}</td>
                    <td className="p-3">{item.description}</td>
                    <td className="p-3">{item.price}</td>
                    <td className="p-3">{item.category}</td>
                    <td className="p-3">{item.stock}</td>
                    <td className="p-3">
                      <button
                        className="btn btn-warning"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => editProduct(item._id)}
                      >
                        Edit
                      </button>
                    </td>
                    <td className="p-3">
                      <button className="btn btn-danger">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {msg && <div className="alert alert-info mt-3">{msg}</div>}
          </div>
        </div>
      </div>
    </>
  );
}

export default ModifyProduct;
