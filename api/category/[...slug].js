import '../../server/config/connectDB.js';
import app from '../../server/index.js';

export default async function handler(req, res) {
  // Set the correct path for the Express app
  req.url = `/api/category${req.url}`;
  return app(req, res);
}
