// import { EmailInput, PasswordInput } from "../common/Input";

import Layout from "~/components/layout";
import Header from "~/components/layout/Header";

interface IProperties {
  children: React.ReactNode;
}

const HomeLayout: React.FC<IProperties> = ({ children }) => {
  return (
    <>
      <div>
        <Layout>{children}</Layout>
      </div>
    </>
  );
};

export default HomeLayout;
