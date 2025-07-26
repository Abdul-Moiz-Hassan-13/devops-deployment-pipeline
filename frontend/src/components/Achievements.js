import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Achievements.css';  // Add relevant CSS for styling

const Achievements = () => {
  const [achievements, setAchievements] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          navigate('/');
          return;
        }

        const response = await fetch('http://localhost:5000/api/achievements', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching achievements: ${response.statusText}`);
        }

        const data = await response.json();
        setAchievements(data);
      } catch (err) {
        setError('Error fetching achievements: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!achievements || achievements.milestones.length === 0) {
    return <div>No achievements found for this donor.</div>;
  }

  // Separate achieved and not achieved milestones
  const achievedMilestones = achievements.milestones.filter(milestone => milestone.achieved);
  const notAchievedMilestones = achievements.milestones.filter(milestone => !milestone.achieved);

  // Render achievements with milestones and benefits
  return (
    <>
    <div className="achievements-container">
      
      {/* Donor Level Card */}
      <div className="level-card">
        <h3>Donor Level: {achievements.level}</h3>
        
        {/* Benefits heading */}
        <div className="benefits-heading">
          <h4>Benefits you have!</h4>
        </div>

        <div className="level-benefits">
          <ul>
            {getLevelBenefits(achievements.level).map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>

    <div className="milestones-container">
      <h4 className="achievements-heading">Achievements</h4>

      {/* Render achieved milestones */}
      {achievedMilestones.map((milestone, index) => (
        <div className={`milestone-card achieved`} key={index}>
          <h5>{milestone.title}</h5>
          <p>Status: Achieved</p>
          <p>Date: {new Date().toLocaleDateString()}</p>
        </div>
      ))}

      {/* Render not achieved milestones at the end */}
      {notAchievedMilestones.map((milestone, index) => (
        <div className={`milestone-card not-achieved`} key={index}>
          <h5>{milestone.title}</h5>
          <p>Status: Not Achieved</p>
          <p>Date: Not available</p> {/* No date for not achieved milestones */}
        </div>
      ))}
    </div>
    </>
  );
};

// Helper function to get benefits based on donor level
const getLevelBenefits = (level) => {

  if (level === 0) {
    return ['You don\'t have any benefits currently.'];  // If level is 0, show no benefits
  }
  
  else if (level === 1) {
    return [
      'Free Health Check-ups: Basic health check-up (e.g., blood pressure, cholesterol, or glucose check)',
    ];
  } 
  
  else if (level === 2) {
    return [
      'Free Health Check-ups: Basic health check-up (e.g., blood pressure, cholesterol, or glucose check)',
      'Priority Access to Health Services: Priority appointments for certain health services like flu shots.',
    ];
  } 
  
  else if (level === 3) {
    return [
      'Free Health Check-ups: Basic health check-up (e.g., blood pressure, cholesterol, or glucose check)',
      'Priority Access to Health Services: Priority appointments for health services.',
      'Transportation Discounts: Discounted rides for getting to donation centers.',
    ];
  } 
  
  else if (level === 4) {
    return [
      'Free Health Check-ups: Basic health check-up (e.g., blood pressure, cholesterol, or glucose check)',
      'Priority Access to Health Services: Priority appointments for health services.',
      'Transportation Discounts: Discounted rides to donation centers.',
      'Health and Wellness Membership: Discounted or free membership to wellness apps.',
    ];
  } 
  
  else if (level >= 5) {
    return [
      'Free Health Check-ups: Basic health check-up (e.g., blood pressure, cholesterol, or glucose check)',
      'Priority Access to Health Services: Priority appointments for health services.',
      'Transportation Discounts: Discounted rides to donation centers.',
      'Health and Wellness Membership: Discounted wellness app membership.',
      'Long-Term Health Insurance Discounts: Health insurance premium discounts for regular donors.',
    ];
  }

  // Default return in case something goes wrong (should not reach here)
  return ['No benefits available'];

};

export default Achievements;
