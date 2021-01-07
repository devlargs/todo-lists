"use strict";

const Root = () => {
  const [light, setLight] = React.useState(false);
  const [lists, setLists] = React.useState([
    {
      key: "ralphlargo",
    },
  ]);
  return /*#__PURE__*/ React.createElement(
    "div",
    {
      className:
        "flex items-center justify-center w-screen h-screen font-medium",
    },
    light
      ? /*#__PURE__*/ React.createElement(
          "div",
          {
            className:
              "flex flex-grow items-center justify-center h-full text-gray-600 bg-gray-100",
          },
          /*#__PURE__*/ React.createElement(
            "div",
            {
              className: "max-w-full p-8 bg-white rounded-lg shadow-lg w-96",
            },
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "flex items-center mb-6",
              },
              /*#__PURE__*/ React.createElement(
                "svg",
                {
                  className: "h-8 w-8 text-indigo-500 stroke-current",
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor",
                },
                /*#__PURE__*/ React.createElement("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: "2",
                  d:
                    "M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4",
                })
              ),
              /*#__PURE__*/ React.createElement(
                "h4",
                {
                  className: "font-semibold ml-3 text-lg mr-3",
                },
                "React Todo list"
              )
            ),
            /*#__PURE__*/ React.createElement(
              "div",
              null,
              /*#__PURE__*/ React.createElement("input", {
                className: "hidden",
                type: "checkbox",
                id: "task_2",
                defaultChecked: true,
              }),
              /*#__PURE__*/ React.createElement(
                "label",
                {
                  className:
                    "flex items-center h-10 px-2 rounded cursor-pointer hover:bg-gray-100",
                  htmlFor: "task_2",
                },
                /*#__PURE__*/ React.createElement(
                  "span",
                  {
                    className:
                      "flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-300 rounded-full",
                  },
                  /*#__PURE__*/ React.createElement(
                    "svg",
                    {
                      className: "w-4 h-4 fill-current",
                      xmlns: "http://www.w3.org/2000/svg",
                      viewBox: "0 0 20 20",
                      fill: "currentColor",
                    },
                    /*#__PURE__*/ React.createElement("path", {
                      fillRule: "evenodd",
                      d:
                        "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                      clipRule: "evenodd",
                    })
                  )
                ),
                /*#__PURE__*/ React.createElement(
                  "span",
                  {
                    className: "ml-4 text-sm",
                  },
                  "Chill and smoke some Old Toby."
                )
              )
            ),
            /*#__PURE__*/ React.createElement(
              "div",
              null,
              /*#__PURE__*/ React.createElement("input", {
                className: "hidden",
                type: "checkbox",
                id: "task_5",
              }),
              /*#__PURE__*/ React.createElement(
                "label",
                {
                  className:
                    "flex items-center h-10 px-2 rounded cursor-pointer hover:bg-gray-100",
                  htmlFor: "task_5",
                },
                /*#__PURE__*/ React.createElement(
                  "span",
                  {
                    className:
                      "flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-300 rounded-full",
                  },
                  /*#__PURE__*/ React.createElement(
                    "svg",
                    {
                      className: "w-4 h-4 fill-current",
                      xmlns: "http://www.w3.org/2000/svg",
                      viewBox: "0 0 20 20",
                      fill: "currentColor",
                    },
                    /*#__PURE__*/ React.createElement("path", {
                      fillRule: "evenodd",
                      d:
                        "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                      clipRule: "evenodd",
                    })
                  )
                ),
                /*#__PURE__*/ React.createElement(
                  "span",
                  {
                    className: "ml-4 text-sm",
                  },
                  "Destroy ring and defeat dark lord."
                )
              )
            ),
            /*#__PURE__*/ React.createElement(
              "button",
              {
                className:
                  "flex items-center w-full h-8 px-2 mt-2 text-sm font-medium rounded",
              },
              /*#__PURE__*/ React.createElement(
                "svg",
                {
                  className: "w-5 h-5 text-gray-400 fill-current",
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor",
                },
                /*#__PURE__*/ React.createElement("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: "2",
                  d: "M12 6v6m0 0v6m0-6h6m-6 0H6",
                })
              ),
              /*#__PURE__*/ React.createElement("input", {
                className:
                  "flex-grow h-8 ml-4 bg-transparent focus:outline-none font-medium",
                type: "text",
                placeholder: "add a new task",
              })
            )
          )
        )
      : /*#__PURE__*/ React.createElement(
          "div",
          {
            className:
              "flex flex-grow items-center justify-center h-full bg-gray-900 ",
          },
          /*#__PURE__*/ React.createElement(
            "div",
            {
              className:
                "max-w-full p-8 bg-gray-800 rounded-lg shadow-lg w-96 text-gray-200",
            },
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "flex items-center mb-6",
              },
              /*#__PURE__*/ React.createElement(
                "svg",
                {
                  className: "h-8 w-8 text-indigo-500 stroke-current",
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor",
                },
                /*#__PURE__*/ React.createElement("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: "2",
                  d:
                    "M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4",
                })
              ),
              /*#__PURE__*/ React.createElement(
                "h4",
                {
                  className: "font-semibold ml-3 text-lg",
                },
                "React Todo List"
              )
            ),
            /*#__PURE__*/ React.createElement(
              "div",
              null,
              /*#__PURE__*/ React.createElement("input", {
                className: "hidden",
                type: "checkbox",
                id: "task_7",
                defaultChecked: true,
              }),
              /*#__PURE__*/ React.createElement(
                "label",
                {
                  className:
                    "flex items-center h-10 px-2 rounded cursor-pointer hover:bg-gray-900",
                  htmlFor: "task_7",
                },
                /*#__PURE__*/ React.createElement(
                  "span",
                  {
                    className:
                      "flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-500 rounded-full",
                  },
                  /*#__PURE__*/ React.createElement(
                    "svg",
                    {
                      className: "w-4 h-4 fill-current",
                      xmlns: "http://www.w3.org/2000/svg",
                      viewBox: "0 0 20 20",
                      fill: "currentColor",
                    },
                    /*#__PURE__*/ React.createElement("path", {
                      fillRule: "evenodd",
                      d:
                        "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                      clipRule: "evenodd",
                    })
                  )
                ),
                /*#__PURE__*/ React.createElement(
                  "span",
                  {
                    className: "ml-4 text-sm",
                  },
                  "Eavesdrop on Master Frodo & Gandalf."
                )
              )
            ),
            /*#__PURE__*/ React.createElement(
              "div",
              null,
              /*#__PURE__*/ React.createElement("input", {
                className: "hidden",
                type: "checkbox",
                id: "task_10",
              }),
              /*#__PURE__*/ React.createElement(
                "label",
                {
                  className:
                    "flex items-center h-10 px-2 rounded cursor-pointer hover:bg-gray-900",
                  htmlFor: "task_10",
                },
                /*#__PURE__*/ React.createElement(
                  "span",
                  {
                    className:
                      "flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-500 rounded-full",
                  },
                  /*#__PURE__*/ React.createElement(
                    "svg",
                    {
                      className: "w-4 h-4 fill-current",
                      xmlns: "http://www.w3.org/2000/svg",
                      viewBox: "0 0 20 20",
                      fill: "currentColor",
                    },
                    /*#__PURE__*/ React.createElement("path", {
                      fillRule: "evenodd",
                      d:
                        "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                      clipRule: "evenodd",
                    })
                  )
                ),
                /*#__PURE__*/ React.createElement(
                  "span",
                  {
                    className: "ml-4 text-sm",
                  },
                  "Be all round legend."
                )
              )
            ),
            /*#__PURE__*/ React.createElement(
              "button",
              {
                className:
                  "flex items-center w-full h-8 px-2 mt-2 text-sm font-medium rounded",
              },
              /*#__PURE__*/ React.createElement(
                "svg",
                {
                  className: "w-5 h-5 text-gray-400 fill-current",
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor",
                },
                /*#__PURE__*/ React.createElement("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: "2",
                  d: "M12 6v6m0 0v6m0-6h6m-6 0H6",
                })
              ),
              /*#__PURE__*/ React.createElement("input", {
                className:
                  "flex-grow h-8 ml-4 bg-transparent focus:outline-none font-medium",
                type: "text",
                placeholder: "add a new task",
              })
            )
          )
        )
  );
};

ReactDOM.render(
  /*#__PURE__*/ React.createElement(Root, null),
  document.getElementById("app")
);
