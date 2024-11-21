document.addEventListener("DOMContentLoaded", () => {
    const modals = document.querySelectorAll('.modal');
    const loginLink = document.getElementById("login-link");
    const registerLink = document.getElementById("register-link");
    const userInfo = document.getElementById("user-info");
    const closeBtns = document.querySelectorAll('.close');

    // Funciones para manejar modales
    function openModal(modalId) {
        document.getElementById(modalId).style.display = "block";
    }

    function closeModal(modal) {
        modal.style.display = "none";
    }

    // Event listeners para abrir modales
    loginLink.addEventListener("click", (e) => {
        e.preventDefault();
        openModal("login-modal");
    });

    registerLink.addEventListener("click", (e) => {
        e.preventDefault();
        openModal("register-modal");
    });

    // Event listeners para cerrar modales
    closeBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            closeModal(btn.closest('.modal'));
        });
    });

    window.addEventListener("click", (e) => {
        modals.forEach(modal => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Manejo de formularios
    const registerForm = document.getElementById("register-form");
    const loginForm = document.getElementById("login-form");

    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const user = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            gender: document.getElementById("gender").value,
        };
        localStorage.setItem(user.email, JSON.stringify(user));
        alert("Registro exitoso!");
        closeModal(document.getElementById("register-modal"));
        openModal("login-modal");
    });

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;
        const storedUser = JSON.parse(localStorage.getItem(email));

        if (storedUser && storedUser.password === password) {
            sessionStorage.setItem("loggedInUser", storedUser.firstName);
            closeModal(document.getElementById("login-modal"));
            updateUserInterface();
        } else {
            alert("Correo o contraseña incorrectos.");
        }
    });

    // Función para actualizar la interfaz de usuario
    function updateUserInterface() {
        const loggedInUser = sessionStorage.getItem("loggedInUser");
        if (loggedInUser) {
            userInfo.innerHTML = `
                Bienvenido, ${loggedInUser} 
                <a href="#" id="logout-link">(Cerrar Sesión)</a>
            `;
            loginLink.style.display = "none";
            registerLink.style.display = "none";
            
            document.getElementById("logout-link").addEventListener("click", (e) => {
                e.preventDefault();
                sessionStorage.removeItem("loggedInUser");
                window.location.reload();
            });
        }
    }

    // Verificar estado de inicio de sesión al cargar la página
    updateUserInterface();
});