//event listener to toggle displaying the comment box
let postBoxes = document.querySelectorAll('.postBox');
postBoxes.forEach(postBox => {
    postBox.addEventListener('click', function () {
        let comment = this.querySelector('.commentbox');
        comment.classList.remove("hidden");
        comment.classList.add("commentboxStyle");
    });
});

let commentBoxes = document.querySelectorAll('.commentbox');
commentBoxes.forEach(commentBox => {
    commentBox.addEventListener('submit', async function (e) {
        e.preventDefault();
        let comment = this.querySelector('input').value.trim();
        // let user_id = this.dataset.userId;
        let post_id = this.querySelector('button').dataset.postid;

        if(comment.length){
            const response = await fetch('/api/comments/', {
                method: 'POST',
                body: JSON.stringify({ comment, post_id }),
                headers: { 'Content-Type': 'application/json' },
            });
    
            if (response.ok) {
                document.location.replace('/');
            } else {
                alert('Failed to comment');
            }
        }
    }
)
});


