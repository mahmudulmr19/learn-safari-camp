import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import useAuth from "./useAuth";

const useUsers = () => {
  const { currentUser } = useAuth();
  const [api] = useAxios();

  const { data: usersData, isLoading: isUsersLoading } = useQuery({
    queryKey: ["usersData", currentUser?.email],
    queryFn: async () => {
      const res = await api.get("/api/users");
      return res.data;
    },
  });

  return [usersData, isUsersLoading];
};

export default useUsers;
