const notificationHandler = async (notificationId, idx, event) => {
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
    document.location.replace('/notifications');
  } catch (err) {
    console.log(err);
  }
};


const allNotifications = document.querySelectorAll('.nidhi');
allNotifications.forEach(function(el, idx) {
  el.addEventListener('click', notificationHandler.bind(this,  $(el).attr('notificationId'), idx));
});



// const likeHandler = async (notification, idx, event) => {
//   event.stopPropagation();


// if($(`.notification-content${idx}`).hasClass('fa-solid')) {
//   $(`.notification-content${idx}`).removeClass('fa-solid').addClass('fa-regular');

//   const response = await fetch('/api/reactions', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       type: 'undo', 
//       postId: $(`.thumbs-up${idx}`).attr('postid').attr('notificationid')
//     }),
//   });

//   const {totalRead, totalUnread} = await response.json();

//   $(`.read${idx}`).text(totalRead);
//   $(`.unread${idx}`).text(totalUnread);


// }
// };


// const eachNotification = document.querySelectorAll('.nidhi');
// eachNotification.forEach(function(btn, idx) {
//   btn.addEventListener('click', likeHandler.bind(this, $(btn).attr('post').attr('notification'), idx));
// });



  
// document.addEventListener('DOMContentLoaded', () => {
//     (document.querySelectorAll('.notification .delete') || []).forEach(($delete) => {
//       const $notification = $delete.parentNode;
  
//       $delete.addEventListener('click', () => {
//         $notification.parentNode.removeChild($notification);
//       });
//     });
//   });
