var TaskDialoguePanel = (function (_super) {
    __extends(TaskDialoguePanel, _super);
    function TaskDialoguePanel() {
        var _this = this;
        _super.call(this);
        this.taskWindow = this.createBitmapByName("talkwindow_png");
        this.taskWindow.touchEnabled = false;
        this.taskWindow.width = 300;
        this.taskWindow.height = 200;
        this.taskService = TaskService.getInstance();
        this.taskDesc = new egret.TextField();
        this.taskDesc.$setText("");
        this.taskDesc.size = 18;
        this.taskDesc.textColor = 0x000000;
        this.taskDesc.y = 35;
        this.taskDesc.x = 50;
        this.taskDesc.width = 200;
        this.taskDesc.height = 120;
        this.buttonYes = this.createBitmapByName("button_png");
        this.buttonYes.x = 70;
        this.buttonYes.y = 80;
        this.buttonYes.touchEnabled = false;
        this.addChild(this.taskWindow);
        this.addChild(this.taskDesc);
        this.addChild(this.buttonYes);
        this.buttonYes.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.onButtonClick();
        }, this);
        this.alpha = 0;
    }
    var d = __define,c=TaskDialoguePanel,p=c.prototype;
    p.onButtonClick = function () {
        if (this.task.status == TaskStatus.ACCEPTABLE) {
            this.taskService.accept(this.task.id);
            this.buttonYes.touchEnabled = false;
            this.alpha = 0;
        }
        if (this.task.status == TaskStatus.CAN_SUBMIT) {
            this.taskService.finish(this.task.id);
            this.buttonYes.touchEnabled = false;
            this.alpha = 0;
        }
    };
    p.setButtonEnable = function () {
        this.buttonYes.touchEnabled = true;
    };
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return TaskDialoguePanel;
}(egret.DisplayObjectContainer));
egret.registerClass(TaskDialoguePanel,'TaskDialoguePanel');
//# sourceMappingURL=TaskDialoguePanel.js.map