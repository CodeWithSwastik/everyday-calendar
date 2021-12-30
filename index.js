let sfx = true;

function renderCalendar(date) {
  const calendarBody = document.getElementById("body");
  calendarBody.innerHTML = "";
  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "long" });
  const yearElement = document.getElementById("year");
  yearElement.innerText = year;
  const monthElement = document.getElementById("month");
  monthElement.innerText = month;

  for (let i = 1; i <= daysInMonth(date.getMonth() + 1, year); i++) {
    const button = document.createElement("button");
    button.classList.add("button");
    const node = document.createTextNode(`${i}`);
    button.appendChild(node);
    calendarBody.appendChild(button);
    button.addEventListener("click", () => {
      if (sfx) new Audio("sfx/success.mp3").play();
      button.classList.add("pressed");
      button.disabled = true;
      setDateData(i, month, year, true);
    });
    if (getDateData(i, month, year)) {
      button.classList.add("pressed");
      button.disabled = true;
    }
  }
}

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}
function getDateData(date, month, year) {
  let obj = JSON.parse(localStorage.getItem("data"));
  if (!obj[year]) {
    obj[year] = {};
  }
  if (!obj[year][month]) {
    obj[year][month] = {};
  }

  if (!obj[year][month][date]) {
    obj[year][month][date] = false;
  }
  localStorage.setItem("data", JSON.stringify(obj));
  return obj[year][month][date];
}

function setDateData(date, month, year, value) {
  let obj = JSON.parse(localStorage.getItem("data"));
  obj[year][month][date] = value;
  localStorage.setItem("data", JSON.stringify(obj));
}

if (!localStorage.getItem("data")) {
  localStorage.setItem("data", JSON.stringify({}));
}

let curDate = new Date();
renderCalendar(curDate);
const back = document.getElementById("back");
back.addEventListener("click", () => {
  curDate = moment(curDate).add(-1, "month").toDate();
  renderCalendar(curDate);
  if (sfx) new Audio("sfx/pop.wav").play();
});

const forward = document.getElementById("forward");
forward.addEventListener("click", () => {
  curDate = moment(curDate).add(1, "month").toDate();
  renderCalendar(curDate);
  if (sfx) new Audio("sfx/pop.wav").play();
});

const reset = document.getElementById("reset");
reset.addEventListener("click", () => {
  let obj = JSON.parse(localStorage.getItem("data"));
  obj[curDate.getFullYear()][
    curDate.toLocaleString("default", { month: "long" })
  ] = {};
  localStorage.setItem("data", JSON.stringify(obj));
  renderCalendar(curDate);
  if (sfx) new Audio("sfx/pop.wav").play();
});

const root = document.querySelector(":root");
let accentColor = localStorage.getItem("accent");
if (!accentColor) {
  localStorage.setItem("accent", root.style.getPropertyValue("--main-accent"));
} else {
  root.style.setProperty("--main-accent", accentColor);
}

const colorPicker = document.getElementById("colorPicker");
colorPicker.value = accentColor;
colorPicker.addEventListener("input", () => {
  const root = document.querySelector(":root");
  root.style.setProperty("--main-accent", colorPicker.value);
  localStorage.setItem("accent", colorPicker.value);
});

const colorPickerToggle = document.getElementById("colorPickerToggle");
colorPickerToggle.addEventListener("click", () => {
  colorPicker.focus();
  colorPicker.click();
  if (sfx) new Audio("sfx/pop.wav").play();
});

const sfxToggle = document.getElementById("sfxToggle");
const sfxToggleIcon = document.getElementById("sfxToggleIcon");
sfxToggle.addEventListener("click", () => {
  sfx = !sfx;
  if (sfxToggleIcon.classList.contains("fa-volume-up")) {
    console.log("wea");
    sfxToggleIcon.classList.remove("fa-volume-up");
    sfxToggleIcon.classList.add("fa-volume-mute");
  } else {
    sfxToggleIcon.classList.remove("fa-volume-mute");
    sfxToggleIcon.classList.add("fa-volume-up");
  }
  if (sfx) new Audio("sfx/pop.wav").play();
});
