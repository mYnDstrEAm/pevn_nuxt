import axios from 'axios';
import * as mutations from './mutation-types';

export const login = async function({ commit }, { email, password }) {
  if (!email || !password) throw new Error('Email and password are required');
  try {
    const { data } = await axios.post('/api/auth/login', { email, password });
    commit(mutations.SET_USER, data);
  } catch (error) {
    throw new Error('Wrong email or password');
  }
};

export const register = async function({ commit }, { email, password }) {
  if (!email || !password) throw new Error('Email and password are required');
  try {
    const { data } = await axios.post('/api/auth/register', {
      email,
      password
    });
    commit(mutations.SET_USER, data);
  } catch (error) {
    switch (error.response.status || 500) {
      case 409:
        throw new Error('Such email is already registered');
      case 500:
        throw new Error('Internal server error');
    }
  }
};

export const logout = async function({ commit }) {
  const { data } = await axios.post('/api/auth/logout');
  if (data.ok) commit(mutations.SET_USER, null);
};

export const changePassword = async function(
  { commit },
  { currentPassword, newPassword }
) {
  if (!currentPassword || !newPassword) {
    throw new Error('All fields are required');
  }
  try {
    await axios.patch('/api/auth', {
      currentPassword,
      newPassword
    });
    commit(mutations.SET_USER, null);
  } catch (error) {
    throw new Error('Wrong password');
  }
};
