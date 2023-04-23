const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getDaysInMonth = (date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

// Only edit below

const createData = () => {
  //Getting the first day of the month
  const ref = new Date();
  const day = new Date(ref.getFullYear(), ref.getMonth());
  const firstDay = day.getDay();
  //If first day is a Sunday i.e(0) let it equal 7
  if (firstDay === 0) {
    firstDay = 7;
  }

  //Getting the last day of the month
  const lastDayRef = new Date(ref.getFullYear(), ref.getMonth() + 1, 0);
  const lastDay = lastDayRef.getDay();

  let monthDays = getDaysInMonth(ref);
  let weekCount = 1;
  let weeks = [];
  let values = [];

  for (let i = 1; i < firstDay; i++) {
    values.push("");
  }
  for (let i = 0; i < monthDays; i++) {
    values.push(`${i + 1}`);
  }

  //If last day of month is not a Sunday, push '' for the remaining days of week until Sunday
  if (lastDay !== 0) {
    for (let i = lastDay; i < 7; i++) {
      values.push("");
    }
  }

  //Making the week count dynamic, so after every 7 days a new week is added
  for (let i = 0; i < values.length; i++) {
    if (i % 7 === 0) {
      weeks.push(`Week ${weekCount}`);
      weekCount++;
    }
  }

  //Combining the values array with the weeks array
  let result = [];
  let weekIndex = 0;
  for (let i = 0; i < values.length; i++) {
    if (i % 7 === 0) {
      result.push(weeks[weekIndex]);
      weekIndex++;
    }
    result.push(values[i]);
  }

  return result;
};

const addCell = (classString, value) => {
  const cells = `<td class="table__cell ${classString}">${value}</td>`;
  return cells;
};

const createHtml = (data) => {
  const newT = data;
  const today = new Date().getDate();
  const modifiers = {
    weekend: "table__cell_weekend",
    alternate: "table__cell_alternate",
    sidebar: "table__cell_sidebar",
    today: "table__cell_today",
  };

  let cell = "";
  let newCell = cell;
  let styleCount = 1;

  for (let i = 0; i < newT.length; i++) {
    let classString = "";
    let styling = "";
    if (styleCount % 2 === 0) {
      styling = modifiers.alternate;
    }
    if (i % 8 == 7 || i % 8 == 6) {
      classString = modifiers.weekend;
    }
    if (i % 8 == 0) {
      classString = modifiers.sidebar;
      styling = "";
    }
    if (newT[i] == today) {
      classString = modifiers.today;
      styling = "";
    }
    cell += addCell(`${classString} ${styling}`, newT[i]);
    if (i % 8 == 7) {
      cell += `<tr>${newCell}</tr>`;
      styleCount++;
    }
  }

  return cell;
};

// Only edit above

const current = new Date();
document.querySelector("[data-title]").innerText = `${
  MONTHS[current.getMonth()]
} ${current.getFullYear()}`;

const data = createData();
document.querySelector("[data-content]").innerHTML = createHtml(data);

const title = document.querySelector("[data-title]");
title.style.textAlign = "center";
