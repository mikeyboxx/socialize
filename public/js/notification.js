const notificationHandler = async (notificationId, postId, event) => {
  // event.preventDefault();
  event.stopPropagation();

  // console.log(notificationId, typeof notificationId);
  // console.log('click');
  // const id = parseInt(notificationId);
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
    (document.querySelectorAll('.delete .notification-modal-close .notification-modal') || []).forEach(($delete) => {
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
  <div class="notification-modal">
  <div class="modal-background"></div>
  <div class="modal-content">
  <div class="box">
  <button class="delete"></button>
  <p>
   ${contents}
  </p>
  <div>
    <span class="like">${totalLikes}</span>
    <i class="fa-solid fa-thumbs-up thumbs-up{{@index}}" postid="${id}}"></i> 
    <span class="dislike">${totalDislikes} </span>
     <i class="fa-solid fa-thumbs-down thumbs-down{{@index}}" postid="${id}"></i>
    <span class="comment">${totalComments}</span>
    <i class="fa-regular fa-comment" postid="${id}"></i>
  </div>
  
  </div>
  </div>
  <button class="notification-modal-close is-large" aria-label="close"></button>
  </div>


`)}