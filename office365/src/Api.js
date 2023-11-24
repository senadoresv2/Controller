import axios from 'axios';
import React from 'react';

const API_URL = '/api/';

export const fetchVisitorData = (visitorId, ip) => {
  return axios.post(`${API_URL}/`, {
    visitor_id: visitorId,
    ip: ip
  });
};

export const fetchIPAddress = () => {
  return axios.get('https://geolocation-db.com/json/');
};