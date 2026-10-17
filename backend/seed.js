require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Product = require("./model/Product");
const User = require("./model/User");

const products = [
	{
		name: "Everyday Canvas Tote",
		description: "A sturdy canvas tote for errands, books, and daily essentials.",
		price: "24.99",
		category: "Accessories",
		stock: "40",
		imageUrl: "https://placehold.co/600x600?text=Canvas+Tote",
		rating: "4.7",
		numReviews: "18",
	},
	{
		name: "Ceramic Coffee Mug",
		description: "A 350 ml glazed ceramic mug for coffee, tea, and everything between.",
		price: "14.50",
		category: "Home",
		stock: "65",
		imageUrl: "https://placehold.co/600x600?text=Coffee+Mug",
		rating: "4.5",
		numReviews: "12",
	},
	{
		name: "Classic Cotton T-Shirt",
		description: "A soft, breathable cotton T-shirt with a relaxed everyday fit.",
		price: "19.00",
		category: "Clothing",
		stock: "30",
		imageUrl: "https://placehold.co/600x600?text=Cotton+T-Shirt",
		rating: "4.8",
		numReviews: "26",
	},
];

const dummyUsers = [
	{
		name: "Admin User",
		email: "admin@shopnest.com",
		password: "Admin@123",
		role: "admin",
	},
	{
		name: "John Doe",
		email: "john@example.com",
		password: "User@123",
		role: "user",
	},
];

async function seedProducts() {
	if (!process.env.MONGO_URL) {
		throw new Error("MONGO_URL is not set. Add it to backend/.env before seeding.");
	}

	await mongoose.connect(process.env.MONGO_URL, {
		dbName: process.env.MONGO_DB_NAME || "test",
	});

	const results = await Product.bulkWrite(
		products.map((product) => ({
			updateOne: {
				filter: { name: product.name },
				update: { $setOnInsert: product },
				upsert: true,
			},
		}))
	);

	const userResults = await User.bulkWrite(
		await Promise.all(dummyUsers.map(async (user) => ({
			updateOne: {
				filter: { email: user.email },
				update: {
					$setOnInsert: {
						name: user.name,
						email: user.email,
						password: await bcrypt.hash(user.password, 10),
						role: user.role,
						verified: true,
					},
				},
				upsert: true,
			},
		})))
	);

	console.log(
		`Seeded ${results.upsertedCount} products and ${userResults.upsertedCount} users into ${mongoose.connection.name}.`
	);
	console.log("Demo accounts: admin@shopnest.com / Admin@123, john@example.com / User@123");
}

seedProducts()
	.catch((error) => {
		console.error("Product seeding failed:", error.message);
		process.exitCode = 1;
	})
	.finally(async () => {
		await mongoose.disconnect();
	});
