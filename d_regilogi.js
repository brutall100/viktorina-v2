// JavaScript to show the modal
const forgotPasswordLink = document.querySelector('.forgot-password');
const modal = document.getElementById('forgotPasswordModal');
const closeModalButton = modal.querySelector('#close-modal');

forgotPasswordLink.addEventListener('click', function(event) {
event.preventDefault();
modal.style.display = 'block';
});

closeModalButton.addEventListener('click', function() {
modal.style.display = 'none';
});


const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
let container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});




// Add event listener to form's submit button
document.getElementById("register-form").addEventListener("submit", validateForm);

function validateForm(event) {
	event.preventDefault(); // prevent form from being submitted

	// Get input elements
	const nameInput = document.getElementById("name-input");
	const emailInput = document.getElementById("user-email");
	const passwordInput = document.getElementById("password-input");

	// Get error message elements
	const nameError = document.getElementById("name-error");
	const emailError = document.getElementById("email-error");
	const passwordError = document.getElementById("password-error");

	// Check if name input is not empty
	if (!nameInput.value) {
		nameError.textContent = "Vardas būtinas";
	} else {
		nameError.textContent = "";
	}

	// Check if email input is in the correct format
	if (!emailInput.value) {
		emailError.textContent = "Email is required";
	} else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput.value)) {
		emailError.textContent = "Neteisingas email";
	} else {
		emailError.textContent = "";
	}

	// Check if password input is not empty
	if (!passwordInput.value) {
		passwordError.textContent = "Slaptažodis būtinas";
	} else {
		passwordError.textContent = "";
	}

	// If all input fields are valid, submit form
	if (nameInput.value && emailInput.value && passwordInput.value) {
		event.target.submit();
	}
}


