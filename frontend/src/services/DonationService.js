// src/services/donationService.js
export const fetchDonationHistory = async (donorId) => {
    try {
      const response = await fetch(`/api/donations/history/${donorId}`);
      if (!response.ok) throw new Error('Failed to fetch donation history');
      return await response.json();
    } catch (error) {
      throw error;
    }
  };