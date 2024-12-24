import "./index.less";
document.getElementById("app").innerHTML = "这是首页的 JavaScript 内容";

const addNumber = (a, b) => {
  return a + b;
};
const test = undefined;

console.log(test ?? "222");
const object = {
  name: "zhangsan",
};
console.log(object?.name);
console.log(addNumber(1, 2));
