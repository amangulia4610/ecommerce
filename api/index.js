// Simple test API handler
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  res.status(200).json({
    message: 'API is working!',
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });
}
