import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="flex items-center justify-between w-full p-4 shadow-md bg-white">
      <h1 className="text-xl font-bold">AppName</h1>
      <Link
        href="/login"
        className="px-4 py-2 text-blue-500 hover:text-blue-700"
      >
        Login
      </Link>
    </nav>
  );
};

export default NavBar;
