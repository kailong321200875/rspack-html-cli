import "./about.less";
import "./about.css";
import { modules } from "./about.module.css";
import { modules2, modules2Item } from "./about.module.less";

document.getElementById("app").innerHTML = "这是关于页面的 JavaScript 内容";
document.querySelector(".modules").classList.add(modules);

document.querySelector(".modules2").classList.add(modules2);
document.querySelector(".modules2Item").classList.add(modules2Item);
