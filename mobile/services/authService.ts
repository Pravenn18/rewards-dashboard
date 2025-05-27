import EncryptedStorage from 'react-native-encrypted-storage';

export const login = async (email: string, password: string) => {
  try {
    const res = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error('Invalid email or password');
    }

    const data = await res.json();
    const { token, user } = data;

    await EncryptedStorage.setItem('auth_token', token);
    await EncryptedStorage.setItem('user_data', JSON.stringify(user));

    return { token, user };
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};
export const logout = async () => {
  await EncryptedStorage.removeItem('auth_token');
  await EncryptedStorage.removeItem('user_data');
};

export const getStoredUser = async () => {
  const token = await EncryptedStorage.getItem('auth_token');
  const user = await EncryptedStorage.getItem('user_data');
  return token && user ? { token } : null;
};
