import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import apiService from '../services/apiService';
import toast from 'react-hot-toast';

const JobCardContext = createContext();

export const useJobCards = () => {
  const context = useContext(JobCardContext);
  if (!context) throw new Error('useJobCards must be used within JobCardProvider');
  return context;
};

export const JobCardProvider = ({ children }) => {
  const [jobCards, setJobCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchJobCards = useCallback(async () => {
    try {
      const data = await apiService.getJobCards();
      setJobCards(data.map(j => ({ ...j, id: j._id })));
      setIsLoading(false);
    } catch (err) {
      console.error('Failed to fetch job cards:', err);
    }
  }, []);

  useEffect(() => {
    fetchJobCards();
    const interval = setInterval(fetchJobCards, 10000); // 10s polling
    return () => clearInterval(interval);
  }, [fetchJobCards]);

  const addJobCard = async (data) => {
    try {
      const newJob = await apiService.createJobCard(data);
      const normalized = { ...newJob, id: newJob._id };
      setJobCards(prev => [...prev, normalized]);
      toast.success('Job Card created');
      return normalized;
    } catch (err) {
      toast.error('Failed to create job card');
      throw err;
    }
  };

  const updateJobCard = async (id, data) => {
    try {
      const updated = await apiService.updateJobCard(id, data);
      const normalized = { ...updated, id: updated._id };
      setJobCards(prev => prev.map(j => j.id === id ? normalized : j));
      toast.success('Job Card updated');
      return normalized;
    } catch (err) {
      toast.error('Failed to update job card');
      throw err;
    }
  };

  const deleteJobCard = async (id) => {
    try {
      await apiService.deleteJobCard(id);
      setJobCards(prev => prev.filter(j => j.id !== id));
      toast.success('Job Card deleted');
    } catch (err) {
      toast.error('Failed to delete job card');
      throw err;
    }
  };

  return (
    <JobCardContext.Provider value={{ jobCards, isLoading, addJobCard, updateJobCard, deleteJobCard, refreshJobCards: fetchJobCards }}>
      {children}
    </JobCardContext.Provider>
  );
};
