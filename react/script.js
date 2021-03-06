const keyBy = (array, key) =>
  (array || []).reduce((r, x) => ({ ...r, [key ? x[key] : x]: x }), {});

const maxCharError = () => {
  swal({
    icon: "error",
    title: "Too long..",
    text: "Task can not be more than 15 characters",
    showCloseButton: false,
    showConfirmButton: false,
  });
};

const Svg = () => (
  <svg
    id="Layer_1_1_"
    enableBackground="new 0 0 64 64"
    height="40"
    viewBox="0 0 64 64"
    width="40"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m50 61h-47v-58h37l10 10z" fill="#50b6cf" />
    <path d="m50 13h-10v-10z" fill="#3cadc9" />
    <path d="m8 49h8v8h-8z" fill="#ded8d0" />
    <path d="m8 36h8v8h-8z" fill="#ded8d0" />
    <path d="m8 23h8v8h-8z" fill="#ded8d0" />
    <path d="m8 10h8v8h-8z" fill="#ded8d0" />
    <path d="m25 38 32-32 4 4-32 32-6 2z" fill="#f5a947" />
    <path
      d="m50 35c-5 10-28.15985 23.39606-47 23.95081v2.04919h47z"
      fill="#3cadc9"
    />
    <path d="m29 42 32-32-1.5-1.5-35 35z" fill="#f09d3a" />
    <path d="m25 38 4 4-6 2z" fill="#e34e4b" />
    <g fill="#0d0f23">
      <path d="m8 19h8c.55225 0 1-.44775 1-1v-3h-2v2h-6v-6h3v-2h-4c-.55225 0-1 .44775-1 1v8c0 .55225.44775 1 1 1z" />
      <path d="m12 13.58594-1.29297-1.29297-1.41406 1.41406 2 2c.19531.19531.45117.29297.70703.29297s.51172-.09766.70703-.29297l6-6-1.41406-1.41406z" />
      <path d="m15 30h-6v-6h3v-2h-4c-.55225 0-1 .44775-1 1v8c0 .55225.44775 1 1 1h8c.55225 0 1-.44775 1-1v-3h-2z" />
      <path d="m12 26.58594-1.29297-1.29297-1.41406 1.41406 2 2c.19531.19531.45117.29297.70703.29297s.51172-.09766.70703-.29297l6-6-1.41406-1.41406z" />
      <path d="m16 35h-8c-.55225 0-1 .44775-1 1v8c0 .55225.44775 1 1 1h8c.55225 0 1-.44775 1-1v-8c0-.55225-.44775-1-1-1zm-1 8h-6v-6h6z" />
      <path d="m16 48h-8c-.55225 0-1 .44775-1 1v8c0 .55225.44775 1 1 1h8c.55225 0 1-.44775 1-1v-8c0-.55225-.44775-1-1-1zm-1 8h-6v-6h6z" />
      <path d="m57.70703 5.29297c-.39062-.39062-1.02344-.39062-1.41406 0l-6.29297 6.29297-9.29297-9.29297c-.1875-.1875-.44189-.29297-.70703-.29297h-37c-.55225 0-1 .44775-1 1v58c0 .55225.44775 1 1 1h47c.55225 0 1-.44775 1-1v-39.58594l10.70703-10.70703c.39062-.39062.39062-1.02344 0-1.41406zm-8.70703 54.70703h-45v-56h35.58594l8 8h-6.58594v-5h-2v6c0 .55225.44775 1 1 1h7.58594l-23.29297 23.29297c-.10986.10986-.19238.24365-.2417.39062l-2 6c-.11963.35938-.02637.75586.2417 1.02344.19043.19092.44629.29297.70703.29297.10596 0 .2124-.0166.31641-.05127l6-2c.14697-.04932.28076-.13184.39062-.2417l19.29297-19.29297zm-23.56299-20.14893 1.71191 1.71191-2.56787.85596zm3.56299.73487-2.58594-2.58594 30.58594-30.58594 2.58594 2.58594z" />
      <path d="m45 56h2v2h-2z" />
      <path d="m41 56h2v2h-2z" />
      <path d="m37 56h2v2h-2z" />
    </g>
  </svg>
);

