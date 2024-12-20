let users = []
let posts = []
let albums = []
let photos = new Array(5000)
let userId = 0
let loaded = false

async function getUsers() {
    for (let i = 1; i < 11; i++) {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${i}`)
        let user = await response.json()
        users.push(user)
        let optionEl = document.createElement("option")
        optionEl.value = user.username
        optionEl.label = user.username
        document.getElementById("usernames").appendChild(optionEl)
    }
    document.getElementById("usernames").addEventListener("change",
        function(event) {
            var selectElement = event.target;
            var value = selectElement.value;
            selectUser(value)
            getPhotos()
            loadUser()
        }
    )
}
getUsers()

async function getPosts() {
    for (let i = 1; i < 101; i++) {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${i}`)
        let post = await response.json()
        posts.push(post)
    }
}
getPosts()

async function getAlbums() {
    for (let i = 1; i < 101; i++) {
        const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${i}`)
        let album = await response.json()
        albums.push(album)
    }
}
getAlbums()

async function getPhotos() {
    for (let i = 500 * (userId - 1); i < 500 * userId; i++) {
        const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${i}`)
        photos[i - 1] = await response.json()
    }
}
getPhotos()
.then (() => {
    loaded = true
    document.getElementById("loading").innerHTML = ""
})
function selectUser(username) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].username == username) {
            userId = users[i].id
            break
        }
    }
}

function loadUser() {
    let div = document.getElementById("posts")
    div.innerHTML = ""
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].userId == userId) {
            let x = i
            while (posts[x].userId == userId) {
                let post = posts[x]
                div.innerHTML += `<h3>${post.title}</h3><p>${post.body.replace(/\n/g, "<br>")}</p>`
                x++
            }
            break
        }
    }
    div = document.getElementById("albums")
    div.innerHTML = ""
    for (let i = 0; i < albums.length; i++) {
        if (albums[i].userId == userId) {
            let x = i
            while (albums[x].userId == userId) {
                let album = albums[x]            
                div.innerHTML += `<h3>${album.title}</h3>`
                for (let y = 50 * (album.id - 1); y < 50 * album.id; y++) {
                    let img = `<img src="${photos[y].thumbnailUrl}"/>`
                    div.innerHTML += `${img}`
                }
                x++
            }
            break
        }
    }
}