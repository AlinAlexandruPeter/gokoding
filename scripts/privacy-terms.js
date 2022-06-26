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

if (localStorage.getItem('username').value) {
    document.getElementById('name').textContent = localStorage.getItem('name');
    document.getElementById('username').textContent = localStorage.getItem('username');
    document.getElementById('email').textContent = localStorage.getItem('email');

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