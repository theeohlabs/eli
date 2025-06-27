/**
 * DOM ELEMENTS
 */
const OPEN_LOG_DIALOG_BTN = document.getElementById("open-log-dialog");
const LOG_DIALOG = document.getElementById("log-dialog");
const CLOSE_LOG_DIALOG_BTN = document.getElementById("close-log-dialog");
const LOG_FORM = LOG_DIALOG.querySelector("form");
const LOG_TITLE_INPUT = document.getElementById("log-title");
const LOG_BODY_INPUT = document.getElementById("log-body");
const ADD_LOG_BTN = document.getElementById("add-log");
const LOGS_SECTION = document.getElementById("logs");

/**
 * DATA
 */
const logs = JSON.parse(localStorage.getItem("logs")) || [];

/**
 * EVENT LISTENERS
 */
document.querySelector("body").addEventListener("click", (e) => {
  // Opening and closing of the log create dialog
  if (e.target === OPEN_LOG_DIALOG_BTN) {
    openLogDialog();
  }
  if (e.target === CLOSE_LOG_DIALOG_BTN) {
    closeLogDialog();
  }
});

LOG_FORM.addEventListener("submit", (e) => {
  e.preventDefault();
  addLog();
});

LOG_TITLE_INPUT.addEventListener("input", () => {
  LOG_TITLE_INPUT.removeAttribute("aria-invalid");
});

LOG_BODY_INPUT.addEventListener("input", () => {
  LOG_BODY_INPUT.removeAttribute("aria-invalid");
});

/**
 * FUNCTIONS
 */
const openLogDialog = () => {
  LOG_DIALOG.toggleAttribute("open");
  console.log("Log create dialog opened");
};

const closeLogDialog = () => {
  clearForm();
  LOG_DIALOG.toggleAttribute("open");
  console.log("Log create dialog closed and inputs cleared");
};

const addLog = () => {
  // Get input data
  const title = LOG_TITLE_INPUT.value;
  const body = LOG_BODY_INPUT.value;

  // Ensure neither title nor body is empty
  if (!title && !body) {
    LOG_TITLE_INPUT.setAttribute("aria-invalid", "true");
    LOG_BODY_INPUT.setAttribute("aria-invalid", "true");
    return;
  } else if (!title) {
    LOG_TITLE_INPUT.setAttribute("aria-invalid", "true");
    return;
  } else if (!body) {
    LOG_BODY_INPUT.setAttribute("aria-invalid", "true");
    return;
  }

  // Push data to logs
  logs.push({
    title,
    body,
    date: new Date().toISOString(),
  });

  // Save logs to localStorage
  localStorage.setItem("logs", JSON.stringify(logs));
  console.log("Log created and saved");

  // Close dialog and clear inputs after submission
  clearForm();
  LOG_DIALOG.toggleAttribute("open");
  console.log("Log create dialog closed and inputs cleared");

  // Render
  renderLogs();
};

const renderLogs = () => {
  // Clear existing logs
  LOGS_SECTION.innerHTML = "";

  if (logs.length === 0) {
    LOGS_SECTION.innerHTML = `
        <p>
            <strong>No logs available. Create a new log to get started.</strong>
        </p>
    `;
    return;
  }

  logs
    .slice()
    .reverse()
    .forEach((log) => {
      const logEntry = document.createElement("article");
      logEntry.innerHTML = `
        <header>
            <hgroup class="log__header">
                <h2>${log.title}</h2>
                <p class="log__badge">${formatDate(log.date)}</p>
            </hgroup>
        </header>
        ${log.body}
      `;
      LOGS_SECTION.appendChild(logEntry);
    });

  console.log("Logs rendered");
};

const formatDate = (date) => {
  const logDate = new Date(date);
  return logDate.toLocaleDateString("en-ZA");
};

const clearForm = () => {
  LOG_TITLE_INPUT.value = "";
  LOG_BODY_INPUT.value = "";
  LOG_TITLE_INPUT.removeAttribute("aria-invalid");
  LOG_BODY_INPUT.removeAttribute("aria-invalid");
};

/**
 * INITIALIZE APP
 */
renderLogs();
