import { useEffect, useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Chart Dashboard Component
// It displays the top questions asked in the IT support system

function ChartDashboard() {
  const [topQuestions, setTopQuestions] = useState(null);
  const [dailyCounts, setDailyCounts] = useState(null);
  const [csat, setCsat] = useState(null);

  // 添加Railway后端地址常量
  const RAILWAY_API_BASE = 'https://498-ai-client.up.railway.app/api';

  // Fetch top questions from the backend API
  useEffect(() => {
    // Fetch top questions data
    axios.get(`${RAILWAY_API_BASE}/top-questions`)
      .then(response => {
        if (response.data && Array.isArray(response.data)) {
          setTopQuestions(response.data);
        } else {
          console.warn('Top questions data is not an array:', response.data);
          setTopQuestions([]);
        }
      })
      .catch(error => {
        console.error('Error fetching top questions:', error);
        setTopQuestions([]);
      });

    // Fetch daily question counts
    axios.get(`${RAILWAY_API_BASE}/daily-question-counts`)
      .then(response => {
        if (response.data && response.data.datasets) {
          setDailyCounts(response.data);
        } else {
          console.warn('Daily counts data format is incorrect:', response.data);
          setDailyCounts({
            labels: [],
            datasets: [{
              label: 'Questions',
              data: [],
              borderColor: '#667eea',
              backgroundColor: 'rgba(102, 126, 234, 0.1)'
            }]
          });
        }
      })
      .catch(error => {
        console.error('Error fetching daily counts:', error);
        setDailyCounts({
          labels: [],
          datasets: [{
            label: 'Questions',
            data: [],
            borderColor: '#667eea',
            backgroundColor: 'rgba(102, 126, 234, 0.1)'
          }]
        });
      });

    // Fetch CSAT data
    axios.get(`${RAILWAY_API_BASE}/csat`)
      .then(response => {
        if (response.data && typeof response.data.csat === 'number') {
          setCsat(response.data.csat);
        } else {
          console.warn('CSAT data format is incorrect:', response.data);
          setCsat(0);
        }
      })
      .catch(error => {
        console.error('Error fetching CSAT data:', error);
        setCsat(0);
      });
  }, []);


    return (
    <div className="charts-section">
      {/* Top row with two charts side by side */}
      <div style={{ display: 'flex', gap: '2em', marginBottom: '2em' }}>
        {/* Top Questions Chart */}
        <div className="chart-box" style={{ flex: 1 }}>
          <h3>Top 5 Asked Questions</h3>
          <div style={{ height: '250px' }}>
            {topQuestions && topQuestions.length > 0 ? (
              <Bar
                data={{
                  labels: topQuestions.map(q => q.question || 'Unknown'),
                  datasets: [{
                    label: 'Count',
                    data: topQuestions.map(q => q.count || 0),
                    backgroundColor: 'rgba(102, 126, 234, 0.8)',
                    borderColor: '#667eea',
                    borderWidth: 1
                  }]
                }}
                options={{
                  maintainAspectRatio: false,
                  plugins: { legend: { position: 'top' } },
                  scales: { y: { beginAtZero: true } }
                }}
              />
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <p>No data available</p>
              </div>
            )}
          </div>
        </div>

        {/* Daily Trends */}
        <div className="chart-box" style={{ flex: 1 }}>
          <h3>Daily Question Volume (7 Days)</h3>
          <div style={{ height: '250px' }}>
            {dailyCounts && dailyCounts.datasets && dailyCounts.datasets[0] && dailyCounts.datasets[0].data && dailyCounts.datasets[0].data.length > 0 ? (
              <Line
                data={dailyCounts}
                options={{
                  maintainAspectRatio: false,
                  plugins: { legend: { position: 'top' } },
                  scales: { y: { beginAtZero: true } }
                }}
              />
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <p>No data available</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CSAT Section */}
      <div className="chart-box" style={{ marginBottom: '2em' }}>
        <h3>Customer Satisfaction Score (CSAT)</h3>
        {csat !== null && csat >= 0 ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '2em' }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '48px', fontWeight: 'bold', margin: '0', color: '#667eea' }}>{csat}%</p>
              <p style={{ fontSize: '16px', color: '#4a5568', margin: '0.5em 0' }}>Customer Satisfaction</p>
            </div>
            <div style={{ width: '200px', height: '200px' }}>
              <Pie
                data={{
                  labels: ['Satisfied', 'Unsatisfied'],
                  datasets: [{
                    data: [csat, Math.max(0, 100 - csat)],
                    backgroundColor: ['#667eea', '#e2e8f0']
                  }]
                }}
                options={{
                  maintainAspectRatio: false,
                  plugins: { 
                    legend: { 
                      position: 'bottom',
                      labels: {
                        padding: 20,
                        usePointStyle: true
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100px' }}>
            <p>No CSAT data available</p>
          </div>
        )}
      </div>
    </div>
  );
}


export default ChartDashboard;
