var yLimit = 450;

var bellModel = {
    
    x: 200,
    y: 50,
    velocity: 3,
    
    update: function() {
        this.y += this.velocity;
        if (this.y > yLimit) {
            this.y = -50;
        }
    }
    
};

function BellView(bellModel){
    this.bellModel = bellModel;
    var element = document.createElement("div");
    element.className = "bell";
    element.style.left = bellModel.x + "px";
    element.style.top = bellModel.y + "px";
    this.HTMLElement = element;
};

BellView.prototype.addToStage = function (gameElement) {
    gameElement.appendChild(this.HTMLElement);
    return this; // Allows for sth like: var b = new BellView(m).addToStage(s);
}

BellView.prototype.updateCSS = function () {
    this.HTMLElement.style.left = this.bellModel.x + "px";
    this.HTMLElement.style.top = this.bellModel.y + "px";
};