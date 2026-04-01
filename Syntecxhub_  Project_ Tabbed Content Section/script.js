
function showTab(tabId, btn) {
  let tabs = document.querySelectorAll(".content");
  let buttons = document.querySelectorAll(".tab");

  tabs.forEach(tab => tab.classList.remove("active"));
  buttons.forEach(btn => btn.classList.remove("active"));

  document.getElementById(tabId).classList.add("active");
  btn.classList.add("active");
}   


