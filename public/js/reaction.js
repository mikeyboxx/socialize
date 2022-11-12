const likeHandler = async (loggedIn, idx, event) => {
    event.stopPropagation();
    
    if (!loggedIn) return;

    if($(`.thumbs-up${idx}`).hasClass('fa-solid')) {
      $(`.thumbs-up${idx}`).removeClass('fa-solid').addClass('fa-regular');

      const response = await fetch('/api/reactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'undo', 
          postId: $(`.thumbs-up${idx}`).attr('postid')
        }),
      });

      const {totalLikes, totalDisLikes} = await response.json();

      $(`.like${idx}`).text(totalLikes);
      $(`.dislike${idx}`).text(totalDisLikes);

      // undo
    } else if($(`.thumbs-up${idx}`).hasClass('fa-regular')) {
      $(`.thumbs-up${idx}`).removeClass('fa-regular').addClass('fa-solid');

      const response = await fetch('/api/reactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'like', 
          postId: $(`.thumbs-up${idx}`).attr('postid')
        }),
      });

      const {totalLikes, totalDisLikes} = await response.json();

      $(`.like${idx}`).text(totalLikes);
      $(`.dislike${idx}`).text(totalDisLikes);

      // like
      if($(`.thumbs-down${idx}`).hasClass('fa-solid')) {
        $(`.thumbs-down${idx}`).removeClass('fa-solid').addClass('fa-regular');
      }  
    }
  };

  const dislikeHandler = async (loggedIn, idx, event) => {
    event.stopPropagation();

    if (!loggedIn) return;

    if($(`.thumbs-down${idx}`).hasClass('fa-solid')) {
      $(`.thumbs-down${idx}`).removeClass('fa-solid').addClass('fa-regular');
      const response = await fetch('/api/reactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'undo', 
          postId: $(`.thumbs-down${idx}`).attr('postid')
        }),
      });

      const {totalLikes, totalDisLikes} = await response.json();

      $(`.like${idx}`).text(totalLikes);
      $(`.dislike${idx}`).text(totalDisLikes);
      // undo
    } else if($(`.thumbs-down${idx}`).hasClass('fa-regular')) {
      $(`.thumbs-down${idx}`).removeClass('fa-regular').addClass('fa-solid');
      const response = await fetch('/api/reactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'dislike', 
          postId: $(`.thumbs-up${idx}`).attr('postid')
        }),
      });

      const {totalLikes, totalDisLikes} = await response.json();

      $(`.like${idx}`).text(totalLikes);
      $(`.dislike${idx}`).text(totalDisLikes);
      // dislike
      if($(`.thumbs-up${idx}`).hasClass('fa-solid')) {
        $(`.thumbs-up${idx}`).removeClass('fa-solid').addClass('fa-regular');
      }  
    }
  }

  

const thumbupButtons = document.querySelectorAll('.mike');
thumbupButtons.forEach(function(btn, idx) {
  btn.addEventListener('click', likeHandler.bind(this, $(btn).attr('loggedIn'), idx));
});

const thumbdownButtons = document.querySelectorAll('.chris');
thumbdownButtons.forEach(function(btn, idx) {
  btn.addEventListener('click', dislikeHandler.bind(this,  $(btn).attr('loggedIn'), idx));
});
