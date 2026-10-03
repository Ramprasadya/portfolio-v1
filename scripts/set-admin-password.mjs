import "dotenv/config";
import { randomBytes, scryptSync } from "node:crypto";
import mongoose from "mongoose";

let input = "";
for await (const chunk of process.stdin) input += chunk;

let credentials;
try {
  credentials = JSON.parse(input);
} catch {
  console.error('Expected JSON on stdin: {"username":"...","password":"..."}');
  process.exitCode = 1;
}

if (process.exitCode !== 1) {
  const { username, password } = credentials ?? {};
  const mongoUri = process.env.mongo_uri ?? process.env.MONGO_URI ?? process.env.MONGODB_URI;

  if (typeof username !== "string" || !username.trim() || typeof password !== "string" || !password) {
    console.error("A non-empty username and password are required.");
    process.exitCode = 1;
  } else if (!mongoUri) {
    console.error("Set mongo_uri in .env before provisioning an admin.");
    process.exitCode = 1;
  } else {
    const salt = randomBytes(16);
    const passwordHash = `${salt.toString("hex")}:${scryptSync(password, salt, 64).toString("hex")}`;

    try {
      await mongoose.connect(
        mongoUri,
        process.env.MONGODB_DB ? { dbName: process.env.MONGODB_DB } : {}
      );
      const db = mongoose.connection.db;
      if (!db) throw new Error("Mongoose connected without an active database.");
      const admins = db.collection("adminUsers");
      await admins.createIndex({ username: 1 }, { unique: true });
      const now = new Date();
      await admins.updateOne(
        { username: username.trim() },
        {
          $set: { passwordHash, updatedAt: now },
          $setOnInsert: { createdAt: now },
        },
        { upsert: true }
      );
      console.log("Admin credentials saved as a salted password hash.");
    } catch (error) {
      const message = error instanceof Error ? error.message.replaceAll(mongoUri, "[redacted]") : "Unknown error.";
      console.error("Unable to save admin credentials to MongoDB:", message);
      process.exitCode = 1;
    } finally {
      await mongoose.disconnect();
    }
  }
}
