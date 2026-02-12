import { useMutation, useQuery } from "@tanstack/react-query";

const API_BASE_URL = 'https://reqres.in/api/users';

// GET request function
export const useTestRequest = () => {
  return useQuery({
    queryKey: ['test1'],
    queryFn: async () =>{
      return await fetch(`${API_BASE_URL}`).then(res => res.json());
    },
  })
};

// POST request function
export const useCreate = () => {
  return useMutation({
    mutationFn: async () =>{
      return await fetch(`${API_BASE_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: 'name', job: 'job' }),
      });
    },
  })
};

