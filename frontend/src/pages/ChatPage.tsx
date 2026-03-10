import Logout from "@/components/auth/Logout";
import { useAuthStore } from "@/stores/useAuthStore";

const ChatPage = () => {
  const user = useAuthStore((s) => s.user);

  return (
    <div>
      {user?.username}
      <Logout />
    </div>
  );
};

export default ChatPage;
