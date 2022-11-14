const notificationHandler = async (notificationId, postId, event) => {
  // event.preventDefault();
  event.stopPropagation();

  try {
    const response = await fetch(`/api/notifications/${notificationId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        read_flag: true 
      }),
    })

const data = await fetch(`/api/posts/${postId}`)
const post = await data.json()
const element= $("<div>")
$(`#notification${notificationId}`).parent().append(element)


loadPost(post, element);

  } catch (err) {
    console.log(err);
  }
};


const allNotifications = document.querySelectorAll('.nidhi');

allNotifications.forEach(function(el) {
  el.addEventListener('click', notificationHandler.bind(this,  $(el).attr('notificationId'), $(el).attr('postId')));
});
  
document.addEventListener('DOMContentLoaded', () => {
    (document.querySelectorAll('.notification .delete') || []).forEach(($delete) => {
      const $notification = $delete.parentNode;
  
      $delete.addEventListener('click', () => {
        $notification.parentNode.removeChild($notification);
        document.location.replace('/notifications');
      });
    });
  });



function loadPost (post, element) {
const {contents, totalLikes, totalDislikes, totalComments, id } = post
  $(element).html( `

<div class="notification-modal " id="postDetails">
<header class="modal-card-head sign-in">
<p class="modal-card-title"></p>
<button class="delete" aria-label="close"></button>
</header>
<div class="modal-background"></div>
<div class="modal-content">
<div class="box" style="color:black;">
<p>
 ${contents}
</p>
<div>

  <span class="like{{@index}}">Total Likes:${totalLikes}</span>
  <i class="fa-solid fa-thumbs-up thumbs-up{{@index}}" postid="${id}}"></i> 

  <span class="dislike{{@index}}">Total Dislikes:${totalDislikes} </span>
   <i class="fa-solid fa-thumbs-down thumbs-down{{@index}}" postid="${id}"></i>


  <span class="comment{{@index}}">Total Comments: ${totalComments}</span>
  <i class="fa-regular fa-comment{{@index}}" postid="${id}"></i>

</div>


</div>
</div>
<button class="modal-close is-large" aria-label="close"></button>
</div>`)
}