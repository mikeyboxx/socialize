const likeHandler = async (notification, idx, event) => {
  event.stopPropagation();





if($(`.notification-content${idx}`).hasClass('fa-solid')) {
  $(`.notification-content${idx}`).removeClass('fa-solid').addClass('fa-regular');

  const response = await fetch('/api/reactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: 'undo', 
      postId: $(`.read${idx}`).attr('postid').attr('notificationid')
    }),
  });

  const {totalRead, totalUnread} = await response.json();

  $(`.read${idx}`).text(totalRead);
  $(`.unread${idx}`).text(totalUnread);


}
};


const eachNotification = document.querySelectorAll('.nidhi');
eachNotification.forEach(function(btn, idx) {
  btn.addEventListener('click', likeHandler.bind(this, $(btn).attr('post').attr('notification'), idx));
});





  
// document.addEventListener('DOMContentLoaded', () => {
//     (document.querySelectorAll('.notification .delete') || []).forEach(($delete) => {
//       const $notification = $delete.parentNode;
  
//       $delete.addEventListener('click', () => {
//         $notification.parentNode.removeChild($notification);
//       });
//     });
//   });
