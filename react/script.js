const Root = () => {
  const light = true;

  return (
    <div>
      <nav class="bg-gray-800">
        <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div class="relative flex items-center justify-between h-16">
            <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-expanded="false"
              >
                <span class="sr-only">Open main menu</span>

                <svg
                  class="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>

                <svg
                  class="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div
                class="flex-shrink-0 flex items-center logo-image"
                onClick={() => (window.location.pathname = "/")}
              >
                <img class="block lg:hidden h-8 w-auto" src="" alt="Workflow" />
                <img
                  class="hidden lg:block h-8 w-auto"
                  src="https://image-placeholder.com/images/actual-size/110x32.png"
                  alt="Workflow"
                />
              </div>
              <div class="hidden sm:block sm:ml-6">
                <div class="flex space-x-4">
                  <a
                    href="#"
                    class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    React
                  </a>
                  <a
                    href="#"
                    class="text-white px-3 py-2 rounded-md text-sm font-small hover:bg-gray-300 hover:text-black"
                  >
                    Angular
                  </a>
                  <a
                    href="#"
                    class="text-white px-3 py-2 rounded-md text-sm font-small hover:bg-gray-300 hover:text-black"
                  >
                    Svelte
                  </a>
                  <a
                    href="#"
                    class="text-white px-3 py-2 rounded-md text-sm font-small hover:bg-gray-300 hover:text-black"
                  >
                    Vue
                  </a>
                  <a
                    href="#"
                    class="text-white px-3 py-2 rounded-md text-sm font-small hover:bg-gray-300 hover:text-black"
                  >
                    Ember
                  </a>
                  <a
                    href="#"
                    class="text-white px-3 py-2 rounded-md text-sm font-small hover:bg-gray-300 hover:text-black"
                  >
                    jQuery
                  </a>
                  <a
                    href="#"
                    class="text-white px-3 py-2 rounded-md text-sm font-small hover:bg-gray-300 hover:text-black"
                  >
                    Backbone
                  </a>
                </div>
              </div>
            </div>

            <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* <button class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"> */}
              <span class="border rounded-full border-grey flex items-center cursor-pointer w-12 justify-start bg-gray-300">
                <span class="rounded-full border w-6 h-6 border-grey shadow-inner bg-blue-400 shadow"></span>
              </span>

              <span class="border rounded-full border-grey flex items-center cursor-pointer w-12 bg-black-100 justify-end">
                <span class="rounded-full border w-6 h-6 border-grey shadow-inner bg-blue-400 white shadow"></span>
              </span>

              {/* <span class="sr-only">View notifications</span>

                <svg
                  class="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg> */}
              {/* </button> */}

              <div class="ml-3 relative">
                <div>
                  <button
                    class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    id="user-menu"
                    aria-haspopup="true"
                  >
                    <span class="sr-only">Ralph Largo</span>
                    <img
                      class="h-8 w-8 rounded-full"
                      src="https://largs.s3.amazonaws.com/2x2.jpg"
                      alt=""
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="sm:hidden">
          <div class="px-2 pt-2 pb-3 space-y-1">
            <a
              href="#"
              class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              React
            </a>
            <a
              href="#"
              class="text-white block px-3 py-2 rounded-md text-base font-small"
            >
              Angular
            </a>
            <a
              href="#"
              class="text-white block px-3 py-2 rounded-md text-base font-small"
            >
              Svelte
            </a>
            <a
              href="#"
              class="text-white block px-3 py-2 rounded-md text-base font-smallm"
            >
              Vue
            </a>
            <a
              href="#"
              class="text-white block px-3 py-2 rounded-md text-base font-small"
            >
              Ember
            </a>
            <a
              href="#"
              class="text-white block px-3 py-2 rounded-md text-base font-small"
            >
              jQeuery
            </a>
            <a
              href="#"
              class="text-white block px-3 py-2 rounded-md text-base font-small"
            >
              Backbone
            </a>
          </div>
        </div>
      </nav>

      <div className="flex items-center justify-center w-screen font-medium main-container">
        {light ? (
          <div className="flex flex-grow items-center justify-center h-full text-gray-600 bg-gray-100">
            <div className="max-w-full p-8 bg-white rounded-lg shadow-lg w-96">
              <div className="flex items-center mb-6">
                <svg
                  className="h-8 w-8 text-indigo-500 stroke-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                <h4 className="font-semibold ml-3 text-lg mr-3">
                  React Todo list
                </h4>
              </div>

              <div>
                <input
                  className="hidden"
                  type="checkbox"
                  id="task_2"
                  defaultChecked
                />
                <label
                  className="flex items-center h-10 px-2 rounded cursor-pointer hover:bg-gray-100"
                  htmlFor="task_2"
                >
                  <span className="flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-300 rounded-full">
                    <svg
                      className="w-4 h-4 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="ml-4 text-sm">
                    Chill and smoke some Old Toby.
                  </span>
                </label>
              </div>

              <div>
                <input className="hidden" type="checkbox" id="task_5" />
                <label
                  className="flex items-center h-10 px-2 rounded cursor-pointer hover:bg-gray-100"
                  htmlFor="task_5"
                >
                  <span className="flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-300 rounded-full">
                    <svg
                      className="w-4 h-4 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="ml-4 text-sm">
                    Destroy ring and defeat dark lord.
                  </span>
                </label>
              </div>
              <button className="flex items-center w-full h-8 px-2 mt-2 text-sm font-medium rounded">
                <svg
                  className="w-5 h-5 text-gray-400 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <input
                  className="flex-grow h-8 ml-4 bg-transparent focus:outline-none font-medium"
                  type="text"
                  placeholder="add a new task"
                />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-grow items-center justify-center h-full bg-gray-900 ">
            <div className="max-w-full p-8 bg-gray-800 rounded-lg shadow-lg w-96 text-gray-200">
              <div className="flex items-center mb-6">
                <svg
                  className="h-8 w-8 text-indigo-500 stroke-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                <h4 className="font-semibold ml-3 text-lg">React Todo List</h4>
              </div>

              <div>
                <input className="hidden" type="checkbox" id="task_10" />
                <label
                  className="flex items-center h-10 px-2 rounded cursor-pointer hover:bg-gray-900"
                  htmlFor="task_10"
                >
                  <span className="flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-500 rounded-full">
                    <svg
                      className="w-4 h-4 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>

                  <input
                    type="text"
                    className="bg-transparent pl-4 text-sm focus:outline-none "
                    defaultValue="Be all round legend"
                  />
                </label>
              </div>

              <form>
                <div className="flex items-center w-full h-8 px-2 mt-2 text-sm font-medium rounded">
                  <svg
                    className="w-5 h-5 text-gray-400 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <input
                    required
                    className="flex-grow h-8 ml-3 bg-transparent focus:outline-none font-medium"
                    type="text"
                    placeholder="Add a new task"
                  />
                  <button className="bg-gray-900 pl-2 pr-2 pt-1 pb-1 rounded-sm focus:outline-none hover:bg-gray-700">
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

ReactDOM.render(<Root />, document.getElementById("app"));
