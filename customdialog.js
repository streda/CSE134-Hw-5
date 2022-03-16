const alert = (msg) => {
  const dialog = document
    .getElementById("mydialog")
    .content.cloneNode(true)
    .querySelector("dialog");
  dialog.querySelector(".message").textContent = msg;
  dialog.querySelector(".cancel").style.display = "none";
  dialog.querySelector(".input").style.display = "none";
  document.body.appendChild(dialog);
  dialog.showModal();
};
const confirm = (msg, callback) => {
  const dialog = document
    .getElementById("mydialog")
    .content.cloneNode(true)
    .querySelector("dialog");
  dialog.querySelector(".message").textContent = msg;
  dialog.querySelector(".ok").value = "true";
  dialog.querySelector(".cancel").value = "false";
  dialog.querySelector(".input").style.display = "none";
  document.body.appendChild(dialog);
  dialog.showModal();
  dialog.addEventListener("close", () => {
    callback(dialog.returnValue === "true");
  });
};
const prompt = (msg, callback) => {
  const dialog = document
    .getElementById("mydialog")
    .content.cloneNode(true)
    .querySelector("dialog");
  dialog.querySelector(".message").textContent = msg;
  dialog.querySelector(".ok").value = "";
  dialog.querySelector(".cancel").value = "cancel";
  document.body.appendChild(dialog);
  dialog.showModal();
  dialog.querySelector(".input").addEventListener("change", (event) => {
    dialog.querySelector(".ok").value = event.target.value;
  });
  dialog.addEventListener("close", () => {
    callback(dialog.returnValue === "cancel" ? null : dialog.returnValue);
  });
};

const customPrompt = (id, build, callback) => {
  const dialog = document
    .getElementById(id)
    .content.cloneNode(true)
    .querySelector("dialog");
  build(dialog);
  document.body.appendChild(dialog);
  dialog.showModal();
  dialog.addEventListener("close", () => {
    callback(dialog.returnValue === "cancel" ? undefined: dialog);
  });
};

export { alert, confirm, prompt, customPrompt };
