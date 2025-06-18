document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');
    const successMessage = document.getElementById('successMessage');
    const backButton = document.getElementById('backButton');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Simulação de envio para o servidor
            setTimeout(() => {
                form.style.display = 'none';
                successMessage.style.display = 'flex';
            }, 500);
        }
    });
    
    backButton.addEventListener('click', function() {
        successMessage.style.display = 'none';
        form.style.display = 'block';
        form.reset();
        clearErrors();
    });
    
    function validateForm() {
        let isValid = true;
        clearErrors();
        
        // Validação do nome
        const name = document.getElementById('name').value.trim();
        if (name === '') {
            showError('name-error', 'Por favor, digite seu nome');
            isValid = false;
        } else if (name.length < 3) {
            showError('name-error', 'O nome deve ter pelo menos 3 caracteres');
            isValid = false;
        }
        
        // Validação do email
        const email = document.getElementById('email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            showError('email-error', 'Por favor, digite seu e-mail');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            showError('email-error', 'Por favor, digite um e-mail válido');
            isValid = false;
        }
        
        // Validação da senha
        const password = document.getElementById('password').value;
        if (password === '') {
            showError('password-error', 'Por favor, digite sua senha');
            isValid = false;
        } else if (password.length < 6) {
            showError('password-error', 'A senha deve ter pelo menos 6 caracteres');
            isValid = false;
        }
        
        // Validação da confirmação de senha
        const confirmPassword = document.getElementById('confirm-password').value;
        if (confirmPassword === '') {
            showError('confirm-password-error', 'Por favor, confirme sua senha');
            isValid = false;
        } else if (password !== confirmPassword) {
            showError('confirm-password-error', 'As senhas não coincidem');
            isValid = false;
        }
        
        // Validação dos termos
        const terms = document.getElementById('terms').checked;
        if (!terms) {
            showError('terms-error', 'Você deve aceitar os termos para continuar');
            isValid = false;
        }
        
        return isValid;
    }
    
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
    }
    
    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
        });
    }
});