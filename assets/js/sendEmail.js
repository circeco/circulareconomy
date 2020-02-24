
function sendMail(contactForm) {
    emailjs.send("circeco_web", "circeco", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "from_message": contactForm.message.value
    })
    .then(
        function(response) {
            console.log("SUCCESS", response.status, response.text);
        },
        function(error) {
            console.log("FAILED", error);
        }
    );
    return false;  // To block from loading a new page
}

