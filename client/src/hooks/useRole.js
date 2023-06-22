import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxios from "./useAxios";

const useRole = () => {
  const { loading, currentUser } = useAuth();
  const [api] = useAxios();

  const { data: role, isLoading: isRoleLoading } = useQuery({
    queryKey: ["role", currentUser?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await api.get("/api/users/me");
      return res.data.role;
    },
  });
  return [role, isRoleLoading];
};
export default useRole;
