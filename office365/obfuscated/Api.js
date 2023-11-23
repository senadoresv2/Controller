import axios from 'axios';

const API_URL = 'http://localhost:4000';

export const fetchVisitorData = (visitorId, ip) => {
  return axios.post(`${API_URL}/`, {
    visitor_id: visitorId,
    ip: ip
  });
};

export const fetchIPAddress = () => {
  return axios.get('https://geolocation-db.com/json/');
};