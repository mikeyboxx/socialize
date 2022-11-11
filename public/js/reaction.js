const likeHandler = async (event) => {
    event.preventDefault();
    changeThumbUp();
    const type = "like";
    const id = document.querySelector('#post-id').innerText;

    console.log(id);
    console.log(type)

    if (type && id) {
      try{
        let response = await fetch('/api/post', {
          method: 'POST',
          body: JSON.stringify({}),
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          document.location.replace('/');
        } else {
          // response = await response.json();
          alert(`Failed to log in. ${response.message}`);
        }
      }
      catch (err){
        console.log(err);
      }
    }
  };


  const dislikeHandler = async (event) => {
    event.preventDefault();
    changeThumbDown();


    const type = "dislike";
    const id = document.querySelector('#post-id').innerText;

    console.log(id);
    console.log(type)

    if (type && id) {
      try{
        let response = await fetch('/api/posts/reactions', {
          method: 'POST',
          body: JSON.stringify({}),
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          document.location.replace('/');
        } else {
          alert(`Failed to log in. ${response.message}`);
        }
      }
      catch (err){
        console.log(err);
      }
    }
  };

  document.querySelector('#like-button').addEventListener('click', likeHandler);
  document.querySelector('#dislike-button').addEventListener('click', dislikeHandler);

  function changeThumbUp() {
    const thumbUp = $('#thumb-up')
    thumbUp.removeClass('fa-regular fa-thumbs-up').addClass("fa-solid fa-thumbs-up");
  }

  function changeThumbDown() {
    const thumbDown = $('#thumb-down')
    thumbDown.removeClass('fa-regular fa-thumbs-down').addClass("fa-solid fa-thumbs-down");
  }