let users = []
let posts = []
let albums = []
let photos = new Array(5000)
let userId = 0

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

async function getPhotos(albumId) {
    for (let i = 50 * (albumId - 1); i < 50 * albumId; i++) {
        const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${i + 1}`)
        photos[i] = await response.json()
    }
}

function selectUser(username) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].username == username) {
            userId = users[i].id
            break
        }
    }
}

async function loadUser() {
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
                await getPhotos(album.id)
                for (let y = 50 * (album.id - 1); y < 50 * album.id; y++) {
                    let img = photos[y].thumbnailUrl
                    div.innerHTML += `<img loading="lazy" id="photo" src="${img}"/>`
                }
                x++
            }
            break
        }
    }
}