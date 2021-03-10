import { useState } from "react";

const Navbar = ({ light, setLight }) => {
  const [navIsVisible, setNavIsVisible] = useState(false);

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              aria-expanded="false"
              onClick={() => setNavIsVisible((e) => !e)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center logo-image">
              <img
                className="block lg:hidden h-8 w-auto"
                src=""
                alt="Workflow"
              />
              <img
                className="hidden lg:block h-8 w-auto"
                src="https://via.placeholder.com/110x32"
                alt="Todo list by @devlargs"
              />
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <a
                  href="/react"
                  className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  React
                </a>
                <a
                  href="/angular"
                  className="text-white px-3 py-2 rounded-md text-sm font-small hover:bg-gray-300 hover:text-black"
                >
                  Angular
                </a>
                <a
                  href="/svelte"
                  className="text-white px-3 py-2 rounded-md text-sm font-small hover:bg-gray-300 hover:text-black"
                >
                  Svelte
                </a>
                <a
                  href="/vue"
                  className="text-white px-3 py-2 rounded-md text-sm font-small hover:bg-gray-300 hover:text-black"
                >
                  Vue
                </a>
                <a
                  href="/ember"
                  className="text-white px-3 py-2 rounded-md text-sm font-small hover:bg-gray-300 hover:text-black"
                >
                  Ember
                </a>
                <a
                  href="/jquery"
                  className="text-white px-3 py-2 rounded-md text-sm font-small hover:bg-gray-300 hover:text-black"
                >
                  jQuery
                </a>
                <a
                  href="/backbone"
                  className="text-white px-3 py-2 rounded-md text-sm font-small hover:bg-gray-300 hover:text-black"
                >
                  Backbone
                </a>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <span
              className={`border rounded-full border-grey flex items-center cursor-pointer w-12 ${
                light ? "bg-gray-200 justify-start" : "bg-gray-800 justify-end"
              }`}
              onClick={() => setLight((prev) => !prev)}
            >
              <span className="rounded-full border w-6 h-6 border-grey shadow-inner bg-blue-400 shadow"></span>
            </span>
            <div className="ml-3 relative">
              <div>
                <a
                  className="bg-gray-800 flex text-sm rounded-full focus:outline-none"
                  href="https://github.com/devlargs/todo-lists/tree/main/react"
                  target="_blank"
                >
                  <span className="sr-only">Ralph Largo | @devlargs</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                    alt="Go to github page"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={navIsVisible ? "sm:hidden" : "hidden sm:hidden"}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a
            href="/react"
            className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            React
          </a>
          <a
            href="/angular"
            className="text-white block px-3 py-2 rounded-md text-base font-small"
          >
            Angular
          </a>
          <a
            href="/svelte"
            className="text-white block px-3 py-2 rounded-md text-base font-small"
          >
            Svelte
          </a>
          <a
            href="/vue"
            className="text-white block px-3 py-2 rounded-md text-base font-smallm"
          >
            Vue
          </a>
          <a
            href="/ember"
            className="text-white block px-3 py-2 rounded-md text-base font-small"
          >
            Ember
          </a>
          <a
            href="/jquery"
            className="text-white block px-3 py-2 rounded-md text-base font-small"
          >
            jQuery
          </a>
          <a
            href="/backbone"
            className="text-white block px-3 py-2 rounded-md text-base font-small"
          >
            Backbone
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
