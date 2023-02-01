import { mount } from "@vue/test-utils";

// import TodoList from "../../src/components/TodoList";

// test("test", () => {
//   const wrapper = mount(TodoList);
//   expect(wrapper.exists()).toBe(true);
// });

const TodoList = require("../../src/components/TodoList");

test("test", () => {
  const wrapper = mount(TodoList);
  expect(wrapper.exists()).toBe(true);
});

const str = "erer";
test("test", () => {
  expect(str).toBe("erer");
});
