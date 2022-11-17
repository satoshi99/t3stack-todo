import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import { Layout } from "../components/Layout";
import { Auth } from "../components/Auth";
import { TaskForm } from "../components/TaskForm";
import { TaskList } from "../components/TaskList";

const Home: NextPage = () => {
  const { data: session } = useSession();
  if (!session) {
    return (
      <Layout title="Login">
        <Auth />
      </Layout>
    );
  }
  return (
    <>
      <Layout title="Todo App">
        <button
          className="cursor-pointer text-blue-600"
          onClick={() => signOut()}
        >
          ← SignOut
        </button>
        <p className="my-3 text-xl">{session?.user?.name}</p>
        <TaskForm />
        <TaskList />
      </Layout>
    </>
  );
};

export default Home;
