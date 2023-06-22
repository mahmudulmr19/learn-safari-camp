import { useAuth, useAxios } from "@/hooks";
import { useQuery } from "@tanstack/react-query";

const useClasses = () => {
  const { currentUser } = useAuth();
  const [api] = useAxios();

  const { data: classesData, isLoading: isClassesLoading } = useQuery({
    queryKey: ["classesData", currentUser?.email],
    queryFn: async () => {
      const res = await api.get(`/api/classes/all`);
      return res.data;
    },
  });

  return [classesData, isClassesLoading];
};

export default useClasses;
