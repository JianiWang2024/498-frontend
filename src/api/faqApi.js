import axios from 'axios';

// Railway后端地址
const API_BASE = 'https://498-ai-client.up.railway.app/api';

export const getFaqs = () => axios.get(`${API_BASE}/faqs`);
export const addFaq = (faq) => axios.post(`${API_BASE}/faqs`, faq);
export const deleteFaq = (id) => axios.delete(`${API_BASE}/faqs/${id}`);
export const updateFaq = (id, faq) => axios.put(`${API_BASE}/faqs/${id}`, faq);

// Updated search API to match backend endpoint
export const searchFaqs = (question) => axios.post(`${API_BASE}/faq/search`, { question }, {
    withCredentials: true
});

// Add new hybrid search API
export const hybridSearchFaqs = (question) => axios.post(`${API_BASE}/faq/search`, { question }, {
    withCredentials: true
});