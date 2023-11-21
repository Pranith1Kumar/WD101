const userTable = document.getElementById('user-table'); // Retrieve the user table element

// Retrieve existing user data from local storage
let existingUsers = JSON.parse(localStorage.getItem('users')) || [];

// Display existing user data in the table
for (const user of existingUsers) {
  const { name, email, password, dob, terms } = user;
  const row = userTable.insertRow(); // Create a new table row
  row.insertCell().textContent = name; // Insert user name into a cell
  row.insertCell().textContent = email; // Insert user email into a cell
  row.insertCell().textContent = password; // Insert user password into a cell
  row.insertCell().textContent = dob; // Insert user date of birth into a cell
  row.insertCell().textContent = terms ? 'true' : 'false'; // Insert user terms acceptance status into a cell
}

// Handle form submit event
const registrationForm = document.getElementById('registration_form');
registrationForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission

  // Collect form data
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const dob = document.getElementById('dob').value;
  const terms = document.getElementById('terms').checked;

  // Validate date of birth
  const userDateOfBirth = new Date(dob);
  const currentDate = new Date();
  const minimumAgeDate = new Date(currentDate.getFullYear() - 55, currentDate.getMonth(), currentDate.getDate());
  const maximumAgeDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());

  if (userDateOfBirth < minimumAgeDate || userDateOfBirth > maximumAgeDate) {
    alert('You must be between 18 and 55 years old to register.');
    return; // Abort registration process if age is invalid
  }

  // Add user to table and save data to local storage
  const newUser = { name, email, password, dob, terms };
  existingUsers.push(newUser); // Add the new user object to the existing users array
  localStorage.setItem('users', JSON.stringify(existingUsers)); // Update local storage with the new user data

  // Create a new table row and insert user data into each cell
  const row = userTable.insertRow();
  [name, email, password, dob, terms].forEach((item) => {
    const cell = row.insertCell();
    cell.textContent = item;
  });

  // Reset the form
  registrationForm.reset(); // Clear all form fields
});
