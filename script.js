document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.getElementById('addUserButton');
    const userContainer = document.getElementById("userContainer");
    const messageDiv = document.getElementById("message");
    const users = [];
    let userId = 1;

    addButton.addEventListener("click", function() {
        const nameInput = document.querySelector('input[name="name"]');
        const professionInput = document.querySelector('input[name="profession"]');
        const ageInput = document.querySelector('input[name="age"]');

        const name = nameInput.value.trim();
        const profession = professionInput.value.trim();
        const age = ageInput.value.trim();

        // Clear any previous messages
        messageDiv.textContent = "";

        if (!name || !profession || !age) {
            messageDiv.textContent = "Error : Please Make sure All the fields are filled before adding in an employee !";
            messageDiv.style.color = "red";
            return;
        }

        // Create new user object
        const user = {
            id: userId++,
            name,
            profession,
            age
        };
        
        // Add user to the array
        users.push(user);

        // Clear input fields
        nameInput.value = "";
        professionInput.value = "";
        ageInput.value = "";

        // Display success message
        messageDiv.textContent = "Success : Employee Added!";
        messageDiv.style.color = "green";

        // Display users
        displayUsers();
    });

    function displayUsers() {
        userContainer.innerHTML = "";

        users.forEach(function (user) {
            const userElement = document.createElement("div");
            userElement.className = "user-entry";
            userElement.innerHTML = `
                <p>Name: ${user.name}, Profession: ${user.profession}, Age: ${user.age}</p>
                <button class="deleteButton" data-id="${user.id}">Delete User</button>
            `;

            userElement.querySelector('.deleteButton').addEventListener("click", function() {
                deleteUser(user.id);
            });

            userContainer.appendChild(userElement);
        });
    }

    function deleteUser(id) {
        const index = users.findIndex(user => user.id === id);
        if (index !== -1) {
            users.splice(index, 1);
            displayUsers();
        }
    }
});