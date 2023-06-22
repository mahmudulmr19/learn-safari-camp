import useAuth from "./useAuth";
import useAxios from "./useAxios";
import { useQuery } from "@tanstack/react-query";
const useSelectedClass = () => {
  const { currentUser } = useAuth();
  const [api] = useAxios();

  // prettier-ignore
  const { data: selectedClass, isLoading: selectedClassLoading ,refetch} = useQuery({
    queryKey: ["selectedClass", currentUser.email],
    queryFn: async () => {
      const res = await api.get(`/api/select_class/${currentUser.email}`);
      return res.data;
    },
  });

  return [selectedClass, selectedClassLoading, refetch];
};

export default useSelectedClass;
