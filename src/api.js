const API_BASE = "http://localhost:3000";

export async function registerUser(name, email, password, passwordConfirmation) {
  const response = await fetch(`${API_BASE}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: { name, email, password, password_confirmation: passwordConfirmation } }),
  });
  return response.json();
}

export async function loginUser(email, password) {
  const response = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
}
