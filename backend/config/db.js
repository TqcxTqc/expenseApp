import mongoose from "mongoose";

const resolveMongoUri = () => {
	// Support multiple common env var names across platforms (Railway, Docker, local)
	const uri =
		process.env.MONGO_URI ||
		process.env.MONGODB_URI ||
		process.env.MONGODB_URL ||
		process.env.MONGO_URL ||
		process.env.DATABASE_URL;

	return uri;
};

const connectDB = async () => {
	const mongoUri = resolveMongoUri();
	if (!mongoUri || typeof mongoUri !== "string") {
		console.error(
			"❌ MongoDB connection failed: Missing connection string. Set one of env vars: MONGO_URI, MONGODB_URI, MONGODB_URL, MONGO_URL, or DATABASE_URL"
		);
		process.exit(1);
	}

	try {
		await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 10000 });
		console.log("✅ MongoDB connected");
	} catch (err) {
		console.error("❌ MongoDB connection failed:", err.message);
		process.exit(1);
	}
};

export default connectDB;
