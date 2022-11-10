

function openModal() {
    const pEl = $("#static-modal")
    const mEl = $("#post-modal")

    $(mEl).on("click",function(event){
        event.stopPropagation();
        console.log(pEl)
        pEl.addClass("is-active")
})};

