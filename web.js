let settingBtn = document.getElementById("settings-tab");
let selectedOp = "";

function privateRepo() {
  //all clicks to change to private the repo
  if (settingBtn) {
    settingBtn.click();
  }
  setTimeout(function () {
    const btn = document.getElementById("visibility_menu-text");
    if (btn) {
      btn.click();
      const list = document.getElementById("visibility_menu-list");
      const btn2 = list.querySelector(".js-repo-change-visibility-button");
      if (btn2) {
        btn2.click();
        // click I want to make this repository private ...
        const btn3 = document.getElementById("repo-visibility-proceed-button-private");
        console.log("btn3 " + btn3.textContent);
        if (btn3) {
          btn3.click();
          // I have read and understand these effect ...
          const btn4 = document.getElementById("repo-visibility-proceed-button-private");
          console.log("btn4 " + btn4.textContent);
          btn4.click();
          const btn5 = document.getElementById("repo-visibility-proceed-button-private");
          btn5.click();
        }
      }
    }
  }, 2000);
}

function deleteRepo() {
  //all clicks to delete the repo
  if (settingBtn) {
    settingBtn.click();
  }
  setTimeout(function () {
    // click Delete this repository
    const deleteBtn = document.getElementById("dialog-show-repo-delete-menu-dialog");
    if (deleteBtn) {
      deleteBtn.click();
      // click I want to delete this repository
      const deleteBtn2 = document.getElementById("repo-delete-proceed-button");
      if (deleteBtn2) {
        deleteBtn2.click();
        // click I have read and ...
        const deleteBtn3 = document.getElementById("repo-delete-proceed-button");
        if (deleteBtn3) {
          deleteBtn3.click();
          // set the input validation and click delete
          const verField = document.getElementById("verification_field");
          if (verField) {
            const verText = verField.dataset.repoNwo;
            verField.value = verText;
            const deleteFinalBtn = document.getElementById("repo-delete-proceed-button");
            deleteFinalBtn.disabled = false;
            deleteFinalBtn.click();
          }
        }
      }
    }
  }, 2000);
}

// Verifica sulla pagina di GitHub e ottenimento delle opzioni salvate
var url = window.location.href;
chrome.storage.sync.get("gitAutOpt", function (items) {
  if (!chrome.runtime.error) {
    let selectedOp = items.gitAutOpt;
    if (selectedOp && url.includes("github.com")) {
      console.log("Opzione salvata: " + selectedOp);
      // Esegui l'azione corrispondente all'opzione
      if (selectedOp === "1") {
        privateRepo();
      } else if (selectedOp === "2") {
        deleteRepo();
      } else {
        // Opzione non valida
        console.log("Opzione non valida");
      }
    } else {
      // Mostra un avviso se non ci sono opzioni salvate o non siamo su GitHub
      showNoOptionAlert();
    }
  }
});

function showNoOptionAlert() {
  let myAlert = document.createElement("div");
  myAlert.innerHTML = `
      <h1 style="color: white; margin: 1em 0">GitAutomator Alert!!!</h1>
      <p style="margin: 1em 0">Nessuna opzione scelta, vai alla pagina delle opzioni e scegli la tua azione automatizzata</p>
      <div style="text-align: end">
      <a id="closeAlert" style="color: #2962ff">Chiudi</a>
      </div>  
  `;
  myAlert.style.cssText =
    "color: white; position: fixed; top: 0; left: 30%; background: #a5a5a5;padding: 1em 3em;border-radius: 50px;margin: 1em;z-index: 20000";
  document.querySelector("body").appendChild(myAlert);
  myAlert.querySelector("#closeAlert").addEventListener("click", () => {
    myAlert.remove();
  });
}
