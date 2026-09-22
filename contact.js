emailjs.init("peRslZGzwUqzU_CmQ");

document.querySelector(".contact-form").addEventListener("submit", function(e) {
    e.preventDefault();

    emailjs.sendForm(
        "service_prvoiro",
        "template_0vbbsm7",
        this
    )
    .then(() => {
        alert("Message envoyé avec succès !");
        this.reset();
    })
    .catch((error) => {
        alert("Erreur lors de l'envoi");
        console.log(error);
    });
});