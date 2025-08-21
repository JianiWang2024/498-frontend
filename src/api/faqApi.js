import axios from 'axios';

// Railway后端地址
const API_BASE = 'https://498-ai-client.up.railway.app/api';

export const getFaqs = () => axios.get(`${API_BASE}/faqs`);
export const addFaq = (faq) => axios.post(`${API_BASE}/faqs`, faq);
export const deleteFaq = (id) => axios.delete(`${API_BASE}/faqs/${id}`);
export const updateFaq = (id, faq) => axios.put(`${API_BASE}/faqs/${id}`, faq);
export const searchFaqs = (query) => axios.get(`${API_BASE}/faqs/search?q=${encodeURIComponent(query)}`);