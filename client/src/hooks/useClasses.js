import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import useAuth from "./useAuth";

const useClasses = () => {
  const { currentUser } = useAuth();
  const [api] = useAxios();

  const { data: classesData, isLoading: isClassesLoading } = useQuery({
    queryKey: ["classesData", currentUser?.email],
    queryFn: async () => {
      const res = await api.get(
        `/api/instructors/classes/${currentUser.email}`
      );
      return res.data;
    },
  });

  return [classesData, isClassesLoading];
};

export default useClasses;
