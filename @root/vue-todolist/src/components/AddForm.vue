<template>
  <form>
    <div
      class="flex items-center w-full h-8 px-2 mt-2 text-sm font-medium rounded"
    >
      <svg
        class="w-5 h-5 text-gray-400 fill-current"
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
        class="flex-grow h-8 ml-3 bg-transparent focus:outline-none font-medium"
        type="text"
        placeholder="Add a new task"
        :value="addInput"
        @change="setAddInput($event.target.value)"
      />
      <button
        @click="onCreate($event)"
        class="pl-2 pr-2 pt-1 pb-1 rounded-sm focus:outline-none"
        :class="
          light
            ? 'hover:bg-gray-200 bg-gray-300 text-gray-900'
            : 'hover:bg-gray-700 bg-gray-900'
        "
      >
        Add
      </button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    light: Boolean,
    onCreate: Function,
    addInput: String,
    setAddInput: Function,
  },
};
</script>

<style></style>
