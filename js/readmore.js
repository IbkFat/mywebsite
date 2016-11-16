
function removeClass(ind, num) {
    // check if div doesnot have the minimize className
    //if yes, add it
    // otherwize, remove it.
    if((/excerpt-hidden/gi).test(document.getElementById(ind).className)){
    document.getElementById(ind).className = document.getElementById(ind).className.replace( /(?:^|\s)excerpt-hidden(?!\S)/g , '' )
    num.innerHTML = 'Collapse'

    }else{
    document.getElementById(ind).className += ' excerpt-hidden'
    num.innerHTML = 'Continue'

    }
    
}

// window.onload = function(ind) {
//     document.getElementById(ind).addEventListener('click', removeClass);
// }