const pwEl = document.getElementById("pw");
const copyEl = document.getElementById("copy");
const lenEl = document.getElementById("len");
const upperEl = document.getElementById("upper");
const lowerEl = document.getElementById("lower");
const numberEl = document.getElementById("number");
const symbolEl = document.getElementById("symbol");
const generateEl = document.getElementById("generate");

const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+=";

function getLowercase() {
    return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}

function getUppercase() {
    return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}

function getNumber() {
    return numbers[Math.floor(Math.random() * numbers.length)];
}

function getSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function generatePassword() {
    const len = lenEl.value;

    let password = "";

    if (upperEl.checked) {
        password += getUppercase();
    }

    if (lowerEl.checked) {
        password += getLowercase();
    }

    if (numberEl.checked) {
        password += getNumber();
    }

    if (symbolEl.checked) {
        password += getSymbol();
    }

    for (let i = password.length; i < len; i++) {
        const x = generateX();
        password += x;
    }

    pwEl.innerText = password;
}

function generateX() {
    const xs = [];
    if (upperEl.checked) {
        xs.push(getUppercase());
    }

    if (lowerEl.checked) {
        xs.push(getLowercase());
    }

    if (numberEl.checked) {
        xs.push(getNumber());
    }

    if (symbolEl.checked) {
        xs.push(getSymbol());
    }

    if (xs.length === 0) return "";

    return xs[Math.floor(Math.random() * xs.length)];
}

generateEl.addEventListener("click", generatePassword);

copyEl.addEventListener("click", () => {
    const textarea = document.createElement("textarea");
    const password = pwEl.innerText;

    if (!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    alert("Password copied to clipboard");
});


generateEl.addEventListener("click", () => {
    let text = pwEl.innerText;
    var array = text.split("");
    var mnemonic = "";
    
    var dict = {
        "a":"about","b":"board","c":"chest","d":"dwarf","e":"earth","f":"field","g":"globe",
        "h":"heart","i":"image","j":"jokey","k":"khaki","l":"laser","m":"metal","n":"nacho",
        "o":"oasis","p":"panel","q":"quail","r":"radio","s":"salad","t":"table","u":"ulcer",
        "v":"vegan","w":"wharf","x":"xalam","y":"yacht","z":"zebra",

        "A":"ANKARA","B":"BOGOTA","C":"CALLAO","D":"DOUALA","E":"ELPASO","F":"FOSHAN","G":"GDANSK",
        "H":"HAVANA","I":"IBADAN","J":"JEDDAH","K":"KANPUR","L":"LONDON","M":"MUMBAI","N":"NAGPUR",
        "O":"ODESSA","P":"PUEBLA","Q":"QUEENS","R":"RIYADH","S":"SYDNEY","T":"TAIPEI","U":"UJPEST",
        "V":"VIENNA","W":"WARSAW","X":"XIAMEN","Y":"YANGON","Z":"ZURICH",

    };

    const keys = Object.keys(dict);



    for (index = 0; index < array.length; index++) {
        
        if (index % 5 ==0) {
            mnemonic += "\n"
        }

        if (keys.includes(array[index])) {
            mnemonic += dict[array[index]] + '  ';
        }else {
            mnemonic += array[index].bold() + '  ';
        }

    }

    // console.log(mnemonic);
    document.getElementById("mnemonic").innerHTML = mnemonic; 

});