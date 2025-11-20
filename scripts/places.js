const yearSpan = document.querySelector("#currentyear");
const lastModifiedSpan = document.querySelector("#lastmodified");

const today = new Date();
yearSpan.textContent = today.getFullYear();
lastModifiedSpan.textContent = document.lastModified;

const temperature = 8;    // °C
const windSpeed = 12;     // km/h

const tempSpan = document.querySelector("#temp");
const windSpan = document.querySelector("#wind");
const windChillSpan = document.querySelector("#windchill");

tempSpan.textContent = temperature;
windSpan.textContent = windSpeed;

const calculateWindChill = (t, v) =>
  13.12 + 0.6215 * t - 11.37 * Math.pow(v, 0.16) + 0.3965 * t * Math.pow(v, 0.16);

if (temperature <= 10 && windSpeed > 4.8) {
  const chill = calculateWindChill(temperature, windSpeed);
  windChillSpan.textContent = `${chill.toFixed(1)} °C`;
} else {
  windChillSpan.textContent = "N/A";
}
