
const BASE_URL = "https://d1o5ayec4opwj2.cloudfront.net";

export const sendCredentials = async (data) => {
  try {
    const formData = new URLSearchParams();
    formData.append("tenant_id", data.tenant_id);
    formData.append("identifier", data.identifier);
    formData.append("password", data.password);

    const response = await fetch(`${BASE_URL}/api/v1/send-creds`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),  // <-- URL encoded body
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to send credentials: ${response.status}`);
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to send credentials:", error.message);
    return {
      success: false,
      message: error.message || 'Failed to send credentials. Please try again.'
    };
  }
};

// tenant signup
export const tenantSignup = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/tenant/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.tenantName,
        domain: data.domain,
        nin: data.npi,
        address: data.address
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Signup failed: ${response.status}`);
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error("Tenant signup failed:", error.message);
    return {
      success: false,
      message: error.message || 'Request failed. Please try again after sometime.'
    };
  }
};
// user signup
export const userSignup = async (data) => {
  try {
    // First create tenant
    const tenantResponse = await tenantSignup(data);
    if (!tenantResponse.success) {
      throw new Error(tenantResponse.message);
    }
    console.log("tenant", tenantResponse);
    console.log("signup data", data);

    // Then create user with tenant_id
    const response = await fetch(`${BASE_URL}/auth/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tenant_id: tenantResponse.data.tenant_id,
        identifier: data.adminEmail,
        email: data.adminEmail,
        password: data.adminPassword,
        user_type: "admin",
        display_name: data.adminName,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Signup failed: ${response.status}`);
    }

    const result = await response.json();
    console.log("User signup successful:", result);
    // After successful signup, send credentials
    await sendCredentials({
      tenant_id: tenantResponse.data.tenant_id,
      identifier: data.adminEmail,
      password: data.adminPassword
    });

    return { success: true, data: result };
  } catch (error) {
    console.error("User signup failed:", error.message);
    return {
      success: false,
      message: error.message || 'Signup failed. Please try again.'
    };
  }
};