// ===== CONFIGURACIÓN DE ETAPA =====
const ETAPA = 204; // cambia a 2 o 3 según la etapa
const COOKIE_NAME = `votado_2026_etapa${ETAPA}`;
// =================================

document.getElementById("votingForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const boton = document.querySelector("button[type='submit']");

  // Evita doble envío
  if (boton.disabled) return;

  // Validar si ya votó
  if (document.cookie.includes(COOKIE_NAME + "=true")) {
    alert("¡Gracias por participar! Tu voto ya ha sido registrado. Solo se permite un voto por persona.");
    return;
  }

  const seleccion = document.querySelector('input[name="candidata"]:checked');
  if (!seleccion) return alert("Selecciona una candidata.");
  
    // Desactivar botón inmediatamente
  boton.disabled = true;
  boton.innerText = "Enviando voto...";                                                    

  const voto = seleccion.value;

  const urls = [
    "https://script.google.com/macros/s/AKfycbzFJIq4VBJBcgHQpetnpDZr2F-mODx2hTQgfeUShrCLLbeLHH7xFQe8Kn7-TSfAxMmL/exec",
    "https://script.google.com/macros/s/AKfycbwhFm0Lwhh_nY8HjCKGnJR3YkvGYjv_xAvWdcI-mAQTyDfTwPPHgd0bhxbSFF8_xtWmlQ/exec",
    "https://script.google.com/macros/s/AKfycbxfBUHiSiQSA1SOihsZkPbfMJocybxTEJu8q6abRdW8B8hhdPpE_-rjgovoPdf37VKh/exec",
    "https://script.google.com/macros/s/AKfycbwyufEDvao79wBOma_FN3WW88Isx_Ni2ikautII-1dMI0RQP5FJvLZSG4qnbO4hvTMuiw/exec",
    "https://script.google.com/macros/s/AKfycbwfXjNXc1tIqOIZdycxKGzBytIcM4z2KKHJDbbYEAZrPq4GAedAwvVU2uHkPZhewAix/exec",
    "https://script.google.com/macros/s/AKfycbyZ6Tnj1TbSkhnEfy9buKVVzjnSwncwesPr2tGiaEYdLRoK-sYFSyKVV13ZoTjNB-jq/exec"
  ];

  const url = urls[Math.floor(Math.random() * urls.length)];

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `voto=${encodeURIComponent(voto)}`
  })
  .then(response => response.json())
  .then(data => {

    if (data.status === "ok") {

      document.cookie = COOKIE_NAME + "=true; max-age=" + (60 * 60 * 24 * 30) + "; path=/";

      window.location.href = "cargando.html";

    } else {
      boton.disabled = false;
      boton.innerText = "Enviar voto";
      alert("Error registrando el voto. Intenta nuevamente.");
    }

  })
  .catch(error => {
    console.error("Error:", error);
    boton.disabled = false;
    boton.innerText = "Enviar voto";
    alert("Error de conexión. Intenta nuevamente.");
  });

});


