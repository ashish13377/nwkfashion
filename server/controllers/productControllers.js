const Product = require('../config/models/product');
const Category = require('../config/models/category');

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get a specific product by ID
const getProductById = async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Create a new product
// const createProduct = async (req, res) => {
//     try {
//         const { imageSrc, title, rating, sizes, colors, price, categoryName } = req.body;

//         if (!imageSrc || !title || !rating || !sizes || !colors || !price || !categoryName) {
//             return res.status(422).json({ error: 'Please enter all the required fields' });
//         }

//         const category = await Category.findOne({ name: categoryName });
//         if (!category) {
//             return res.status(404).json({ error: 'Category not found' });
//         }

//         const product = new Product({
//             imageSrc,
//             title,
//             rating,
//             sizes,
//             colors,
//             price,
//             categoryId: category._id,
//         });

//         const createdProduct = await product.save();
//         res.status(201).json(createdProduct);
//     } catch (error) {
//         console.error('Error creating product:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

const createProduct = async (req, res) => {
    try {
      const {
        imageSrc,
        title,
        rating,
        sizes,
        colors,
        price,
        categoryId,
        categoryName,
        description,
        availability,
        quantity,
        socialMedia,
        compositions,
        styles,
        properties,
        zoomImage,
        image,
      } = req.body;
  
      if (
        !imageSrc ||
        !title ||
        !rating ||
        !sizes ||
        !colors ||
        !price ||
        !categoryId ||
        !categoryName ||
        !description ||
        !availability ||
        !quantity ||
        !socialMedia ||
        !compositions ||
        !styles ||
        !properties ||
        !zoomImage ||
        !image
      ) {
        return res.status(422).json({ error: 'Please enter all the required fields' });
      }
  
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
  
      const product = new Product({
        imageSrc,
        title,
        rating,
        sizes,
        colors,
        price,
        categoryId: category._id,
        categoryName,
        description,
        availability,
        quantity,
        socialMedia,
        compositions,
        styles,
        properties,
        zoomImage,
        image,
      });
  
      const createdProduct = await product.save();
      res.status(201).json(createdProduct);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

// Update a product by ID
// const updateProduct = async (req, res) => {
//     try {
//         const productId = req.params.productId;
//         const { imageSrc, title, rating, sizes, colors, price, categoryName } = req.body;

//         if (!imageSrc || !title || !rating || !sizes || !colors || !price || !categoryName) {
//             return res.status(422).json({ error: 'Please enter all the required fields' });
//         }

//         const category = await Category.findOne({ name: categoryName });
//         if (!category) {
//             return res.status(404).json({ error: 'Category not found' });
//         }

//         const updatedProduct = await Product.findByIdAndUpdate(
//             productId,
//             {
//                 imageSrc,
//                 title,
//                 rating,
//                 sizes,
//                 colors,
//                 price,
//                 categoryId: category._id,
//             },
//             { new: true }
//         );

//         if (!updatedProduct) {
//             return res.status(404).json({ error: 'Product not found' });
//         }

//         res.json(updatedProduct);
//     } catch (error) {
//         console.error('Error updating product:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };
const updateProduct = async (req, res) => {
    try {
      const productId = req.params.productId;
      const {
        imageSrc,
        title,
        rating,
        sizes,
        colors,
        price,
        categoryId,
        categoryName,
        description,
        availability,
        quantity,
        socialMedia,
        compositions,
        styles,
        properties,
        zoomImage,
        image,
      } = req.body;
  
      if (
        !imageSrc ||
        !title ||
        !rating ||
        !sizes ||
        !colors ||
        !price ||
        !categoryId ||
        !categoryName ||
        !description ||
        !availability ||
        !quantity ||
        !socialMedia ||
        !compositions ||
        !styles ||
        !properties ||
        !zoomImage ||
        !image
      ) {
        return res.status(422).json({ error: 'Please enter all the required fields' });
      }
  
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
  
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        {
          imageSrc,
          title,
          rating,
          sizes,
          colors,
          price,
          categoryId: category._id,
          categoryName,
          description,
          availability,
          quantity,
          socialMedia,
          compositions,
          styles,
          properties,
          zoomImage,
          image,
        },
        { new: true }
      );
  
      if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      res.json(updatedProduct);
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

// Delete a product by ID
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const deletedProduct = await Product.findByIdAndRemove(productId);

        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get all categories
const getAllCate = async (req, res) => {
    try {
      const categories = await Category.find();
      console.log(categories)
    //   res.json(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

// Get a specific category by ID
const getCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        console.error('Error fetching category:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Create a new category
const createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(422).json({ error: 'Please enter the category name' });
        }

        const category = new Category({
            name,
        });

        const createdCategory = await category.save();
        res.status(201).json(createdCategory);
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get all products by category name
const getProductsByCategory = async (req, res) => {
    try {
        const categoryName = req.params.categoryName;
        const category = await Category.findOne({ name: categoryName });

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        const products = await Product.find({ categoryId: category._id });
        res.json(products);
    } catch (error) {
        console.error('Error fetching products by category:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getAllCate,
    getCategoryById,
    createCategory,
    getProductsByCategory
};