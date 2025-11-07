const form = document.getElementById('newPostForm');
const titleInput = document.getElementById('postTitle');
const contentInput = document.getElementById('postContent');
const titleError = document.getElementById('titleError');
const contentError = document.getElementById('contentError');
const postsList = document.getElementById('postsList');


let posts = [];


function loadPosts() {
    const saved = localStorage.getItem('brainstorm-posts');

        if (saved) {
            posts = JSON.parse(saved);
        } else {
            posts = [];
        }
}

function savePosts() {
    localStorage.setItem('brainstorm-posts', JSON.stringify(posts));
}

