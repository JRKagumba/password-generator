const pwEl = document.getElementById("pw");
const copyEl = document.getElementById("copy");
const lenEl = document.getElementById("len");
const upperEl = document.getElementById("upper");
const lowerEl = document.getElementById("lower");
const numberEl = document.getElementById("number");
const symbolEl = document.getElementById("symbol");
const generateEl = document.getElementById("generate");
const darkModeEl = document.getElementById("dark-mode");
const exportEl = document.getElementById("export");

const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+=";

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

function generatePassword() {
    const len = lenEl.value;
    const characters = [
        ...(upperEl.checked ? upperLetters : ""),
        ...(lowerEl.checked ? lowerLetters : ""),
        ...(numberEl.checked ? numbers : ""),
        ...(symbolEl.checked ? symbols : ""),
    ];

    return Array.from({ length: len }, () => getRandom(characters)).join("");
}

generateEl.addEventListener("click", () => {
    pwEl.innerText = generatePassword();
});

copyEl.addEventListener("click", () => {
    if (!pwEl.innerText) return;

    const textarea = document.createElement("textarea");
    textarea.value = pwEl.innerText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    alert("Password copied to clipboard");
});

darkModeEl.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Add your mnemonic generation and export logic here
