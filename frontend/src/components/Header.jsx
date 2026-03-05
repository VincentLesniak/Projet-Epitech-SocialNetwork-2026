import Title from "./Title";
import BurgerMenu from "./BurgerMenu";

const Header = () => {
  return (
    <header className="flex flex-row items-center justify-between relative h-16 px-6 bg-white border-b border-slate-100 shadow-sm sticky top-0 z-40">
      <div className="flex items-center">
        <Title />
      </div>

      <div className="flex items-center">
        <BurgerMenu />
      </div>
    </header>
  );
};

export default Header;
