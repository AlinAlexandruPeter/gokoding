const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const username = document.getElementById('username');

const usernameSignIn = document.querySelector('#username-in');
const passwordSignIn = document.getElementById('password-in');

const email = document.getElementById('email');
const password = document.getElementById('password');
const gender = document.getElementById('gender');

// Forms
const names = document.getElementById('names');
const credentials = document.getElementById('credentials');
const signInForm = document.getElementById('signin');

const signInLink1 = document.getElementById('signin1');
const signInLink2 = document.getElementById('signin2');
const signUpLink = document.getElementById('signup');

const next = document.getElementById('next');
const submit = document.getElementById('signup-btn');

const signIn = document.getElementById('signin-btn');

const submitError = document.querySelector('#submit-err');
const singinError = document.querySelector('#signin-err');
const nextError = document.querySelector('#next-err')

const back = document.getElementById('back');

const progress = document.getElementById('progress');

const url = "https://62adacb2402135c7acc4d0ab.mockapi.io/api/users/";

let steps = [
    document.getElementById('step1'),
    document.getElementById('step2'),
]


if (localStorage.getItem('username').length > 0) {
    window.location.replace("../index.html")

}


let allUsers;

// Functions

let insertUser = (username, name, email, password, gender, users) => {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.setRequestHeader("Content-Type", "application/json");

    var data = ` {
        "username": "${username}",
        "name": "${name}",
        "email": "${email}",
        "password": "${password}",
        "gender": "${gender.toUpperCase()}",
        "days": [
            0,
            0,
            0,
            0,
            0,
            0,
            0
        ],
        "user_id": "${users.length + 1}"
    }`;

    localStorage.setItem("username", username);
    localStorage.setItem("name", name);
    localStorage.setItem("gender", gender.toUpperCase());
    localStorage.setItem("email", email);
    localStorage.setItem("userId", users.length + 1);

    xhr.send(data);

}

let getUsers = async url => {
    const response = await fetch(url)
    const users = await response.json();

    allUsers = users;
}
getUsers(url)


let checkUsername = username => {
    for (let user of allUsers) {
        if (user.username === username) {
            nextError.textContent = 'Username not available';
            nextError.style.visibility = 'visible';

            setTimeout(() => {
                nextError.style.visibility = 'hidden';
            }, 3000);

            return true;
        }
    }

    return false;
}

let checkEmail = email => {
    for (let user of allUsers) {
        if (user.email === email) {
            submitError.textContent = 'Email is already registered';
            submitError.style.visibility = 'visible';

            setTimeout(() => {
                submitError.style.visibility = 'hidden';
            }, 3000);

            return true;
        }
    }

    return false;
}


signUpLink.addEventListener('click', () => {
    
    signInForm.style.left = '-450px';
    names.style.left = '40px';
    progress.style.width = '180px';
    steps[0].innerHTML = '<i class="fa-solid fa-1"></i>';
    steps[0].style.color = 'white';
    steps[1].innerHTML = '<i class="fa-solid fa-2"></i>';
    steps[1].style.color = 'white';
    
    names.reset();
    credentials.reset();
    document.getElementById('steps').style.opacity = '1';
    document.getElementById("swe-image").style.transform = 'translateX(100px) translateY(-20px)';
    document.getElementById("coding-image").style.transform = 'translateX(100px) translateY(-700px)';
    
    document.title = 'Sign Up';
});


// sign in links block
{
    signInLink1.addEventListener('click', () => {
        
        names.style.left = '-450px';
        signInForm.style.left = '40px';
        document.getElementById('steps').style.opacity = '0';
        document.getElementById("coding-image").style.transform = 'translateX(100px) translateY(0)';
        document.getElementById("swe-image").style.transform = 'translateX(100px) translateY(700px)';
        
        document.title = 'Sign In';
    });

    signInLink2.addEventListener('click', () => {
        
        credentials.style.left = '-450px';
        signInForm.style.left = '40px';
        document.getElementById('steps').style.opacity = '0';
        document.getElementById("coding-image").style.transform = 'translateX(100px) translateY(0)';
        document.getElementById("swe-image").style.transform = 'translateX(100px) translateY(700px)';
        
        document.title = 'Sign In';
    });
}

