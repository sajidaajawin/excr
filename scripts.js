//  تحميل المستخدمين عند فتح الصفحة
document.addEventListener("DOMContentLoaded", loadUsers);

let users = JSON.parse(localStorage.getItem("users")) || [];

//  إضافة مستخدم جديد
function addUser() {
    let nameInput = document.getElementById("nameInput");
    let name = nameInput.value.trim();

    if (name === "") {
        alert(" please add user name!");
        return;
    }

    let newUser = { id: users.length + 1, name: name };
    users.push(newUser);
    saveAndRender();
    nameInput.value = "";
}

//  تحديث المستخدم
function editUser(id) {
    let newName = prompt("✏️ Add new name:");

    if (newName && newName.trim() !== "") {
        users = users.map(user => user.id === id ? { ...user, name: newName } : user);
        saveAndRender();
    }
}

//  حذف المستخدم
function deleteUser(id) {
    users = users.filter(user => user.id !== id);
    saveAndRender();
}

//   حفظ البيانات وعرضها
function saveAndRender() {
    localStorage.setItem("users", JSON.stringify(users));
    loadUsers();
}

//  تحميل وعرض المستخدمين
function loadUsers() {
    let userTable = document.getElementById("userTable");
    userTable.innerHTML = "";

    users.forEach(user => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>
                <button onclick="editUser(${user.id})">Edit ✏️</button>
                <button onclick="deleteUser(${user.id})">Delete 🗑️</button>
            </td>
        `;
        userTable.appendChild(row);
    });
}
