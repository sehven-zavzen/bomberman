//USAGE: To hide -> hideShowElement('q1', true), To show -> hideShowElement('q1', false)
function hideShowElement(elementId, hide) {
    var element = $('#' + elementId);

    if (element == 'undefined') {
        return;
    }

    if (hide) {
        element.hide();
    } else {
        element.show();
    }
}

//USAGE: moveElementRightAndLeft('q1', 5000, 250, 'forever');  or  moveElementRightAndLeft('q1', 5000, 250, 2);
function moveElementRightAndLeft(elementId, speed, moveDistance, loopCount) {
    var element = $('#' + elementId);

    if (element == 'undefined') {
        return;
    }

    $(element).animate({ marginLeft: "+=" + moveDistance + "px"},
    {
        duration: speed,
        complete: function ()
        {
            element.animate({ marginLeft: "-=" + moveDistance + "px" },
            {
                duration: speed,
                complete: function ()
                {   
                    if (loopCount == 'forever') {
                        moveElementRightAndLeft(elementId, speed, moveDistance, loopCount);
                    } else {
                        loopCount--;
                        if (loopCount > 0) {
                            moveElementRightAndLeft(elementId, speed, moveDistance, loopCount);
                        }
                    }
                }
            });
        }
    });
};

function stopAnimation(elementId) {
    var element = $('#' + elementId);

    element.stop();
}