const axios = require('axios');

// Retry helper with exponential backoff
const withRetry = async (fn, retries = 3, delay = 300) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === retries - 1) throw err;
      console.warn(`[Retry ${i + 1}] Retrying after ${delay}ms...`);
      await new Promise(r => setTimeout(r, delay * (i + 1)));
    }
  }
};

exports.getUser = (userId) =>
  withRetry(() =>
    axios.get(`${process.env.USER_SERVICE_URL}/users/${userId}`).then(r => r.data)
  );

exports.getFood = (foodId) =>
  withRetry(() =>
    axios.get(`${process.env.FOOD_SERVICE_URL}/foods/${foodId}`).then(r => r.data)
  );
