// import { RegisterFormData } from "./pages/Register";
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// export const register = async (formData: RegisterFormData) => {
//   const response = await fetch(`${API_BASE_URL}/api/users/register`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(formData),
//   });
//   const responseBody = await response.json();
//   if (!response.ok) {
//     throw new Error(responseBody.msg);
//   }
// };

import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const contentType = response.headers.get("Content-Type");
  const responseBody = await response.text();

  if (!response.ok) {
    try {
      // Attempt to parse error message if it is JSON
      const errorResponse = JSON.parse(responseBody);
      throw new Error(errorResponse.msg || "An error occurred");
    } catch (e) {
      // Otherwise, throw a generic error
      throw new Error("An error occurred");
    }
  }

  if (contentType && contentType.includes("application/json")) {
    return JSON.parse(responseBody);
  } else if (responseBody.startsWith("eyJhbGciOi")) {
    // If the response is a JWT token
    return { token: responseBody };
  } else {
    throw new Error("Unexpected response format");
  }
};

export const signIn = async (fromData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fromData),
  });

  const body = await response.json();
  if (!response.ok) {
    console.log("something wrong happend");
    throw new Error(body.message);
  }
  return body;
};
export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    console.log("from frontend validate token");
    throw new Error("Token invalid");
  }

  return response.json();
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });

  if (!(await response).ok) {
    throw new Error("ERROR DURING SIGN OUT");
  }
};
