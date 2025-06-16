const productModel = require("../models/Product");
const authModal = require("../models/Auth");

class Product {
  async getAllProducts(req, res) {
    try {
      const getData = await productModel.find({ isDeleted: false });
  
      if (getData) {
        res
          .status(200)
          .json({ message: "Products Fetched Successfully", data: getData });
      }
      res.status(404).json({ message: "Products Not Found" });
    } catch (error) {
      console.error("❌ Backend Error in getAllProducts:", error);
      res.status(500).json({ message: "Internal Server Error", error }); 
    }
  }

  async getSingleProduct(req, res) {
    const { id } = req.params;

    const checkProduct = await productModel.findById(id);

    if (checkProduct) {
      res
        .status(200)
        .json({ message: "Product Details Found", data: checkProduct });
    }
    res.status(400).json({ message: "No Product Details Found" });
  }

  async addProduct(req, res) {
    const { name, description, price, category, stock } = req.body;
    const image = req.file.filename;

    try {
      const checkProduct = await productModel.findOne({ name });

    if (checkProduct) {
      return res.status(400).json({ message: "Product Already Added" });
    }
    const product = new productModel({
      name,
      description,
      price,
      category,
      stock,
      image,
    });

    await product.save();

    res
      .status(201)
      .json({ message: "Product Added Successfully", data: product });
    } catch (error) {
      res.status(500).json({message: error})
    }
  }

   async editProduct(req, res) {
  try {
    const { name, description, price, category, stock } = req.body;
    const { id } = req.params;

    const data = await productModel.findById(id);
    if (!data) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    const image = req.file ? req.file.filename : null;

    if (name) data.name = name;
    if (description) data.description = description;
    if (price) data.price = price;
    if (category) data.category = category;
    if (stock) data.stock = stock;
    if (image) data.image = image;

    await data.save();

    return res
      .status(200)
      .json({ message: "Product Updated Successfully", data });

  } catch (error) {
    console.error("❌ Backend Error in editProduct:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
}

  async deleteProduct(req, res) {
    const { id } = req.body;

    const data = await productModel.findByIdAndUpdate(id, { isDeleted: true });

    if (data) {
      res.status(200).json({ message: "Product Deleted Successfully" });
    }
    return res.status(400).json({ message: "Product Cannot be Deleted" });
  }
}

const obj = new Product();
module.exports = obj;
