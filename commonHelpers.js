import"./assets/modulepreload-polyfill-ec808ebb.js";/* empty css                      */const o=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),n=document.querySelector("body");let t=null;o.addEventListener("click",r);e.addEventListener("click",a);e.disabled=!0;function r(){t||(o.disabled=!0,e.disabled=!1,t=setInterval(l,1e3))}function a(){t&&(clearInterval(t),t=null),o.disabled=!1,e.disabled=!0}function l(){n.style.backgroundColor=d()}function d(){return`#${Math.floor(Math.random()*16777215).toString(16).padStart(6,0)}`}
//# sourceMappingURL=commonHelpers.js.map
