import mongoose, { Connection } from 'mongoose';

type CachedType = {
  conn: Connection | typeof import('mongoose') | null | undefined,
  promise: Promise<Connection | typeof import('mongoose')> | null
}

declare global {
  var mongoose: CachedType;
}

const MONGODB_URL = process.env.DATABASE_URL;

if (!MONGODB_URL) throw new Error('MongoDB Url Not Provided');

let cached: CachedType | null = null;

if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function connectDB () {
  if (cached?.conn) return cached.conn;

  if (!cached?.promise) cached!.promise = mongoose.connect(MONGODB_URL!).then(conn => conn);

  try {
    cached!.conn = await cached?.promise;
  } catch (err) {
    cached!.promise = null;
    return err;
  }

  return cached?.conn;
}

export default connectDB;