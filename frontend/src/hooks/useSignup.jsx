// useSignup.js

import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (firstName, lastName, phone, email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8000/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, phone, email, password })
      });

      const json = await response.json();

      if (response.ok) {
        // Save the user to local storage
        localStorage.setItem("user", JSON.stringify(json));

        // Update the context
        dispatch({ type: "LOGIN", payload: json });

        setSuccess("You have successfully signed up!");
      } else {
        setError(json.message);
      }
    } catch (error) {
      setError("An error occurred during signup.");
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, error, isLoading, success };
};
