/*-----------Contact form code */

function sendMail(contactForm) {

    emailjs.send("circeco_web", "circeco", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "from_message": contactForm.message.value
    })
        .then(
            function (response) {
                console.log("SUCCESS", response.status, response.text);
                contactForm.reset(); // To clear the form after sending message 

            },
            function (error) {
                console.log("FAILED", error);
            }
        );

    return false;  // To block from loading a new page
}


// Button of the contact form code 

function buttonCircle() {
    $("#send_button").click(function () {
        $("#send_button").addClass("onclic", 250, validate);
    });

    function validate() {
        setTimeout(function () {
            $("#send_button").removeClass("onclic");
            $("#send_button").addClass("validate", 450, callback);
        }, 2250);
    }
    function callback() {
        setTimeout(function () {
            $("#send_button").removeClass("validate");
        }, 1250);

    }
}

buttonCircle();



