if (typeof window !== "undefined"){
const registerForm = document.getElementById('register-form')
const membersList = document.getElementById('members-list')

// Fetch members from JSON Server 
async function getMembers() {
  const response = await fetch('http://localhost:3000/members')
  const members = await response.json()
  return members
}

// Display members 
async function displayMembers() {
  membersList.innerHTML = ''
  const members = await getMembers()
  members.map(member => {
    const memberRow = document.createElement('tr')
    memberRow.innerHTML = `
      <td>${member.firstName}</td>
      <td>${member.lastName}</td>
      <td>${member.phoneNumber}</td>
      <td><button type="button" class="btn btn-danger" data_id=${member.id} onclick="handleDelete(event)">${member.action}</button></td>
    `
    membersList.appendChild(memberRow)

  });

}

// Add a new member 
registerForm.addEventListener('submit', async e => {
  e.preventDefault()
  
  let firstName = document.getElementById('firstName').value
  let lastName = document.getElementById('lastName').value
  let phoneNumber = document.getElementById('phoneNumber').value

  const response = await fetch('http://localhost:3000/members', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "firstName": firstName,
      "lastName": lastName,
      "phoneNumber": phoneNumber,
      "action": "Delete"
    })
  })
  await response.json()
  displayMembers()
  registerForm.reset()
})

// Delete a member 
async function handleDelete(e) {
  const memberId = e.target.getAttribute('data_id')
  const response = await fetch(`http://localhost:3000/members/${memberId}`, {
    method: "DELETE"
  })
  await response.json()

  displayMembers()
}

displayMembers()

}