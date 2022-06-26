const closeNavPhones = document.querySelector('.nav-container-phones > button');
const openNavPhones = document.querySelector('.nav-container nav:last-child');
const navBarPhones = document.querySelector('.nav-container-phones');


if(localStorage.getItem('gender') === "M") {
    document.getElementById('profile-img').src = '../images/profile-card-pic-male.jpg';

} else if(localStorage.getItem('gender') === "F") {
    document.getElementById('profile-img').src = '../images/profile-card-pic-female.jpg';

} else if (localStorage.getItem('gender') === "O"){
    document.getElementById('profile-img').src = '../images/profile-card-pic-other.jpg';

} else {
    document.getElementById('profile-img').src = '../images/dead-face.jpg';
    document.getElementById('user-info').textContent = 'Not Signed In';
    document.getElementById('user-info').style.fontSize = '1.5rem';
    document.getElementById('not-signed-in').style.visibility = 'hidden';

}

if (localStorage.getItem('username').length) {
    document.getElementById('name').textContent = localStorage.getItem('name');
    document.getElementById('username').textContent = localStorage.getItem('username');
    document.getElementById('email').textContent = localStorage.getItem('email');

}

if (localStorage.getItem('username').length > 0) {
    document.querySelector('ul li a[href="pages/terms&conds.html"]').style.visibility = 'hidden';
    document.querySelector('ul li a[href="pages/signup.html"]').innerHTML = `
        <li>
            <a href="pages/terms&conds.html" target="_blank">
                Terms and Conditions
            </a>
        </li>
    `;

    document.querySelector('#signup-link').style.display = 'none';
}

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    closeNavPhones.addEventListener('click', () => {
        navBarPhones.style.transform = 'translateX(-100%)';

        setTimeout(() => {
            navBarPhones.style.zIndex = '-100';

        }, 500)
    });

    openNavPhones.addEventListener('click', () => {
        navBarPhones.style.transform = 'translateX(3%)';
        navBarPhones.style.position = 'fixed';
    
        setTimeout(() => {
            navBarPhones.style.zIndex = '100';
    
        }, 100)
    });

}


document.addEventListener('DOMContentLoaded', function() {
    let NavCloseButton = document.querySelector(".profile-close")

    NavCloseButton.addEventListener('click', function() {
        this.parentElement.className = "profile";
    });
});

function profileClose() {
    document.getElementById("open-profile__button").style.visibility = "visible";
}

function openProfile() {
    var profile = document.querySelector(".profile");
    profile.className = "profile profile--open";
}

