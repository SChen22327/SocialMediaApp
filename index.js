let users = []
let posts = []
let comments = []
let albums = []

async function getUsers() {
    for (let i = 1; i < 11; i++) {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${i}`)
        let user = await response.json()
        users.push(user)
        let optionEl = document.createElement("option")
        optionEl.value = user.username
        optionEl.label = user.username
        optionEl.addEventListener("onchange",
            function() {
                showUser(optionEl.label)
            }
        )
        document.getElementById("usernames").appendChild(optionEl)
    }
}
getUsers()

async function getPosts() {
    for (let i = 1; i < 101; i++) {

    }
}
getPosts()

async function getComments() {
    for (let i = 1; i < 501; i++) {

    }
}
getComments()

async function getAlbums() {
    for (let i = 1; i < 101; i++) {

    }
}
getAlbums()

function showUser(username) {
    
}