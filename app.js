const websiteNameElement = document.getElementById('website');
const usernameElement = document.getElementById('username');
const passwordElement = document.getElementById('password');
const generatePasswordBtnElement = document.getElementById('generate-password');
const showHideBtnElement = document.getElementById('show-hide');
const saveBtnElement = document.querySelector('#save button');
const showDataBtnElement = document.getElementById('show-data');
const dataDisplayElement = document.getElementById('data-display')
const footerElement = document.getElementById('footer');


function generatePasswordFunction(event) {
    event.preventDefault();
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567890!@#$%^&*()_-+=[]{}\|";:,<>./?';
    const passwordLength = 12;
    let password = "";
    for (let i = 0; i < passwordLength; i++) {
        let randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }
    passwordElement.value = password;
    // passwordElement.type = 'text';
}
generatePasswordBtnElement.addEventListener('click', generatePasswordFunction);
function showHideFunction(event) {
    event.preventDefault();
    if (passwordElement.type === 'password') {
        passwordElement.type = 'text';
    } 
    else {
        passwordElement.type = 'password';
    }
}
showHideBtnElement.addEventListener('click', showHideFunction);

function getValuesFunction() {
    let enteredWebsiteName = websiteNameElement.value.trim();
    let enteredUsername = usernameElement.value.trim();
    let enteredPassword = passwordElement.value.trim();

    if (!enteredWebsiteName || !enteredUsername || !enteredPassword) {
        alert('Please fill all the fields!');
        return;
    }

    const passwordEntry = {
        website: enteredWebsiteName,
        username: enteredUsername,
        password: enteredPassword
    };

    let savedPasswords = localStorage.getItem('passwords');
    

    let passwordList = savedPasswords ? JSON.parse(savedPasswords) : [];

    passwordList.push(passwordEntry)

    localStorage.setItem("passwords", JSON.stringify(passwordList));

    websiteNameElement.value = '';
    usernameElement.value = '';
    passwordElement.value = '';

    alert('Password saved Successfully');
}
saveBtnElement.addEventListener('click', getValuesFunction);


function showDataFunction() {
    footerElement.style.display = 'block';
    const savedPasswords = localStorage.getItem('passwords');
    const passwordsList = savedPasswords ? JSON.parse(savedPasswords) : [];

    dataDisplayElement.innerHTML = '';

    if (passwordsList.length === 0) {
        alert("There is not data to show");
        footerElement.style.display = 'none';
        return;
    }

    for (let i = 0; i < passwordsList.length; i++){
        const entry = passwordsList[i];
        const entryDiv = document.createElement('div');
        entryDiv.classList.add('entry');
        entryDiv.textContent = `🔐 ${i + 1}) Website: ${entry.website} | Username: ${entry.username} | Password: ${entry.password}`;        

        let deleteEntryBtnElement = document.createElement('button');
        deleteEntryBtnElement.textContent = 'Delete';

        let indexCopy = i;
        deleteEntryBtnElement.classList.add('delete-button')
        function deleteEntryFunction() {

            localStorage.setItem("passwords", JSON.stringify(passwordsList));
            showDataFunction();
        }
        
        deleteEntryBtnElement.addEventListener('click', deleteEntryFunction);
        entryDiv.appendChild(deleteEntryBtnElement);
        dataDisplayElement.appendChild(entryDiv);
    };
}
showDataBtnElement.addEventListener('click', showDataFunction);
