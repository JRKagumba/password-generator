import { mnemonicThemes } from './mnemonicThemes.js';

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
const themeEl = document.getElementById("theme");
const mnemonicEl = document.getElementById("mnemonic");

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
    const password = generatePassword();
    const theme = themeEl.value;
    pwEl.innerText = password;
    mnemonicEl.innerText = generateMnemonic(password, theme);
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

function generateMnemonic(password, theme) {
    const mapping = mnemonicThemes[theme];
    return password
        .split("")
        .map((char) => mapping[char.toUpperCase()] || char)
        .join(" ");
}

function exportPasswords(passwords, format = "txt") {
    const data = {
        txt: () => passwords.join("\n"),
        json: () => JSON.stringify(passwords, null, 2),
        csv: () => "password\n" + passwords.map((p) => `"${p}"`).join("\n"),
    }[format]();

    const blob = new Blob([data], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `passwords.${format}`;
    link.click();
    URL.revokeObjectURL(url);
}

exportEl.addEventListener("click", () => {
    if (!pwEl.innerText) return;

    const passwords = [pwEl.innerText]; // Add other passwords if needed
    const format = "txt"; // Change to "json" or "csv" for other formats
    exportPasswords(passwords, format);
});
