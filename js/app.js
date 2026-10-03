"use strict";

/*
 * Pure validation function for the student number.
 * Required format: 24-1234-123
 */
function isValidStudentNumber(value) {
    return /^\d{2}-\d{4}-\d{3}$/.test(value.trim());
}

/*
 * Pure validation function for the password.
 * Requirements:
 * - At least 8 characters
 * - At least one uppercase letter
 * - At least one digit
 * - At least one of @, $, !
 * - No whitespace
 */
function isValidPassword(value) {
    return (
        value.length >= 8 &&
        /[A-Z]/.test(value) &&
        /\d/.test(value) &&
        /[@$!]/.test(value) &&
        !/\s/.test(value)
    );
}

/*
 * Export the pure functions when running in Node/CommonJS.
 * This keeps the file compatible with the autograder.
 */
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        isValidStudentNumber,
        isValidPassword
    };
}

/*
 * Browser-only form behavior.
 */
if (typeof document !== "undefined") {
    const form = document.getElementById("registrationForm");

    if (form) {
        const fullName = document.getElementById("fullName");
        const studentNumber = document.getElementById("studentNumber");
        const email = document.getElementById("email");
        const mobileNumber = document.getElementById("mobileNumber");
        const password = document.getElementById("password");
        const confirmPassword = document.getElementById("confirmPassword");
        const course = document.getElementById("course");
        const terms = document.getElementById("terms");

        const successMessage = document.getElementById("successMessage");
        const registrationSummary =
            document.getElementById("registrationSummary");

        const fields = {
            fullName: {
                input: fullName,
                error: document.getElementById("fullNameError")
            },
            studentNumber: {
                input: studentNumber,
                error: document.getElementById("studentNumberError")
            },
            email: {
                input: email,
                error: document.getElementById("emailError")
            },
            mobileNumber: {
                input: mobileNumber,
                error: document.getElementById("mobileNumberError")
            },
            password: {
                input: password,
                error: document.getElementById("passwordError")
            },
            confirmPassword: {
                input: confirmPassword,
                error: document.getElementById("confirmPasswordError")
            },
            course: {
                input: course,
                error: document.getElementById("courseError")
            },
            terms: {
                input: terms,
                error: document.getElementById("termsError")
            }
        };

        const passwordFeedback =
            document.getElementById("passwordFeedback");

        function setError(fieldName, message) {
            const field = fields[fieldName];

            field.error.textContent = message;
            field.input.setAttribute(
                "aria-invalid",
                message ? "true" : "false"
            );
        }

        function clearError(fieldName) {
            setError(fieldName, "");
        }

        function validateFullName() {
            const value = fullName.value.trim();

            if (value.length === 0) {
                setError("fullName", "Full name is required.");
                return false;
            }

            if (value.length < 2) {
                setError(
                    "fullName",
                    "Full name must contain at least two characters."
                );
                return false;
            }

            clearError("fullName");
            return true;
        }

        function validateStudentNumber() {
            const value = studentNumber.value.trim();

            if (value.length === 0) {
                setError("studentNumber", "Student number is required.");
                return false;
            }

            if (!isValidStudentNumber(value)) {
                setError(
                    "studentNumber",
                    "Enter a student number in the format 24-1234-123."
                );
                return false;
            }

            clearError("studentNumber");
            return true;
        }

        function validateEmail() {
            const value = email.value.trim();

            if (value.length === 0) {
                setError("email", "Email address is required.");
                return false;
            }

            /*
             * Simplified email rule:
             * text before @
             * domain containing a dot
             * text after the dot
             * no whitespace
             */
            const emailPattern = /^[^\s@]+@[^\s@.]+\.[^\s@]+$/;

            if (!emailPattern.test(value)) {
                setError(
                    "email",
                    "Enter a valid email address such as student@example.com."
                );
                return false;
            }

            clearError("email");
            return true;
        }

        function validateMobileNumber() {
            const value = mobileNumber.value.trim();

            if (value.length === 0) {
                setError("mobileNumber", "Mobile number is required.");
                return false;
            }

            const mobilePattern = /^(09\d{9}|\+639\d{9})$/;

            if (!mobilePattern.test(value)) {
                setError(
                    "mobileNumber",
                    "Enter a mobile number starting with 09 followed by 9 digits or +639 followed by 9 digits."
                );
                return false;
            }

            clearError("mobileNumber");
            return true;
        }

        function validatePassword() {
            const value = password.value;

            if (value.length === 0) {
                setError("password", "Password is required.");
                return false;
            }

            if (!isValidPassword(value)) {
                setError(
                    "password",
                    "Password must be at least 8 characters, contain one uppercase letter, one digit, one of @, $, or !, and no spaces."
                );
                return false;
            }

            clearError("password");
            return true;
        }

        function updatePasswordFeedback() {
            const value = password.value;

            if (value.length === 0) {
                passwordFeedback.textContent = "";
                passwordFeedback.className = "feedback";
                return;
            }

            if (isValidPassword(value)) {
                passwordFeedback.textContent =
                    "Password meets all requirements.";
                passwordFeedback.className = "feedback valid";
            } else {
                passwordFeedback.textContent =
                    "Password must have at least 8 characters, one uppercase letter, one digit, one of @, $, or !, and no spaces.";
                passwordFeedback.className = "feedback invalid";
            }
        }

        function validateConfirmPassword() {
            const value = confirmPassword.value;

            if (value.length === 0) {
                setError(
                    "confirmPassword",
                    "Please confirm your password."
                );
                return false;
            }

            if (value !== password.value) {
                setError(
                    "confirmPassword",
                    "Passwords do not match."
                );
                return false;
            }

            clearError("confirmPassword");
            return true;
        }

        function validateCourse() {
            if (course.value !== "BSIT" && course.value !== "BSCS") {
                setError(
                    "course",
                    "Please select BSIT or BSCS."
                );
                return false;
            }

            clearError("course");
            return true;
        }

        function validateTerms() {
            if (!terms.checked) {
                setError(
                    "terms",
                    "You must agree to the terms and conditions."
                );
                return false;
            }

            clearError("terms");
            return true;
        }

        function clearSummary() {
            document.getElementById("summaryName").textContent = "";
            document.getElementById("summaryStudentNumber").textContent = "";
            document.getElementById("summaryEmail").textContent = "";
            document.getElementById("summaryMobileNumber").textContent = "";
            document.getElementById("summaryCourse").textContent = "";

            registrationSummary.hidden = true;
            successMessage.textContent = "";
            successMessage.hidden = true;
        }

        function displaySummary() {
            /*
             * textContent is intentionally used here instead of innerHTML
             * so user-entered values are safely displayed.
             */
            document.getElementById("summaryName").textContent =
                fullName.value.trim();

            document.getElementById("summaryStudentNumber").textContent =
                studentNumber.value.trim();

            document.getElementById("summaryEmail").textContent =
                email.value.trim();

            document.getElementById("summaryMobileNumber").textContent =
                mobileNumber.value.trim();

            document.getElementById("summaryCourse").textContent =
                course.value;

            successMessage.textContent =
                "Registration details validated successfully!";

            successMessage.hidden = false;
            registrationSummary.hidden = false;
        }

        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const validFullName = validateFullName();
            const validStudentNumber = validateStudentNumber();
            const validEmail = validateEmail();
            const validMobileNumber = validateMobileNumber();
            const validPassword = validatePassword();
            const validConfirmPassword = validateConfirmPassword();
            const validCourse = validateCourse();
            const validTerms = validateTerms();

            if (
                validFullName &&
                validStudentNumber &&
                validEmail &&
                validMobileNumber &&
                validPassword &&
                validConfirmPassword &&
                validCourse &&
                validTerms
            ) {
                displaySummary();
            } else {
                successMessage.textContent = "";
                successMessage.hidden = true;
                registrationSummary.hidden = true;
            }
        });

        password.addEventListener("input", function () {
            updatePasswordFeedback();
        });

        fullName.addEventListener("blur", function () {
            validateFullName();
        });

        course.addEventListener("change", function () {
            validateCourse();
        });

        terms.addEventListener("change", function () {
            validateTerms();
        });

        form.addEventListener("reset", function () {
            /*
             * The reset event occurs before the browser has completed its
             * native reset, so clear feedback/output directly.
             */
            Object.keys(fields).forEach(function (fieldName) {
                clearError(fieldName);
            });

            passwordFeedback.textContent = "";
            passwordFeedback.className = "feedback";

            successMessage.textContent = "";
            successMessage.hidden = true;

            registrationSummary.hidden = true;

            document.getElementById("summaryName").textContent = "";
            document.getElementById("summaryStudentNumber").textContent = "";
            document.getElementById("summaryEmail").textContent = "";
            document.getElementById("summaryMobileNumber").textContent = "";
            document.getElementById("summaryCourse").textContent = "";

            Object.keys(fields).forEach(function (fieldName) {
                fields[fieldName].input.setAttribute(
                    "aria-invalid",
                    "false"
                );
            });
        });
    }
}
