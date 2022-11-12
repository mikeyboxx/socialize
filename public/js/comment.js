


const newCommentFormHandler = async (idx, event) => {
    event.stopPropagation(event);
    console.log("easy Girl!!!")

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
    submitBtn.forEach(function(btn, idx) {
    btn.addEventListener('click', newCommentFormHandler.bind(this, idx));
});
