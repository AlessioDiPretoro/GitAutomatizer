const formOpt = document.getElementById("options");
let selectedOpt = "";
const message = document.getElementById("message");
const clearBtn = document.getElementById("clearBtn");

document.body.onload = () => {
  chrome.storage.sync.get("gitAutOpt", function (items) {
    if (!chrome.runtime.error) {
      if (items.gitAutOpt) {
        selectedOpt = items.gitAutOpt;
        message.innerHTML = "Selected option: " + selectedOpt;
      } else {
        chrome.storage.sync.set({
          gitAutOpt: selectedOpt,
        });
        message.innerHTML = "No selected option";
      }
    }
  });
};

formOpt.addEventListener("submit", (f) => {
  f.preventDefault();
  const radioElement = formOpt.querySelector('input[name="radio"]:checked');
  selectedOpt = radioElement ? radioElement.value : null;
  console.log("opzione:" + selectedOpt);
  message.innerHTML = "Selected option: " + selectedOpt;
  chrome.storage.sync.set(
    {
      gitAutOpt: selectedOpt,
    },
    () => {
      chrome.storage.sync.get("gitAutOpt", function (items) {
        if (!chrome.runtime.error) {
          console.log("gitAutOpt edited", items);
        }
      });
    }
  );
});

clearBtn.addEventListener("click", () => {
  chrome.storage.sync.remove("gitAutOpt", function () {});
  message.innerHTML = "No selected option";
});
