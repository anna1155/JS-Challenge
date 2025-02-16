let display = true ;
document.querySelectorAll("summary").forEach(summary => { //get all summary html elements and assign a click event for each of them
    summary.addEventListener("click", function() {
        let img = this.querySelector("span img");
        if (img) {
            if(display){
                img.src = 'icon-minus.svg';
                display = false ;//if paragraph is already displayed change display to false
            }else{
                img.src = 'icon-plus.svg';
                display = true ;//if paragraph isnt already displayed change display to true
            }
        }
    });
});