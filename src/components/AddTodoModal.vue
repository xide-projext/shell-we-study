<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <button
            class="save_btn mb-4 bg-sky-800 hover:bg-sky-900 text-white border-none focus:outline-none"
            @click="saveTodo"
          >
            저장
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
                  class="link block border-0 p-0 bg-white text-gray-900 placeholder-gray-500 focus:ring-0 focus:outline-none"
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
                  ➕
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
                      ❌
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
  border-radius: 2px;
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
