import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full py-4 bg-gray-200 text-center">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="text-sm">
          <Link href="/about" className="text-blue-600 hover:underline">
            Footer
          </Link>
          <span> | </span>
          <Link href="/contact" className="text-blue-600 hover:underline">
            Footer
          </Link>
        </div>
        <div className="text-sm mt-2">© 2024 AppName</div>
      </div>
    </footer>
  );
};

export default Footer;
