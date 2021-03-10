import { useState } from "react";
import NoteSVG from "./components/Note";
import Task from "./components/Task";
import Navbar from "./Navbar";

const Content = () => {
  const [light, setLight] = useState(false);
  const [value, setValue] = useState("");
  const [lists, setLists] = useState(
    localStorage.lists ? JSON.parse(localStorage.lists) : []
  );

  const submitHandler = (e) => {
    e.preventDefault();
    setLists((prev) => {
      const temp = [...prev, { id: +new Date(), task: value, checked: false }];
      localStorage.setItem("lists", JSON.stringify(temp));
      return temp;
    });
    setValue("");
  };

  const deleteTask = (id) => {
    const index = lists.filter((q) => q.id === id);
    const temp = [...lists];
    temp.splice(index, 1);
    setLists(temp);
  };

  const onFieldChange = (id, value, key) => {
    let temp = [...lists];
    temp = temp.map((q) => {
      if (q.id === id) {
        return { ...q, [key]: value };
      }
      return q;
    });
    setLists(temp);
  };

  return (
    <div>
      <Navbar light={light} setLight={setLight} />
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
              <NoteSVG />
              <h4 className="font-semibold ml-3 text-lg mr-3">
                React Todo list
              </h4>
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
                  className={`pl-2 pr-2 pt-1 pb-1 rounded-sm focus:outline-none hover:${
                    light
                      ? "bg-gray-200 bg-gray-300 text-gray-900 "
                      : "bg-gray-700 bg-gray-900"
                  }`}
                  type="submit"
                >
                  Add
                </button>
              </div>
            </form>
            {lists.map((q, i) => {
              return (
                <Task
                  key={i}
                  task={q.task}
                  id={q.id}
                  checked={q.checked}
                  deleteTask={() => deleteTask(q.id)}
                  onFieldChange={onFieldChange}
                  onChecked={(e) => onFieldChange()}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
