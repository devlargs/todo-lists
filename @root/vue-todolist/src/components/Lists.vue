<template>
  <div class="list-container" v-bind:class="{ 'list-scroll-dark': !light }">
    <div v-if="lists.length">
      <div v-for="(q, i) in lists" :key="i">
        <input class="hidden" type="checkbox" />
        <label
          class="flex items-center h-10 px-2 rounded cursor-pointer"
          :class="light ? 'hover:bg-gray-300' : 'hover:bg-gray-300'"
          :htmlFor="q.id"
        >
          <span
            class="flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-500 rounded-full"
          >
            <svg
              class="w-4 h-4 fill-current"
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
            class="bg-transparent pl-4 text-sm focus:outline-none "
            :value="q.task"
          />

          <button
            class="text-xs focus:outline-none delete-button"
            @click="onRemove(q.id)"
          >
            Delete
          </button>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    light: Boolean,
    lists: Array,
    onRemove: Function,
  },
};
</script>

<style></style>
