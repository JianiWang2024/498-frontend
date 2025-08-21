// Lab 3 part of the AI FAQ project
// Lab 3 - Admin Page
// Add react imports and axios for API calls
import { useState, useEffect } from 'react';
import ChartDashboard from '../components/chartdashboard';

import { getFaqs, addFaq, deleteFaq } from '../api/faqApi';
import { Link } from 'react-router-dom';



function AdminPage({ user, onLogout }) {
  const [faqs, setFaqs] = useState([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  // Lab 3 Requirement: Debug and test React applications.   
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch FAQs from the backend API
  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const res = await getFaqs();
      setFaqs(res.data);
      setLoading(false);
    } catch (err) {
      alert('Failed to get FAQs. Please try again later.');
      setLoading(false);
    }
  };

  // add new FAQ
  const handleAdd = async () => {
    if (!question || !answer) return;
    try {
      await addFaq({ question, answer });
      setQuestion('');
      setAnswer('');
      fetchFaqs();
    } catch (err) {
      alert('Failed to add FAQ. Please try again later.');
    }
  };

  // delete FAQ
  const handleDelete = async (id) => {
    try {
      await deleteFaq(id);
      fetchFaqs();
    } catch (err) {
      alert('Failed to delete FAQ. Please try again later.');
    }
  };
  
  
  return (
    <div className="admin-dashboard">
      <div className="admin-header">
          <h1 className="admin-title">Admin Dashboard</h1>
          <div className="admin-user-info">
            <span className="admin-welcome">Welcome, {user?.username}!</span>
            <Link to="/" className="admin-link">Back to Chat</Link>
            <button onClick={onLogout} className="logout-btn">Log out</button>
          </div>
      </div>

      <ChartDashboard />
      
      <div className="faq-management">
        <h2>Manage FAQs</h2>

         {/* Display loading state and error messages */}
         {loading && <p>Loading FAQs...</p>}
        {error && <p style={{ color: '#ef4444' }}>{error}</p>}

        {!loading && !error && (
          <>
            <div className="faq-input-section">
              <input
                 value={question}
                 onChange={e => setQuestion(e.target.value)}
                 placeholder="Enter question..."
               />
               <input
                 value={answer}
                 onChange={e => setAnswer(e.target.value)}
                 placeholder="Enter answer..."
               />
               <button onClick={handleAdd}>Add FAQ</button>
            </div>

            <div className="faq-table">
              <table>
                <thead>
                  <tr>
                     <th>Question</th>
                     <th>Answer</th>
                     <th>Actions</th>
                   </tr>
                </thead>
                <tbody>
                  {faqs.map(faq => (
                    <tr key={faq.id}>
                      <td>{faq.question}</td>
                      <td>{faq.answer}</td>
                      <td><button onClick={() => handleDelete(faq.id)}>Delete</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
// this AdminPage component allows admins to manage FAQs
export default AdminPage;
