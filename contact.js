// Formulaire de contact via EmailJS, avec messages affichés dans la page.
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  const status = form.querySelector('.form-status');
  const button = form.querySelector('button[type="submit"]');
  const buttonLabel = button.textContent;

  if (window.emailjs) emailjs.init({ publicKey: 'peRslZGzwUqzU_CmQ' });

  const showStatus = (text, type) => {
    status.textContent = text;
    status.className = `form-status ${type ? `is-${type}` : ''}`;
  };

  const validate = () => {
    let firstInvalid = null;
    form.querySelectorAll('input, textarea').forEach((field) => {
      const ok = field.checkValidity() && field.value.trim() !== '';
      field.setAttribute('aria-invalid', String(!ok));
      if (!ok && !firstInvalid) firstInvalid = field;
    });
    return firstInvalid;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const invalid = validate();
    if (invalid) {
      showStatus(invalid.type === 'email' && invalid.value
        ? 'Adresse email invalide. Vérifiez le format, par exemple nom@domaine.fr.'
        : 'Remplissez les trois champs pour envoyer votre message.', 'error');
      invalid.focus();
      return;
    }

    if (!window.emailjs) {
      showStatus('Le service d\'envoi ne répond pas. Contactez-moi sur LinkedIn en attendant.', 'error');
      return;
    }

    button.disabled = true;
    button.textContent = 'Envoi en cours…';
    showStatus('', null);

    try {
      await emailjs.sendForm('service_prvoiro', 'template_0vbbsm7', form);
      form.reset();
      form.querySelectorAll('[aria-invalid]').forEach((f) => f.removeAttribute('aria-invalid'));
      showStatus('Message envoyé. Je vous réponds rapidement.', 'success');
    } catch (err) {
      console.error(err);
      showStatus('Le message n\'est pas parti. Réessayez ou contactez-moi sur LinkedIn.', 'error');
    } finally {
      button.disabled = false;
      button.textContent = buttonLabel;
    }
  });

  form.querySelectorAll('input, textarea').forEach((field) => {
    field.addEventListener('input', () => field.removeAttribute('aria-invalid'));
  });
});
