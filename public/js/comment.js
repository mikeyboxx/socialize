


const newCommentFormHandler = async (loggedIn, idx, event) => {
    event.stopPropagation(event);

    if (!loggedIn) return;

    const contents = document.querySelector(`#newcomment-text${idx}`).value.trim();
    const postId = document.querySelector(`.comment-id${idx}`).innerText

    if (contents && postId) {
      try{
        let response = await fetch('/api/comments', {
          method: 'POST',
          body: JSON.stringify({contents, postId}),
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.reload();
        } else {
          response = await response.json();
          alert(`Failed to log in. ${response.message}`);
        }
      }
      catch (err){
        console.log(err);
      }
    }
  };

const submitBtn = document.querySelectorAll('.submit');
    submitBtn.forEach(function(el, idx) {
    el.addEventListener('click', newCommentFormHandler.bind(this, $(el).attr('loggedIn'), idx));
});
