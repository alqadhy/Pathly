// Logo
import logo from "../../assets/imgs/full_logo.png";

// Constants
import { SLOGAN } from "../../constants";

function PageLoader() {
  return (
    <div className="bg-background w-full h-screen flex justify-center items-center fixed top-0 left-0 z-(--z-fixed)">
      <img
        src={logo}
        alt={SLOGAN}
        className="w-80! animate-scale select-none"
      />
    </div>
  );
}

export default PageLoader;
