
const API_BASE_URL = 'https://p01--ayra-backend--5gwtzqz9pfqz.code.run';

export const tenantSignup = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/tenant/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};