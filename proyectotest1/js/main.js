
/* global ConfigManager, TimeSync */

window.onload = async () => {
  const msg = document.getElementById("message");

  try {
    const config = await ConfigManager.LoadConfig();

    TimeSync.init(config, (status) => {
      msg.textContent = status;

      setTimeout(() => {
        try {
          tizen.application.getCurrentApplication().exit();
        } catch (e) {
          console.error("No se puede cerrar la app main", e);
        }
      }, 5000);
    });
  } catch (e) {
    msg.textContent = "Error cargando configuración main";
    console.error(e);
  }

};

document.addEventListener("DOMContentLoaded", function () {
  const message = document.getElementById("message");

  function ajustarHoraConConfig(config) {
    window.TimeSync.init(config, function (statusMsg) {
      message.innerHTML = statusMsg;
    
      config.lastUpdate = new Date().toISOString();
      LocalStorageManager.saveConfig(config);
    });
  }

  ConfigManager.loadConfig()
    .then((config) => {
      ajustarHoraConConfig(config);
    })
    .catch((err) => {
      console.warn("Fallo al cargar config.json:", err);
      message.innerHTML = "Cargando configuración local...";

      LocalStorageManager.loadConfig((error, savedConfig) => {
        if (error) {
          message.innerHTML = "Sin conexión y sin configuración local";
          console.error(error);
        } else {
          ajustarHoraConConfig(savedConfig);
        }
      });
      
    });
    setTimeout(function () {
      console.log("Cerrando la aplicación...");
      tizen.application.getCurrentApplication().exit();
    }, 10000); 

});
