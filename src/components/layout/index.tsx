import Logo from "~/components/common/Logo";
import Header from "./Header";
// import { EmailInput, PasswordInput } from "../common/Input";

interface IProperties {
  children: React.ReactNode;
}

const Layout: React.FC<IProperties> = ({ children }) => {
  return (
    <div className='flex flex-col justify-between bg-background-foreground min-h-screen md:p-6 max-w-8xl gap-6'>
      <Header />
      <div className='flex-1 mt-14 md:mt-0'>{children}</div>
      {/* <PasswordInput /> */}
    </div>
  );
};

export default Layout;
