<template>
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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div
          class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div
            class="flex-shrink-0 flex items-center logo-image"
            :click="() => (window.location.pathname = '/')"
          >
            <img class="block lg:hidden h-8 w-auto" src="" alt="Workflow" />
            <img
              class="hidden lg:block h-8 w-auto"
              src="https://via.placeholder.com/110x32"
              alt=""
            />
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <a
                href="/"
                class="text-white px-3 py-2 rounded-md text-sm font-small hover:bg-gray-300 hover:text-black"
              >
                React
              </a>
              <a
                href="/angular"
                class="text-white px-3 py-2 rounded-md text-sm font-small hover:bg-gray-300 hover:text-black"
              >
                Angular
              </a>
              <a
                href="/angular"
                class="text-white px-3 py-2 rounded-md text-sm font-small hover:bg-gray-300 hover:text-black"
              >
                Svelte
              </a>
              <a
                href="/vue"
                class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Vue
              </a>
              <a
                href="/ember"
                class="text-white px-3 py-2 rounded-md text-sm font-small hover:bg-gray-300 hover:text-black"
              >
                Ember
              </a>
              <a
                href="/jquery"
                class="text-white px-3 py-2 rounded-md text-sm font-small hover:bg-gray-300 hover:text-black"
              >
                jQuery
              </a>
              <a
                href="/backbone"
                class="text-white px-3 py-2 rounded-md text-sm font-small hover:bg-gray-300 hover:text-black"
              >
                Backbone
              </a>
            </div>
          </div>
        </div>

        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <span
            class="border rounded-full border-grey flex items-center cursor-pointer w-12"
            v-bind:class="{
              'bg-gray-200 justify-start': light,
              'bg-gray-800 justify-end': !light,
            }"
            @click="toggle()"
          >
            <span
              class="rounded-full border w-6 h-6 border-grey shadow-inner bg-blue-400 shadow"
            ></span>
          </span>

          <div class="ml-3 relative">
            <div>
              <a
                class="bg-gray-800 flex text-sm rounded-full focus:outline-none"
                href="https://github.com/devlargs/todo-lists"
                target="_blank"
              >
                <span class="sr-only">Ralph Largo | @devlargs</span>
                <img
                  class="h-8 w-8 rounded-full"
                  src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                  alt="Go to github page"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="sm:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <a
          href="/react"
          class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
        >
          React
        </a>
        <a
          href="/angular"
          class="text-white block px-3 py-2 rounded-md text-base font-small"
        >
          Angular
        </a>
        <a
          href="/svelte"
          class="text-white block px-3 py-2 rounded-md text-base font-small"
        >
          Svelte
        </a>
        <a
          href="/vue"
          class="text-white block px-3 py-2 rounded-md text-base font-smallm"
        >
          Vue
        </a>
        <a
          href="/ember"
          class="text-white block px-3 py-2 rounded-md text-base font-small"
        >
          Ember
        </a>
        <a
          href="/jquery"
          class="text-white block px-3 py-2 rounded-md text-base font-small"
        >
          jQuery
        </a>
        <a
          href="/backbone"
          class="text-white block px-3 py-2 rounded-md text-base font-small"
        >
          Backbone
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Nav",
  props: {
    setLight: {
      type: Function,
    },
    light: {
      type: Boolean,
    },
  },
  methods: {
    toggle: function() {
      this.setLight();
      console.log(this.light);
      localStorage.setItem("light", this.light);
      //   localStorage.setI;
    },
  },
};
</script>

<style></style>
