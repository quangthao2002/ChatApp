import Logout from "@/components/auth/Logout";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/useAuthStore";

const ChatPage = () => {
  const user = useAuthStore((s) => s.user);
  const testAuthToken = useAuthStore((s) => s.testAuthToken);
  return (
    <div>
      {user?.username}
      <Logout />

      <Button onClick={() => testAuthToken()}>Kiểm tra token</Button>
    </div>
  );
};

export default ChatPage;
