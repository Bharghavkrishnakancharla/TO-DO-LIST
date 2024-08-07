const inputBox = document.querySelector(".input-box");
const listItems = document.querySelector(".list-items");

function addTask() {
    if (inputBox && inputBox.value === '') {
        alert("You must write something");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listItems.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = '\u00d7';
        li.appendChild(span);
    }
    inputBox.value = '';
    saveData();
}

listItems.addEventListener("click", function(e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
});

function saveData() {
    const items = Array.from(listItems.children);
    items.sort((a, b) => {
        if (a.classList.contains("checked") && !b.classList.contains("checked")) {
            return 1;
        } else if (!a.classList.contains("checked") && b.classList.contains("checked")) {
            return -1;
        } else {
            return 0;
        }
    });
    listItems.innerHTML = '';
    items.forEach(item => listItems.appendChild(item));
    localStorage.setItem("data", listItems.innerHTML);
}

function showTask() {
    listItems.innerHTML = localStorage.getItem("data");
}

showTask();
