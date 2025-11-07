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


function renderPosts() {
    postsList.innerHTML = '';

        if (posts.length === 0) {
            const li = document.createElement('li');
            li.textContent = 'Storm is coming';
            li.style.opacity = '0.8';
            postsList.appendChild(li);
            return;
        }       


posts.forEach(function(post) {
    const li = document.createElement('li');
    const h3 = document.createElement('h3');
    const p = document.createElement('p')
   
    p.textContent = post.title;
    
    li.appendChild(h3)
    li.appendChild(p);
    postsList.appendChild(li);
});
}
        