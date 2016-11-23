var MockMonsterKillButton = (function (_super) {
    __extends(MockMonsterKillButton, _super);
    function MockMonsterKillButton(sceneService) {
        _super.call(this);
        this.killMonsterButton = this.createBitmapByName("killmonsterbutton_png");
        this.killMonsterButton.alpha = 1;
        this.killMonsterButton.touchEnabled = true;
        this.addChild(this.killMonsterButton);
        this.killMonsterButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this.sceneService = sceneService;
    }
    var d = __define,c=MockMonsterKillButton,p=c.prototype;
    p.onButtonClick = function () {
        this.sceneService.notify();
    };
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return MockMonsterKillButton;
}(egret.DisplayObjectContainer));
egret.registerClass(MockMonsterKillButton,'MockMonsterKillButton');
//# sourceMappingURL=MockMonsterKillButton.js.map