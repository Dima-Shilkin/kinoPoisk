export function changeTheme() {
const checkbox = document.querySelector('.checkbox__inp');
const body = document.querySelector('body');
const theme = localStorage.getItem('theme');

if (theme) {
  body.classList.add(theme);
  checkbox.checked = true;
}

checkbox.addEventListener('change', () => {
  body.classList.toggle('theme-light', checkbox.checked);

  if (checkbox.checked) {
    localStorage.setItem('theme', 'theme-light')
  } else {
  localStorage.removeItem('theme')
  }
});
}