
import { mount } from "@vue/test-utils";

// import TodoList from "../../src/components/TodoList";

// test("test", () => {
//   const wrapper = mount(TodoList);
//   expect(wrapper.exists()).toBe(true);
// });
import TodoList from "../../src/components/TodoList";

describe('todoList', () => {
  it("test1", () => {
    const wrapper = mount(TodoList);
    expect(wrapper.exists()).toBe(true);
  });
  
  const str = "erer";
  it("test", () => {
    expect(str).toBe("erer");
  });
})

