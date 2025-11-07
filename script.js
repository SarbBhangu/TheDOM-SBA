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
            li.dataset.id = String(post.id);
       
        const h3 = document.createElement('h3');
            h3.textContent = post.title;
       
        const p = document.createElement('p')
            p.textContent = post.content;

        const actions = document.createElement('div');
            actions.className = 'post-actions';

        const delBtn = document.createElement('button');
            delBtn.type = 'button';
            delBtn.className = 'delete-btn';
            delBtn.textContent = 'Delete';
            
        actions.appendChild(delBtn); 
    
        li.appendChild(h3)
        li.appendChild(p);
        li.appendChild(actions);
        postsList.appendChild(li);
    });
}


function validateForm() {
    let ok = true;

    titleError.textContent = '';
    contentError.textContent = '';

        if (titleInput.value.trim() === '') {
            titleError.textContent = 'Title required';
            ok = false;
        }   
        if (contentInput.value.trim() === '') {
            contentError.textContent = 'Content required.'
            ok = false;
        }

        return ok;
}


form.addEventListener('submit', function (event) {
    event.preventDefault();

        if(!validateForm()) {
            return;
        }

        const newPost = {
            id: Date.now(),
            title: titleInput.value.trim(),
            content: contentInput.value.trim(),
        };

        posts.push(newPost);
        savePosts()
        renderPosts()
        form.reset()
})


postsList.addEventListener('click', function (e) {
  const btn = e.target.closest('button');
    if (!btn) return;

    if (btn.classList.contains('delete-btn')) {
        const li = btn.closest('li');
        if (!li) return;

        const id = Number(li.dataset.id);
        posts = posts.filter(p => p.id !== id);
        savePosts();
        renderPosts();
  }
});

loadPosts();
renderPosts();
        