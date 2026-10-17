const Product = require('../model/Product');
const cloudinary = require('../config/cloudinary');

//GET ALL PRODUCTS

const getProducts = async(req,res) => {
     try{
        const products = await Product.find({});
        res.json(products);
     } catch(error){
        res.status(500).json({message:'server error'});
     }
};

const  getProductById = async(req,res) =>{
    try {
        const product = await Product.findById(req.params.id);
        if(product) {
            res.json(product);
        }

        else{
            res.status(404).json({message:'Product not found'});
        }
    } catch(error){
        res.status(500).json({message:'server error'});
    }
};


const createProduct = async(req,res) => {
    try{
        const {name,description,price,category,stock } = req.body;
        let imageUrl = '';
        if(req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
        }

        const product = new Product ({
            name,
            description,
            price,
            category,
            stock,
            imageUrl
        });

        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch(error) {
           console.log(error);
        res.status(500).json({message:'server error'});
    }
};


const updateProduct = async(req,res) => {
    try{
        const {name,description,price,category,stock} = req.body;
        const product = await Product.findById(req.params.id);

        if(product) 
        {
            product.name = name || product.name;
            product.description = description|| product.description;
            product.price = price|| product.price;
            product.category = category || product.category;
            product.stock = stock|| product.stock; 

            if(req.file) {
                const result = await cloudinary.uploader.upload(req.file.path);
                console.log(result);
                product.imageUrl = result.secure_url;
            }  

            const updatedProduct = await product.save();
            res.json(updatedProduct);

        }

        else {
            res.status(500).json({message:'Product not Found'});
        }
    }
    catch(error){
        console.log(error);
          res.status(500).json({message:'server error'});
    }
};


//delete product

const deleteProduct = async(req,res) => {
    try {
        const product = await Product.findById(req.params.id);

        if(product){
            await Product.findByIdAndDelete(req.params.id);
            res.json({message:'Product removed'});
        }  

        else {
            res.status(404).json({message:'product not found'});
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'serveer error'});
    }
};


module.exports = {  getProducts,
    createProduct,
    getProductById, 
    updateProduct,
    deleteProduct,

};