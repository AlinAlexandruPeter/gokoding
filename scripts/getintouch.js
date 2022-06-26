function sendEmail() {
    Email.send({
        Host : "smtp.gmail.com",
        Username : "mymone085@gmail.com",
        Password : "alinpeter14",
        To : 'contact.gokoding@gmail.com',
        From : document.getElementById("email").value,
        Subject : "New Contact",
        Body : "Name: " + document.getElementById("name").value + 
                '<br> Email: ' + document.getElementById("email").value +
                document.getElementById("message").value
    }).then(
        console.log("Success")
    );
}