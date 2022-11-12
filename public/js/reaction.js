const likeHandler = async (event) => {
    event.stopPropagation();
    const type = "like";
    const id = document.querySelector('#post-id').innerText;

    console.log(id);
    console.log(type)
    if($('.thumbupbtn').hasClass('adulted')) {
      $("#thumb-up").removeClass('fa-solid fa-thumbs-up').addClass('fa-regular fa-thumbs-up');
      $("#like-button").removeClass('adulted').addClass('adult');
    } else if($('.thumbupbtn').hasClass('adult')) {
      $("#thumb-up").removeClass('fa-regular fa-thumbs-up').addClass('fa-solid fa-thumbs-up');
      $(".thumbupbtn").removeClass('adult').addClass('adulted')
    }
  };

  const dislikeHandler = async (event) => {
    event.stopPropagation();
    const type = "dislike";
    const id = document.querySelector('#post-id').innerText;

    console.log(id);
    console.log(type)
    if($('.thumbdownbtn').hasClass('babied')) {
      console.log('.babied')
      $("#thumb-down").removeClass('fa-solid fa-thumbs-down').addClass('fa-regular fa-thumbs-down');
      $(".thumbdownbtn").removeClass('babied').addClass('baby')
    } else if($('.thumbdownbtn').hasClass('baby')){
      console.log('.baby')
      $("#thumb-down").removeClass('fa-regular fa-thumbs-down').addClass('fa-solid fa-thumbs-down');
      $(".thumbdownbtn").removeClass('baby').addClass('babied')
    }
  }
    // changeThumbUp();
    // const type = "like";
    // const id = document.querySelector('#post-id').innerText;

    // console.log(id);
    // console.log(type)

    // if (type && id) {
    //   try{
    //     let response = await fetch('/api/posts/reactions', {
    //       method: 'POST',
    //       body: JSON.stringify({}),
    //       headers: { 'Content-Type': 'application/json' },
    //     });

    //     if (response.ok) {
    //       document.location.replace('/');
    //     } else {
    //       // response = await response.json();
    //       alert(`Failed to log in. ${response.message}`);
    //     }
    //   }
    //   catch (err){
    //     console.log(err);
    //   }
    // }
  // };


//   const dislikeHandler = async (event) => {
//     event.preventDefault();
//     changeThumbDown();


//     const type = "dislike";
//     const id = document.querySelector('#post-id').innerText;

//     console.log(id);
//     console.log(type)

//     if (type && id) {
//       try{
//         let response = await fetch('/api/posts/reactions', {
//           method: 'POST',
//           body: JSON.stringify({}),
//           headers: { 'Content-Type': 'application/json' },
//         });

//         if (response.ok) {
//           document.location.replace('/');
//         } else {
//           alert(`Failed to log in. ${response.message}`);
//         }
//       }
//       catch (err){
//         console.log(err);
//       }
//     }
//   };

//   const unlikeHandler = async (event) => {
//     event.preventDefault();
//     revertThumbUp();


//     const type = "undo";
//     const id = document.querySelector('#post-id').innerText;

//     console.log(id);
//     console.log(type)

//     if (type && id) {
//       try{
//         let response = await fetch('/api/posts/reactions', {
//           method: 'POST',
//           body: JSON.stringify({}),
//           headers: { 'Content-Type': 'application/json' },
//         });

//         if (response.ok) {
//           document.location.replace('/');
//         } else {
//           alert(`Failed to log in. ${response.message}`);
//         }
//       }
//       catch (err){
//         console.log(err);
//       }
//     }
//   };

//   const undislikeHandler = async (event) => {
//     event.preventDefault();
//     revertThumbDown();


//     const type = "undo";
//     const id = document.querySelector('#post-id').innerText;

//     console.log(id);
//     console.log(type)

//     if (type && id) {
//       try{
//         let response = await fetch('/api/posts/reactions', {
//           method: 'POST',
//           body: JSON.stringify({}),
//           headers: { 'Content-Type': 'application/json' },
//         });

//         if (response.ok) {
//           document.location.replace('/');
//         } else {
//           alert(`Failed to log in. ${response.message}`);
//         }
//       }
//       catch (err){
//         console.log(err);
//       }
//     }
//   };


  document.querySelector('.thumbupbtn').addEventListener('click', likeHandler);
  document.querySelector('.thumbupbtn2').addEventListener('click', likeHandler);

  // document.querySelector('.adulted').addEventListener('click', unlikeHandler);

  document.querySelector('.thumbdownbtn').addEventListener('click', dislikeHandler);
  document.querySelector('.thumbdownbtn2').addEventListener('click', dislikeHandler)


//   function changeThumbUp() {
//     const thumbUp = $('#thumb-up')
//     const likeButton = $('#like-button')
//     thumbUp.removeClass('fa-regular fa-thumbs-up').addClass("fa-solid fa-thumbs-up");
//     likeButton.removeClass('adult').addClass('adulted')
//   }
//   function revertThumbUp() {
//     const thumbUp = $('#thumb-up')
//     const likeButton = $('.like-button')
//     thumbUp.removeClass("fa-solid fa-thumbs-up").addClass("fa-regular fa-thumbs-down");
//     likeButton.removeClass('adulted').addClass('adult');
//   }
// //if hasClass('adulted) = fasSolid then apiCall to undo

// //else apicall to like 

//   //if hasclass('babied) = (baby)

// //if hasClass('babied) = fasSolid then apiCall to undo

// //else apicall to dislike

//   //if hasclass('adulted) = (adult)



//   function changeThumbDown() {
//     const thumbDown = $('#thumb-down')
//     const dislikeButton = $('#dislike-button')
//     thumbDown.removeClass('fa-regular fa-thumbs-down').addClass("fa-solid fa-thumbs-down");
//     dislikeButton.removeAttr('#dislike-button').attr('id', 'dislike-buttoned');
//   }


//   function revertThumbDown() {
//     const thumbDown = $('#thumb-down')
//     const dislikeButton = $('#dislike-buttoned')
//     thumbDown.removeClass("fa-solid fa-thumbs-down").addClass("fa-regular fa-thumbs-down");
//     dislikeButton.removeAttr('#dislike-buttoned').attr('id', 'dislike-button');
//   }