import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import PhotoGallery from "./models/PhotoGallery";

const dropCollection = async (db: mongoose.Connection, collectionName: string) => {
  try {
    await db.dropCollection(collectionName);
  } catch (err) {
    console.log(`Collection ${collectionName} was missing, skipping drop...`);
  }
};

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  const collections = ['photogalleries', 'users'];

  for (const collectionName of collections) {
    await dropCollection(db, collectionName);
  }

  const [user, admin] = await User.create(
    {
      email: "user@gmail.com",
      password: "123",
      displayName: "First User",
      token: crypto.randomUUID(),
      role: "user",
      avatar: null,
    },
    {
      email: "admin@gmail.com",
      password: "123",
      displayName: "Moderator",
      token: crypto.randomUUID(),
      role: "admin",
      avatar: null,
    }
  );

  await PhotoGallery.create(
    {
    user: user,
    title: "Ball",
    image: "images/753e59e6-1423-4097-bd27-18c5deb77d9e.jpeg"
  },
    {
      user: user,
      title: "computer",
      image: "images/523c6b05-a3e5-4187-8f15-2fe49582cec1.jpeg"
    },
    {
      user: admin,
      title: "car",
      image: "images/4994c499-90b2-4421-947d-19f27c45d293.jpeg"
    },
    {
      user: admin,
      title: "not car",
      image: "images/6bae4842-37a8-4040-9c74-ea3d37968381.jpeg"
    }
  );

  await db.close();
};

void run();
