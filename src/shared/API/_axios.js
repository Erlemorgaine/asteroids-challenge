import axios from 'axios';

// todo: use environment files
/**
 * Exports a pre-configured instance of axios.
 */
const axiosInstance = axios.create({
  baseURL: 'https://api.nasa.gov/neo/rest/v1',
  params: {
    api_key: 'RXdAJxdKD2c9264dgT8KcLMcgID91coBUlpdgHlq',
  },
});

export default axiosInstance;
