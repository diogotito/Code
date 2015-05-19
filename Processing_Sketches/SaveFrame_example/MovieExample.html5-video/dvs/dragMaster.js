var dragMaster = (function () {
    var dragObject = null;
    var mouseDownAt = null;
    var currentDropTarget = null;
    function mouseDown(e) {
        e = DVS_fixEvent(e);
        if (e.which != 1) return
        // Parent objects corection
        mouseDownAt = { x: e.pageX, y: e.pageY, element: this };
        //this.setAttribute('class', 'downState');
        addDocumentEventHandlers();
        return false;
    }
    function mouseMove(e) {
        e = DVS_fixEvent(e);
        if (mouseDownAt) {
            if (Math.abs(mouseDownAt.x - e.pageX) < 5 && Math.abs(mouseDownAt.y - e.pageY) < 5) {
                return false;
            }
            var elem = mouseDownAt.element;
            dragObject = elem.dragObject;
            var mouseOffset = getMouseOffset(elem, mouseDownAt.x, mouseDownAt.y);
            mouseDownAt = null;
            dragObject.onDragStart(mouseOffset); // start drag
        }
        dragObject.onDragMove(e.pageX, e.pageY);
        var newTarget = getCurrentTarget(e);
        if (currentDropTarget != newTarget) {
            if (currentDropTarget) {
                currentDropTarget.onLeave();
            }
            if (newTarget) {
                newTarget.onEnter();
            }
            currentDropTarget = newTarget;
        }
        return false;
    }
    function mouseUp(e) {
        if (!dragObject) {
            mouseDownAt = null;
        } else {
            //dragObject.setAttribute('class', 'upState');
            dragObject.dvspl.pospicMarker.setAttribute('class', 'pospicMarker_upState');
            dragObject.dvspl.volumepicMarker.setAttribute('class', 'volumepicMarker_upState');

            dragObject = null;
            // reset down state from objects

        }
        removeDocumentEventHandlers();
    }
    function getMouseOffset(target, x, y) {
        var docPos = DVS_getOffset(target);
        return { x: x - docPos.left, y: y - docPos.top };
    }
    function getCurrentTarget(e) {
        if (navigator.userAgent.match('MSIE') || navigator.userAgent.match('Gecko')) {
            var x = e.clientX;
            var y = e.clientY;
        } else {
            var x = e.pageX, y = e.pageY;
        }
        dragObject.hide();
        var elem = document.elementFromPoint(x, y);
        dragObject.show();
        while (elem) {
            if (elem.dropTarget && elem.dropTarget.canAccept(dragObject)) {
                return elem.dropTarget;
            }
            elem = elem.parentNode;
        }
        return null;
    }
    function addDocumentEventHandlers() {
        document.onmousemove = mouseMove;
        document.onmouseup = mouseUp;
        document.ondragstart = document.body.onselectstart = function () { return false; };
    }
    function removeDocumentEventHandlers() {
        document.onmousemove = document.onmouseup = document.ondragstart = document.body.onselectstart = null;
    }
    return {
        makeDraggable: function (element) {
            element.onmousedown = mouseDown;
        }
    };
} ());