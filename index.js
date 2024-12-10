let users = []
let commets = []

async function getUser() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users/4")
    let json = await response.json()
    users.push(json)
}

getUser()

async function getComment() {
    const response = await fetch("https://jsonplaceholder.typicode.com/comments/1")
    let json = await response.json()
    let pEl = document.createElement("p")
    pEl.textContent = JSON.stringify(json)
    document.body.appendChild(pEl)
}

getComment()

async function getAddress() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users/4")
    let json = await response.json()
    console.log(json.address)
}

getAddress()
