import { useMutation } from "@tanstack/react-query";

export const useMutationnHook = (fnCallback) => {
  const mutation = useMutation({
    mutationFn: fnCallback,
  });
  return mutation;
};
