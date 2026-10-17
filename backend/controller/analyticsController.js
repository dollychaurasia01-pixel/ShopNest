const User = require('../model/User');
const Product = require('../model/Product');
const Order = require('../model/Order');

const getAdminStats = async(req,res)=> {
    try{
        const totalUsers = await User.countDocuments({role:'user'});
         const totalOrders = await User.countDocuments({});
          const totalProducts = await User.countDocuments({});

          const orders = await Order.find({});

          const totalRevenueData =  orders.reduce((acc,order)=> acc+order.totalAmount,0)

          res.json({
            totalUsers,
            totalOrders,
            totalProducts,
            totalRevenue:totalRevenueData
          });

          

    }
    catch(error){
        res.status(500).json({message:'Error fetching stats',error});
    }
};

module.exports={getAdminStats};