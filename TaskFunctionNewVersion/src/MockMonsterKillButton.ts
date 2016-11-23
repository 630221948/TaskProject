class MockMonsterKillButton extends egret.DisplayObjectContainer {
	private killMonsterButton: egret.Bitmap;
	private sceneService:SceneService;

	public constructor(sceneService:SceneService) {
		super();
		this.killMonsterButton = this.createBitmapByName("killmonsterbutton_png");
		this.killMonsterButton.alpha = 1;
		this.killMonsterButton.touchEnabled = true;
		this.addChild(this.killMonsterButton);
		this.killMonsterButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onButtonClick,this);
		
		this.sceneService = sceneService;
	}

	public onButtonClick(): void {
		this.sceneService.notify();
	}

	private createBitmapByName(name: string): egret.Bitmap {
        var result = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}