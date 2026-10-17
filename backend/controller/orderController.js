const Order = require('../model/Order');

const sendEmail = require('../utils/sendEmail');

//create a new order

const createOrder = async(req,res) => {
    try{
        const {items , totalAmount, address, paymentId} = req.body;

        if(!items || items.length ===0 || !totalAmount || !address) {
            return res.status(400).json({message:'Invalid order data'});
        }

         else {
            const order = new Order({
                user: req.user._id,
                items,
                totalAmount,
                address,
                paymentId
            });

            await order.save();
            await sendEmail(req.user.email , 'order created','your order has been created');
            res.status(201).json({message:'order created successfully',order});
         }

    }  catch(error) {
        res.status(500).json({message: 'error creating order',error});
    }
};


//get myorders

const myOrders = async(req,res) => {
    try{
        const orders = await Order.find({user: req.user._id}).populate('items.productId','name price');
        res.json(orders);
        const order = await Order.findById(req.params.id).populate
    }
    catch(error){
        res.status(500).json({message:'Error Fetching Orders', error});
    }
};

//byadmin- get all orders

const getOrders = async(req,res) => {
    try{
          const orders = await Order.find({}).populate('user', 'id name')
          res.json(orders);
    }catch(error){
        res.status(500).json({message:'error fetching orders',error});

    }
};

const updateOrderStatus = async(req,res)=> {
    try{

        const {status} = req.body;
        const order = await Order.findById(req.params.id);

        if(order) {
            order.status = status;
            await order.save();
            res.json({message:'order status updated',order});
        }else {
            res.status(404).json({message:'order not found'});
        }

    }catch(error){
           res.status(500).json({message:'error updating order status', error});
    }
};


module.exports = { createOrder , getOrders,myOrders, updateOrderStatus};