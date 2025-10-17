import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-950 text-gray-200 py-4">
      <div className="mx-auto px-14 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-2xl font-bold tracking-wider">🍳 MyRecipes</div>

        <div className="mt-2 text-center text-gray-500 text-xs">
          © {new Date().getFullYear()} MyRecipes. All rights reserved.
        </div>

        <div className="flex gap-4 text-xl">
          <a
            href="https://facebook.com/avazbek.web"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://twitter.com/@abd68159"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com/avaz_web"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-500 transition-colors"
          >
            <FaInstagram />
          </a>
          <a
            href="https://linkedin.com/in/avazbek-abduhamidov-042377378"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
