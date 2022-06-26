const timerEl = document.querySelector('.main-container .timer');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const finishedButton = document.getElementById('finished');

const closeButton = document.getElementById('close-before');
const closeCongrats = document.getElementById('close-congrats');
const doneButton = document.getElementById('done');

const url = "https://62adacb2402135c7acc4d0ab.mockapi.io/api/users/";

let beforeHours = document.querySelector('.input-wrapper input:first-of-type');
let beforeMins = document.querySelector('.input-wrapper input:last-of-type');

let timeSet = false;

let seconds = 0;
let interval = null;

let hours, minutes, second;



if (localStorage.getItem('username').length > 0) {
    document.querySelector('ul li a[href="terms&conds.html"]').style.visibility = 'hidden';
    document.querySelector('ul li a[href="signup.html"]').innerHTML = `
        <li>
            <a href="terms&conds.html" target="_blank">
                Terms and Conditions
            </a>
        </li>
    `;

    
}

if(localStorage.getItem('gender') === "M") {
    document.getElementById('profile-img').src = '../images/profile-card-pic-male.jpg';

} else if(localStorage.getItem('gender') === "F") {
    document.getElementById('profile-img').src = '../images/profile-card-pic-female.jpg';

} else {
    document.getElementById('profile-img').src = '../images/profile-card-pic-other.jpg';
}

document.getElementById('name').textContent = localStorage.getItem('name');
document.getElementById('username').textContent = localStorage.getItem('username');
document.getElementById('email').textContent = localStorage.getItem('email');

//Functions

// Fecthing the user data
let user;

const userId = localStorage.getItem('userId');
let getUser = async id => {

    const response = await fetch(`${url}${id}`)
    const userInfo = await response.json();

    user = userInfo;

}
getUser(userId)


const overwriteUserDays = (days, newValue) => {
    for (let i = days.length - 1; i > 0; i--) {
        days[i] = days[i - 1];
    }

    days[0] = newValue;

    return days;
}


let updateUserInfo = (userId, days) => {

    console.log(days);
    
    let day1 = days[0], day2 = days[1], day3 = days[2], day4 = days[3], day5 = days[4], day6 = days[5], day7 = days[6];



    var xhr = new XMLHttpRequest();
    xhr.open("PUT", url + userId);
    
    xhr.setRequestHeader("Content-Type", "application/json");
    
    var data = `{
        "days": [
            "${day1}",
            "${day2}",
            "${day3}",
            "${day4}",
            "${day5}",
            "${day6}",
            "${day7}"
        ]
    }`;
    
    xhr.send(data);
}

function timer() {
    
    seconds++;
    
    let hrs = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds - (hrs * 3600)) / 60);
    let secs = seconds % 60;


    if (parseFloat(beforeHours.value) === hrs && parseFloat(beforeMins.value) === mins) {
        clearInterval(interval);
        seconds = 0;
        stop();

        confetti.start();

        setTimeout(() => {
            confetti.stop();
        }, 3000)

        document.querySelector('.timer-container').style.opacity = '0';
        document.querySelector('.congrats').style.opacity = '1';
        document.querySelector('.congrats').style.zIndex = '11';
        document.querySelector('.congrats').style.transform = 'translateY(220px) scale(1.3)';

        startButton.disabled = true;
        pauseButton.disabled = true;

        if (second > 30)
            minutes++;
        if(minutes.toString().startsWith("0"))
            minutes = minutes.toString().substring(1, minutes.length)

        if(hours.toString().startsWith("0"))
            hours = hours.toString().substring(1, hours.length)
        
        let today = `${hours}:${minutes}`;


        overwriteUserDays(user.days, today)


        updateUserInfo(user.user_id, user.days);

        return;
    }

    if (hrs < 10)
        hrs = '0' + hrs;

    if (mins < 10)
        mins = '0' + mins;

    if (secs < 10)
        secs = '0' + secs;

    hours = hrs;
    minutes = mins;
    second = secs;

    timerEl.innerHTML = `${hrs}:${mins}:${secs}`;

}


//Event listeners
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.timer-container').style.width = '175%';
})

