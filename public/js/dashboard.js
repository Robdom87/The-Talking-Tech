let update_post_id;
//event listener to toggle displaying the options box
let postBoxes = document.querySelectorAll('.postBox');
postBoxes.forEach(postBox => {
    postBox.addEventListener('click', function () {
        let options = this.querySelector('.optionsbox');
        options.classList.remove("hidden");
    });
});

//dashboard delete btn
let deleteBtns = document.querySelectorAll('.deleteBtn');
deleteBtns.forEach(deleteBtn => {
    deleteBtn.addEventListener('click', async function (e) {
        e.preventDefault();
        let post_id = this.dataset.postid;

        const response = await fetch(`/api/posts/${post_id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete');
        }
    })
}
);

let form = document.querySelector('.card-body');

//dashboard add btn
document.querySelector('.addBtn').addEventListener('click', function () {
    form.dataset.type = 'add';
    document.querySelector('.postsSection').classList.add('hidden');
    document.querySelector('.card').classList.remove("hidden");
})

//dashboard update btn
let updateBtns = document.querySelectorAll('.updateBtn');
updateBtns.forEach(updateBtn => {
    updateBtn.addEventListener('click', function () {
        form.dataset.type = 'update';
        document.querySelector('.postsSection').classList.add('hidden');
        update_post_id = this.dataset.postid;
        //add old info to input box as value
        let oldTitle = document.querySelector(`h2[data-postid="${update_post_id}"]`).textContent;
        let oldContent = document.querySelector(`p[data-postid="${update_post_id}"]`).textContent;
        document.querySelector('.changeTitle').setAttribute("value", oldTitle);
        document.querySelector('.changeContent').setAttribute("value", oldContent);
        document.querySelector('.card').classList.remove("hidden");     
    })
})

//form to send in update and create request
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    let title = this.querySelector('.changeTitle').value.trim();
    console.log(title);
    let content = this.querySelector('.changeContent').value.trim();
    if (form.dataset.type === 'add') {
        const response = await fetch(`/api/posts/`, {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to add.');
        }
    } else {
        const response = await fetch(`/api/posts/${update_post_id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to update.');
        }
    }
});

//functionality for cancel btn
document.querySelector('.cancelBtn').addEventListener('click', function(){
    document.querySelector('.postsSection').classList.remove('hidden');
    document.querySelector('.card').classList.add("hidden");
})
