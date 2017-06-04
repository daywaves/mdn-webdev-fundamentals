var displayedImage = document.querySelector('.displayed-img');
var thumbBar = document.querySelector('.thumb-bar');

btn = document.querySelector('button');
var overlay = document.querySelector('.overlay');

/* Looping through images */
for (let i = 1; i <= 5; i++) {
  var newImage = document.createElement('img');
  newImage.setAttribute('src', `images/pic${i}.jpg`);
  newImage.addEventListener('click', event => setImage(event.target.src));
  thumbBar.appendChild(newImage);
}

function setImage(src) {
  displayedImage.setAttribute('src', src);
}

/* Wiring up the Darken/Lighten button */
btn.addEventListener('click', () => {
  const className = btn.getAttribute('class');
  if (className === 'dark') {
    btn.setAttribute('class', 'light');
    btn.textContent = 'Lighten';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
  } else if (className === 'light') {
    btn.setAttribute('class', 'dark');
    btn.textContent = 'Darken';
    overlay.style.backgroundColor = 'rgba(0,0,0,0)';
  }
});
