<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <button class="save_btn" @click="saveTodo">저장</button>
        </div>
        <div class="modal-body">
          <small class="section_title">Title</small>
          <input v-model="input_title" class="title" type="text" />
          <hr />

          <div class="input_section">
            <div class="is-vertical">
              <small class="section_title">Link</small>
              <input v-model="input_link" class="link" type="text" />
              <small class="section_title">Comment</small
              ><textarea
                v-model="input_comment"
                class="comment"
                cols="50"
                rows="10"
              ></textarea>
            </div>
            <div class="is-vertical">
              <div>
                <small class="section_title">Due</small>
                <Datepicker v-model="input_date" />
              </div>
              <div>
                <small class="section_title">co-doers</small
                ><input
                  v-model="input_coDoer"
                  @keyup.enter="addCoDoer"
                  class="co-doer"
                  type="text"
                />
                <button @click="addCoDoer">추가</button>
                <ul id="coDoer_list">
                  <div v-if="coDoer_list.length > 0">
                    <li v-for="(co, index) in coDoer_list" :key="co" class="">
                      {{ co }}
                      <button @click="coDoer_list.splice(index, 1)">❌</button>
                    </li>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, VueElement } from "vue";
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
