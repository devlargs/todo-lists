<template>
  <div id="app">
    <Nav :setLight="toggle" :light="light" />

    <div
      class="flex flex-grow items-center justify-center h-full text-gray-600 main-container"
      :class="light ? 'bg-gray-200' : 'bg-gray-900'"
    >
      <div
        class="max-w-full p-8 rounded-lg shadow-lg w-96 list-parent"
        :class="light ? 'bg-white' : 'bg-gray-800 text-white'"
      >
        <CardTitle />
        <AddForm
          :light="light"
          :onCreate="onCreate"
          :addInput="addInput"
          :setAddInput="setAddInput"
        />
        <Lists
          :lists="lists"
          :light="light"
          :onRemove="onRemove"
          :onFieldChange="onFieldChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AddForm from "./components/AddForm.vue";
import CardTitle from "./components/CardTitle.vue";
import Lists from "./components/Lists.vue";
import Nav from "./components/Nav.vue";

export default {
  name: "App",
  components: {
    AddForm,
    CardTitle,
    Lists,
    Nav,
  },
  data: () => {
    return {
      addInput: "",
      lists: localStorage.lists ? JSON.parse(localStorage.lists) : [],
      light: localStorage.light ? JSON.parse(localStorage.light) : false,
    };
  },
  methods: {
    setAddInput: function(value) {
      this.addInput = value;
    },
    keyBy: function(array, key) {
      return (array || []).reduce(
        (r, x) => ({ ...r, [key ? x[key] : x]: x }),
        {}
      );
    },
    maxCharError: function() {
      alert("too long");
    },
    toggle: function() {
      this.light = !this.light;
      localStorage.setItem("light", this.light);
    },
    onCreate: function(e) {
      const task = this.addInput;
      if (task.length >= 15) {
        this.maxCharError();
      }

      if (task) {
        this.lists = [{ id: +new Date(), task, checked: false }, ...this.lists];
        e.preventDefault();
        localStorage.setItem("lists", JSON.stringify(this.lists));
        this.addInput = "";
      }
    },
    onFieldChange: function(id, key, value) {
      const temp = this.keyBy([...this.lists], "id");
      if (key === "checked") {
        temp[id].checked = !temp[id].checked;
        const newLists = Object.values(temp);
        this.lists = newLists;
        localStorage.setItem("lists", JSON.stringify(newLists));
      } else {
        if (key === "task" && value.length >= 15) {
          this.maxCharError();
        } else {
          const newLists = Object.values(temp);
          temp[id].task = value;
          this.lists = newLists;
          localStorage.setItem("lists", JSON.stringify(newLists));
        }
      }
    },
    onRemove: function(id) {
      const temp = this.keyBy([...this.lists], "id");
      delete temp[id];
      this.lists = Object.values(temp);
      localStorage.setItem("lists", JSON.stringify(Object.values(temp)));
    },
  },
};
</script>

<style>
input[type="checkbox"]:checked + label span:first-of-type {
  background-color: #10b981;
  border-color: #10b981;
  color: #fff;
}

input[type="checkbox"]:checked + label span:nth-of-type(2) {
  text-decoration: line-through;
  color: #9ca3af;
}

input[type="checkbox"]:checked + label input[type="text"] {
  text-decoration: line-through;
  color: #9ca3af;
}

.switch-off {
  background-color: #111827;
}

.img-border {
  border: 2px dashed #111827;
  padding: 7px;
}

.home-title {
  color: #111827 !important;
}

.home-body {
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%235c1cc1' fill-opacity='0.06' fill-rule='evenodd'/%3E%3C/svg%3E");
}

.main-container {
  height: calc(100vh - 64px);
}

.logo-image {
  cursor: pointer !important;
}

.list-container {
  max-height: 40vh;
  overflow-y: auto;
}

::-webkit-scrollbar-track {
  border: 1px solid #1f2937;
  background-color: #f5f5f5;
}

::-webkit-scrollbar {
  width: 10px;
  background-color: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  background-color: #1f2937;
}

.list-scroll-dark::-webkit-scrollbar-track {
  border: 1px solid lightblue !important;
  background-color: #111827 !important;
}

.list-scroll-dark::-webkit-scrollbar {
  width: 10px !important;
  background-color: white !important;
}

.list-scroll-dark::-webkit-scrollbar-thumb {
  background-color: #60a5fa !important;
}

.list-parent {
  max-height: 60vh;
}

.delete-button:active {
  color: lightcoral;
  cursor: progress;
}
</style>
