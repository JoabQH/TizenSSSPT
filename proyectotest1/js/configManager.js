const ConfigManager = {
  loadConfig: function () {
    return new Promise(function (resolve, reject) {
      const xhr = new XMLHttpRequest();
      xhr.overrideMimeType("application/json");
      xhr.open("GET", "config.json", true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200 || xhr.status === 0) {
            try {
              const config = JSON.parse(xhr.responseText);
              resolve(config);
            } catch (e) {
              reject("JSON mal formado");
            }
          } else {
            reject("No se pudo cargar config.json");
          }

        };
        xhr.send();
      });
    }

  };

  };*/


const ConfigManager = {
  async LoadConfig() {
    try{
    const response = await fetch ("config.json");
    if (!response.ok) throw new Error("No se pudo cargar config.json");
    const json = await response.json();
    return json;
  } catch (e) {
    console.error("Error cargando configuracion configManager", e);
  }
  }
};


        }
      };
      xhr.send();
    });
  },
};

