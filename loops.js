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

const createArray = (input) => {
  const result = [];
  result.length = input;
  return result;
};

const createData = () => {
  const ref = new Date();
  let day = new Date(ref.getFullYear(), ref.getMonth());
  let monthDays = getDaysInMonth(ref);
  let weeks = createArray(5);
  let values = [];

  for (let i = 1; i < day.getDay(); i++) {
    values.push("");
  }
  for (let i = 0; i < monthDays; i++) {
    values.push(`${i + 1}`);
  }
  for (let i = 0; i < weeks.length; i++) {
    weeks[i] = `Week ${i + 1}`;
  }
  let result = [];
  let weekIndex = 0;
  for (let i = 0; i < values.length; i++) {
    if (i % 7 === 0 || i == 0) {
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
  let newT = data;
  let cell = "";
  let newCell = cell;
  const today = new Date().getDate();
  const modifiers = {
    weekend: "table__cell_weekend",
    alternate: "table__cell_alternate",
    sidebar: "table__cell_sidebar",
    today: "table__cell_today",
  };

  for (let i = 0; i < newT.length; i++) {
    let classString = "";
    let styling = "";
    if (i <= 7 || (i > 15 && i <= 23) || (i > 31 && i <= 40)) {
      styling = modifiers.alternate;
    } else styling = "";
    if (i % 8 == 7 || i % 8 == 6) {
      classString = modifiers.weekend;
    }
    if (i % 8 == 0) {
      classString = modifiers.sidebar;
      styling = "";
    }
    if (newT[i] == today) {
      classString = modifiers.today;
    }
    cell += addCell(`${classString} ${styling}`, newT[i]);
    if (i % 8 == 7) {
      cell += `<tr>${newCell}</tr>`;
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
