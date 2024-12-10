/*=============== SHOW HIDE PASSWORD FUNCTION ===============*/
const togglePasswordVisibility = (inputId, iconId) => {
   const passwordInput = document.getElementById(inputId);
   const toggleIcon = document.getElementById(iconId);
 
   toggleIcon.addEventListener("click", () => {
     // Toggle password visibility
     const isPassword = passwordInput.type === "password";
     passwordInput.type = isPassword ? "text" : "password";
 
     // Toggle icon class
     toggleIcon.classList.toggle("ri-eye-fill", isPassword);
     toggleIcon.classList.toggle("ri-eye-off-fill", !isPassword);
   });
 };
 
 // For login password
 togglePasswordVisibility("password", "loginPassword");
 
 // For create account password
 togglePasswordVisibility("passwordCreate", "loginPasswordCreate");
 