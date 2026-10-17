const express=require("express");
const cors= require("cors");
const { rateLimit } = require("express-rate-limit");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes=require("./routes/authRoutes");
dotenv.config();
connectDB();

const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: "Too many requests. Please try again later." },
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: "Too many authentication attempts. Please try again later." },
});

app.use("/api", apiLimiter);
app.use("/api/auth", authLimiter);

app.get("/",(req,res)=> {
    res.send("shopNest!!");
});

app.use('/api/auth' , userRoutes);
app.use('/api/products' , require('./routes/productRoutes'));
app.use('/api/orders' , require('./routes/orderRoutes'));
app.use('/api/payment' , require('./routes/paymentRoutes'));
app.use('/api/analytics' , require('./routes/analyticsRoutes'));





const PORT = process.env.PORT || 5000;
app.listen(PORT , ()=> {
    console.log(`server is running on port ${PORT} `);
});