closeButton.addEventListener('click', () => {
    document.querySelector('.before').style.transform = 'translateY(-1200px)';
    timeSet = false
});

doneButton.addEventListener('click', () => {
    if(!parseFloat(beforeMins.value)) {
        alert('Please select a minimum value for the minutes')
        return;
    }

    document.querySelector('.before').style.transform = 'translateY(-1200px)';
    document.querySelector('.timer-container').style.opacity = '1'

    if (interval) {
        return
    }

    interval = setInterval(timer, 1000);
})

closeCongrats.addEventListener('click', () => {


    document.querySelector('.congrats').style.opacity = '0';
    document.querySelector('.congrats').style.zIndex = '-10';

    document.querySelector('.timer-container').style.display = 'none';


    let today = `${hours}:${minutes}`;

    overwriteUserDays(user.days, today)

    updateUserInfo(user.user_id, user.days);

    setTimeout(() => {
        location.reload()
    }, 3000)

})

startButton.addEventListener('click', () => {
    if(!timeSet) {
        document.querySelector('.before').style.transform = 'translateY(-120px)';
        timeSet = true;

        document.querySelector('.timer-container').style.opacity = '0'

        return
    }

    if (interval) {
        return
    }

    interval = setInterval(timer, 1000);
});

pauseButton.addEventListener('click', function stop() {
    clearInterval(interval);
    interval = null;
});

finishedButton.addEventListener('click', () => {
    
    clearInterval(interval);
    seconds = 0;
    stop();


    if (second > 30)
        minutes++;
    if(minutes.toString().startsWith("0"))
        minutes = minutes.toString().substring(1, minutes.length)

    if(hours.toString().startsWith("0"))
        hours = hours.toString().substring(1, hours.length)
    
    let today = `${hours}:${minutes}`;


    overwriteUserDays(user.days, today)
    console.log(user.days)


    updateUserInfo(user.user_id, user.days);
})


// navigation open-close funtionality
document.addEventListener('DOMContentLoaded', function() {
    let NavCloseButton = document.querySelector(".profile-close")

    NavCloseButton.addEventListener('click', function() {
        this.parentElement.className = "profile";
    });
});

function profileClose() {
    document.getElementById("open-profile-button").style.visibility = "visible";
}

function openProfile() {
    var profile = document.querySelector(".profile");
    profile.className = "profile profile--open";
    // document.getElementById("open-profile__button").style.visibility = "hidden";
}


// chart with chart.js
const xlabels = [];
const ylabels = [];

// let 

const styleYLabel = async days => {
    for (let i = 0; i < days.length; i++) {
        if (days[i] === "undefined") {
            ylabels.push("No data");
            continue;
        }

        ylabels.push(`${days[i].split(':')[0]}h${days[i].split(':')[1]}m`);
    }
}

const percent = minutes => {
    let stringNumber = parseFloat(minutes * 100 / 60 / 100).toFixed(2);
    let percentage = parseFloat(stringNumber);

    return percentage;
}

const parseLabel = async days => {
    for (let day of days) {
        if (day === "undefined") {
            xlabels.push(0);
            continue;
        }

        let splitten = day.split(':');
        let decimal = parseFloat(splitten[0]) + parseFloat(percent(splitten[1]))

        xlabels.push(decimal)
    }

}


setTimeout(chartIt, 200)
// chartIt();
async function  chartIt() {
    
    await getUser(userId);
    let days = user.days;

    await parseLabel(days);

    await styleYLabel(days);

    const context = document.getElementById('chart').getContext('2d');
    const recordChart = new Chart(context, {
        type: 'bar',
        data: {
            labels: ylabels, //xlabels
            datasets: [{
                label: 'Coding Time',
                data: xlabels, //ylabels
                fill: true,
                backgroundColor: 'rgba(112, 99, 209, 0.4)',
                borderColor: 'rgba(112, 99, 209, 1)',
                borderWidth: 1
            }]
        },
        options: {
            animations: {
                tension: {
                    duration: 1000,
                    easing: 'linear',
                    from: 1,
                    to: 0,
                    loop: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        text: "Hey"
                    }
                }
            }
        }
    });
}