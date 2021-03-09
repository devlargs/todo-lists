import { useState } from "react";
import NoteSVG from "./components/Note";
import Task from "./components/Task";

const Content = () => {
  const [value, setValue] = useState("");
  const [lists, setLists] = useState([]);
  const [toggle, setToggle] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setLists((prev) => [
      ...prev,
      { id: +new Date(), task: value, checked: false },
    ]);
    setValue("");
  };

  // const deleteTask = (id) => {
  //   console.log(lists);
  //   const temp = ([...lists], "id");
  //   const index = temp.indexOf(id.target.value);
  //   console.log(index, "GG");
  //   console.log(temp, "eto yun");
  //   // console.log(delete temp[id], "here");
  // };

  return (
    <div className="flex items-center justify-center w-screen font-medium main-container ">
      <div className="flex flex-grow items-center justify-center h-full text-gray-600 bg-gray-900">
        <div className="max-w-full p-8 rounded-lg shadow-lg w-96 list-parent bg-gray-800 text-white">
          <div className="flex items-center mb-6">
            <NoteSVG />
            <h4 className="font-semibold ml-3 text-lg mr-3">React Todo list</h4>
          </div>
          <form onSubmit={(e) => submitHandler(e)}>
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
                ></path>
              </svg>
              <input
                required
                className="flex-grow h-8 ml-3 bg-transparent focus:outline-none font-medium form-control"
                type="text"
                placeholder="Add a new task"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
              <button
                className="pl-2 pr-2 pt-1 pb-1 rounded-sm focus:outline-none hover:bg-gray-700 bg-gray-900"
                type="submit"
              >
                Add
              </button>
            </div>
          </form>

          {lists.map((form) => {
            return (
              <div className="list-container list-scroll-dark">
                <div>
                  <input
                    className="hidden"
                    type="checkbox"
                    id="1615288285729"
                    checked={form.checked}
                    key={form.id}
                  />
                  <label
                    className="flex items-center h-10 px-2 rounded cursor-pointer hover:bg-gray-900"
                    htmlFor="1615288285729"
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
                        ></path>
                      </svg>
                    </span>
                    <input
                      type="text"
                      className="bg-transparent pl-4 text-sm focus:outline-none "
                      value={form.task}
                      key={form.id}
                    />
                    <button
                      className="text-xs focus:outline-none delete-button"
                      key={form.id}
                      // onClick={deleteTask}
                    >
                      Delete
                    </button>
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Content;