signIn.addEventListener("click", () => {

    if(!usernameSignIn.value || !passwordSignIn.value) {

        singinError.textContent = 'Please fill the empty fields';
        singinError.style.visibility = 'visible';

        setInterval(() => {
            singinError.style.visibility = 'hidden';
        }, 3000);

        return;
    }

    for (let user of allUsers) {
        if([user.username, user.email].includes(usernameSignIn.value) && user.password === passwordSignIn.value) {
            localStorage.setItem("username", user.username);
            localStorage.setItem("name", user.name);
            localStorage.setItem("gender", user.gender);
            localStorage.setItem("email", user.email);
            localStorage.setItem("userId", user.user_id);

            singinError.textContent = `You're being redirected...`;
            singinError.style.color = `#7063d1`;
            singinError.style.visibility = 'visible';

            setTimeout(() => {
                singinError.style.visibility = 'hidden';
            }, 2000);

            setTimeout(() => {
                window.location.replace("../index.html");

            }, 2000)


        } else if (user.username !== usernameSignIn.value) {
            if (usernameSignIn.value.includes('@')) {

                singinError.textContent = 'Email is not registered';
                singinError.style.visibility = 'visible';
    
                setTimeout(() => {
                    singinError.style.visibility = 'hidden';
                }, 3000);
    
                return;
            }


        } else if (user.email !== usernameSignIn.value) {
            singinError.textContent = 'Email is not registered';
            singinError.style.visibility = 'visible';

            setTimeout(() => {
                singinError.style.visibility = 'hidden';
            }, 3000);

            return;
        }
    }
    return true;
});

document.getElementById('show-hide').addEventListener('click', () => {

    if (document.getElementById('password').type === 'password') {
        document.getElementById('password').type = 'text';
        document.querySelector('.pass-wrapper #show-hide').innerHTML = '<i class="bi bi-eye-slash"></i>'
    } else {
        document.getElementById('password').type = 'password';
        document.querySelector('.pass-wrapper #show-hide').innerHTML = '<i class="bi bi-eye"></i>'
    }
})

document.getElementById('show-hide-in').addEventListener('click', () => {

    if (document.getElementById('password-in').type === 'password') {
        document.getElementById('password-in').type = 'text';
        document.querySelector('.pass-wrapper #show-hide-in').innerHTML = '<i class="bi bi-eye-slash"></i>'
    } else {
        document.getElementById('password-in').type = 'password';
        document.querySelector('.pass-wrapper #show-hide-in').innerHTML = '<i class="bi bi-eye"></i>'
    }
})

next.addEventListener('click', (button) => {
    
    if (username.value.includes('@') || username.value.includes(' ')) {
        nextError.textContent = 'Username cannot contain "@" or spaces';
        nextError.style.visibility = 'visible';

        setInterval(() => {
            nextError.style.visibility = 'hidden'
        }, 3000);

        return;
    }

    if(!firstName.value || !lastName.value || !username.value) {

        nextError.textContent = 'Please fill the empty fields';
        nextError.style.visibility = 'visible';

        setInterval(() => {
            nextError.style.visibility = 'hidden'
        }, 3000);

        return;

    } else {
        if (username.value.length < 6) {

            nextError.textContent = 'Username has to be at least 6 characters long';
            nextError.style.visibility = 'visible';

            setTimeout(() => {
                nextError.style.visibility = 'hidden'
            }, 3000);

            return;
        }
    }

    if(checkUsername(username.value)) {
        return;
    }

    names.style.left = '-450px';
    credentials.style.left = '40px';
    progress.style.width = '180px';
    steps[0].innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    steps[0].style.color = 'rgb(6, 194, 6)';

});

submit.addEventListener('click', (button) => {
    let emailPattern = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

    if(!email.value || !gender.value || !password.value) {
        button.preventDefault();

        submitError.textContent = 'Please fill the empty fields';
        submitError.style.visibility = 'visible';

        setTimeout(() => {
        submitError.style.visibility = 'hidden';
        }, 3000);

        return;
    
    } else if (!['M', 'F', 'O', 'm', 'f', 'o'].includes(gender.value)) {
        button.preventDefault();

        submitError.textContent = 'Please fill the Gender field as properly';
        submitError.style.visibility = 'visible';

        setTimeout(() => {
        submitError.style.visibility = 'hidden';
        }, 3000);

        return;

    } else if (!email.value.match(emailPattern)) {
        button.preventDefault();

        submitError.textContent = 'Email not valid';
        submitError.style.visibility = 'visible';

        setTimeout(() => {
        submitError.style.visibility = 'hidden';
        }, 3000);

        return;

    } else if (password.value.length < 8) {
        button.preventDefault();

        submitError.textContent = 'Password must be at least 8 characters long';
        submitError.style.visibility = 'visible';

        setTimeout(() => {
        submitError.style.visibility = 'hidden';
        }, 3000);

        return;

    }

    if (checkEmail(email.value)) {
        return;
    }

    insertUser(username.value, firstName.value + " " + lastName.value, email.value, password.value, gender.value, allUsers)
    
    submitError.style.color = '#7063d1';
    submitError.textContent = 'You\'re being redirected...';
    submitError.style.visibility = 'visible';

    setTimeout(() => {
        window.location.replace('../index.html')
    }, 3000)
});


back.addEventListener('click', () => {
    names.style.left = '40px';
    credentials.style.left = '450px';
    progress.style.width = '180px';
    steps[0].innerHTML = '<i class="fa-solid fa-1"></i>';
    steps[0].style.color = 'white';
});