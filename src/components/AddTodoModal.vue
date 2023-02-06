<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <button
            class="save_btn mb-4 bg-sky-800 hover:bg-sky-900 text-white border-none focus:outline-none"
            @click="saveTodo"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-7 h-7"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25"
              />
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <div
            class="mb-4 relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-sky-800 focus-within:ring-1 focus-within:ring-sky-800"
          >
            <label
              for="todo_title"
              class="section_title absolute -top-2 left-2 -mt-px inline-block bg-white px-1 font-medium text-gray-900"
              >Title</label
            >
            <input
              name="todo_title"
              v-model="input_title"
              class="title block w-full border-0 p-0 bg-white text-gray-900 placeholder-gray-500 focus:ring-0 focus:outline-none"
              type="text"
            />
          </div>
          <div class="input_section">
            <div class="is-vertical mr-3">
              <div
                class="mb-4 relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-sky-800 focus-within:ring-1 focus-within:ring-sky-800"
              >
                <label
                  for="todo_link"
                  class="section_title absolute -top-2 left-2 -mt-px inline-block bg-white px-1 font-medium text-gray-900"
                  >Link</label
                >
                <input
                  name="todo_link"
                  v-model="input_link"
                  class="link block w-full border-0 p-0 bg-white text-gray-900 placeholder-gray-500 focus:ring-0 focus:outline-none"
                  type="text"
                />
              </div>
              <div
                class="mb-4 relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-sky-800 focus-within:ring-1 focus-within:ring-sky-800"
              >
                <label
                  for="todo_comment"
                  class="section_title absolute -top-2 left-2 -mt-px inline-block bg-white px-1 font-medium text-gray-900"
                  >Comment</label
                ><textarea
                  name="todo_comment"
                  v-model="input_comment"
                  class="comment block border-0 p-0 bg-white text-gray-900 placeholder-gray-500 focus:ring-0 focus:outline-none"
                  cols="50"
                  rows="8"
                ></textarea>
              </div>
            </div>
            <div class="is-vertical">
              <div
                class="mb-4 relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-sky-800 focus-within:ring-1 focus-within:ring-sky-800"
              >
                <label
                  for="todo_due"
                  class="section_title absolute -top-2 left-2 -mt-px inline-block bg-white px-1 font-medium text-gray-900"
                  >Due</label
                >
                <Datepicker
                  name="todo_due"
                  v-model="input_date"
                  :style="datepickerCustom"
                  class="block border-0 p-0 bg-white text-gray-900 placeholder-gray-500 focus:ring-0 focus:outline-none"
                />
              </div>
              <div
                class="mb-4 flex relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-sky-800 focus-within:ring-1 focus-within:ring-sky-800"
              >
                <label
                  for="todo_coDoers"
                  class="section_title absolute -top-2 left-2 -mt-px inline-block bg-white px-1 font-medium text-gray-900"
                  >co-doers</label
                ><input
                  name="todo_coDoer"
                  v-model="input_coDoer"
                  @keyup.enter="addCoDoer"
                  class="co-doer block border-0 p-0 bg-white text-gray-900 placeholder-gray-500 focus:ring-0 focus:outline-none"
                  type="text"
                />
                <button
                  class="bg-white border-none focus:outline-none"
                  @click="addCoDoer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="sky-800"
                    class="w-6 h-6"
                  >
                    <path
                      d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"
                    />
                  </svg>
                </button>
              </div>

              <ul id="coDoer_list">
                <div v-if="coDoer_list.length > 0">
                  <li v-for="(co, index) in coDoer_list" :key="co">
                    {{ co }}
                    <button
                      class="bg-white border-none focus:outline-none"
                      @click="coDoer_list.splice(index, 1)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.8"
                        stroke="currentColor"
                        class="w-5 h-5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                        />
                      </svg>
                    </button>
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import Datepicker from "vue3-datepicker";

const input_title = ref("");
const input_link = ref("");
const input_comment = ref("");
const input_date = ref(new Date());
const input_coDoer = ref("");
const coDoer_list = ref([]);

const props = defineProps({
  selectedRow: {
    type: Object,
  },
});

const datepickerCustom = {
  "--vdp-hover-bg-color": "#0369a1",
  "--vdp-selected-bg-color": "#0369a1",
};

// 기존에 있던 todo 눌렀을 때
if (props.selectedRow.title !== "") {
  input_title.value = props.selectedRow.title;
  input_link.value = props.selectedRow.link;
  input_date.value = new Date(props.selectedRow.due);
  coDoer_list.value = props.selectedRow.coDoers;
  // input_comment.value <= db에서 가져오기
}

const input_data = {
  title: input_title,
  link: input_link,
  coDoers: coDoer_list,
  due: input_date,
};

const emit = defineEmits(["addNewOne"]);

const addCoDoer = () => {
  if (input_coDoer.value != "") {
    coDoer_list.value.push(input_coDoer.value);
    input_coDoer.value = "";
  }
};

const saveTodo = () => {
  emit("addNewOne", input_data);
};
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: fit-content;
  min-height: fit-content;
  height: auto;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  color: black;
}
.save_btn {
  display: flex;
}
input {
  display: block;
  width: 300px;
  height: 50px;
  margin: 3px;
}
textarea {
  resize: none;
}
.input_section {
  display: flex;
}
.section_title {
  display: flex;
}
#coDoer_list li {
  display: flex;
  justify-content: space-between;
}
</style>
