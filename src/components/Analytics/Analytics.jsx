import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './Analytics.css';

export default function Analytics() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Instagram Followers',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  });
  const [followerCount, setFollowerCount] = useState('');
  const [insUsername, setInsUsername] = useState('');
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/followers');
      const followers = response.data;
      setFollowers(followers);

      const labels = followers.map(follower => new Date(follower.date).toLocaleTimeString());
      const data = followers.map(follower => follower.count);

      setChartData({
        labels: labels.slice(-10),
        datasets: [
          {
            label: 'Instagram Followers',
            data: data.slice(-10),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/followers', { count: followerCount, username: insUsername, date: new Date() });
      setFollowerCount('');
      setInsUsername('');
      fetchData();
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  return (
    <div className="analytics-container">
      <h2>Real-Time Instagram Followers Analytics</h2>
      <form onSubmit={handleSubmit} className="follower-form">
        <div>
          <label htmlFor="insUsername">Instagram Username</label>
          <input
            type="text"
            id="insUsername"
            value={insUsername}
            onChange={(e) => setInsUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="followerCount">Follower Count</label>
          <input
            type="number"
            id="followerCount"
            value={followerCount}
            onChange={(e) => setFollowerCount(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Follower Count</button>
      </form>
      <div className="chart">
        <Line data={chartData} />
      </div>
      <table>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Follower Count</th>
            <th>Date Recorded</th>
          </tr>
        </thead>
        <tbody>
          {followers.map((follower) => (
            <tr key={follower._id}>
              <td>{follower.username}</td>
              <td>{follower.count}</td>
              <td>{new Date(follower.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