const Nav = ({ light, setLight }) => {
  const [navVisible, setNavVisible] = React.useState(false);

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              aria-expanded="false"
              onClick={() => setNavVisible((e) => !e)}
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
                />
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
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div
              className="flex-shrink-0 flex items-center logo-image"
              onClick={() => (window.location.pathname = "/")}
            >
              <img
                className="block lg:hidden h-8 w-auto"
                src=""
                alt="Workflow"
              />
              <img
                className="hidden lg:block h-8 w-auto"
                src=""
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
              onClick={() =>
                setLight((prev) => {
                  localStorage.setItem("light", !prev);
                  return !prev;
                })
              }
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

      <div className={navVisible ? "sm:hidden" : "hidden sm:hidden"}>
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

const Root = () => {
  const [light, setLight] = React.useState(
    localStorage.light ? JSON.parse(localStorage.light) : false
  );
  const [lists, setLists] = React.useState(
    localStorage.lists ? JSON.parse(localStorage.lists) : []
  );

  const [addInput, setAddInput] = React.useState("");

  const onCreate = (e) => {
    if (addInput) {
      e.preventDefault();

      if (addInput.length >= 15) {
        maxCharError();
        return;
      } else {
        setLists((prev) => {
          const temp = [
            { id: +new Date(), task: addInput, checked: false },
            ...prev,
          ];
          localStorage.setItem("lists", JSON.stringify(temp));
          return temp;
        });
        setAddInput("");
      }
    }
  };

  const onRemove = (id) =>
    setLists((prev) => {
      const temp = keyBy([...prev], "id");
      delete temp[id];
      localStorage.setItem("lists", JSON.stringify(Object.values(temp)));
      return Object.values(temp);
    });

  const onFieldChange = (id, key, value) => {
    if (key === "task" && value.length >= 15) {
      maxCharError();
      return;
    }
    setLists((prev) => {
      const temp = keyBy([...prev], "id");
      temp[id][key] = value;
      localStorage.setItem("lists", JSON.stringify(Object.values(temp)));
      return Object.values(temp);
    });
  };

  return (
    <div>
      <Nav light={light} setLight={setLight} />
      <div className="flex items-center justify-center w-screen font-medium main-container">
        <div
          className={`flex flex-grow items-center justify-center h-full text-gray-600 ${
            light ? "bg-gray-200" : "bg-gray-900"
          }`}
        >
          <div
            className={`max-w-full p-8 rounded-lg shadow-lg w-96 list-parent ${
              light ? "bg-white" : "bg-gray-800 text-white"
            }`}
          >
            <div className="flex items-center mb-6">
              <Svg />
              <h4 className="font-semibold ml-3 text-lg mr-3">
                React Todo list
              </h4>
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
                  value={addInput}
                  onChange={(e) => setAddInput(e.target.value)}
                />
                <button
                  className={`pl-2 pr-2 pt-1 pb-1 rounded-sm focus:outline-none ${
                    light
                      ? "hover:bg-gray-200 bg-gray-300 text-gray-900"
                      : "hover:bg-gray-700 bg-gray-900"
                  }`}
                  onClick={(e) => onCreate(e)}
                >
                  Add
                </button>
              </div>
            </form>
            <div className={`list-container ${!light && "list-scroll-dark"}`}>
              {lists.length ? (
                <React.Fragment>
                  {lists.map((q, i) => (
                    <div key={i}>
                      <input
                        className="hidden"
                        type="checkbox"
                        id={q.id}
                        checked={q.checked}
                        onChange={(e) =>
                          onFieldChange(q.id, "checked", e.target.checked)
                        }
                      />
                      <label
                        className={`flex items-center h-10 px-2 rounded cursor-pointer hover:${
                          light ? "bg-gray-300" : "bg-gray-900"
                        }`}
                        htmlFor={q.id}
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
                          value={q.task}
                          onChange={(e) =>
                            onFieldChange(q.id, "task", e.target.value)
                          }
                        />

                        <button
                          className="text-xs focus:outline-none delete-button"
                          onClick={() => onRemove(q.id, true)}
                        >
                          Delete
                        </button>
                      </label>
                    </div>
                  ))}
                </React.Fragment>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<Root />, document.getElementById("app"));
