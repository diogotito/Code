function DVS_DragObject(element) {

    this.volpic = this;

    this.correctX = 0; // auto correct X position, if object inserted in another objects 
    this.correctY = 0; // auto correct Y position, if object inserted ib another objects 
    this.maxDragX = 0; // limitation draging on x axis for current dragging object
    this.maxDragY = 0; // limitation draging on x axis for current dragging object

    element.dragObject = this;
    dragMaster.makeDraggable(element);

    this.rememberPosition = null;
    this.mouseOffset = null;
    this.flagEnableYdrag = false;
    this.flagEnableXdrag = false;

    this.SetXYdrag = function (flagX, flagY) {
        this.flagEnableXdrag = flagX;
        this.flagEnableYdrag = flagY;
    };
    this.GetXYdrag = function () {
        return { x: this.flagEnableXdrag, y: this.flagEnableYdrag };
    };
    this.onDragStart = function (offset) {
        var s = element.style;
        rememberPosition = { top: s.top, left: s.left, position: s.position };
        s.position = 'absolute';
        mouseOffset = offset;
    };

    this.onDragMove = function (x, y) {
        var newx = x - mouseOffset.x - this.correctX;
        var newy = y - mouseOffset.y - this.correctY;
        if (this.flagEnableYdrag) {
            if (newy >= 0 && newy < this.maxDragY - element.clientHeight) {
                element.style.top = newy + 'px';
                this.onDragMoveOccured(newx / this.maxDragX, newy / this.maxDragY);
            }
        }
        if (this.flagEnableXdrag) {
            if (newx >= 0 && newx < this.maxDragX - element.clientWidth) {
                element.style.left = newx + 'px';
                this.onDragMoveOccured(newx / this.maxDragX, y - mouseOffset.y - this.correctY);
            }
        };
    };
    this.hide = function () {
        element.style.display = 'none';
    };
    this.show = function () {
        element.style.display = '';
    };
    this.onDragMoveOccured = function (x, y) { };
    this.onDragSuccess = function () { };
    this.onDragFail = function () {
        var s = element.style;
        s.top = rememberPosition.top;
        s.left = rememberPosition.left;
        s.position = rememberPosition.position;
    };
    DVS_DragObject.prototype.toString = function () {
        return element.id;
    };
}
DVS_DragObject.prototype.SetXYdrag = function (flagX, flagY) {
    this.flagEnableXdrag = flagX;
    this.flagEnableXdrag = flagY;
};