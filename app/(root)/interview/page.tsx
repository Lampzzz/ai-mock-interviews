import Agent from "@/components/agent";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Page = async () => {
  const user = await getCurrentUser();

  return (
    <>
      <h3>Interview generation</h3>

      <Agent userName="John Doe" />
    </>
  );
};

export default Page;
