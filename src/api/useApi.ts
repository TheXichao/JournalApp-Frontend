import { useState,  useCallback } from "react";
import  { AxiosRequestConfig, AxiosResponse } from "axios";
import { myApiCall } from "./axios";

// Define a generic interface for the hook's return type
interface ApiHookState<T> {
  isLoading: boolean;
  error: any; // Consider using a more specific error type
  data: T | null;
  fetchData: () => Promise<void>;
}

// A generic function that accepts the URL, method, request body, and an optional trigger
export default function useApi<T>(
  config: AxiosRequestConfig,
): ApiHookState<T> {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<T | null>(null);

  const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
          const response: AxiosResponse<T> = await myApiCall(config);
          setData(response.data);
        } catch (error: any) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      }, [config]);
      return { isLoading, error, data, fetchData };
    }
