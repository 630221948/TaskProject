class TaskDialoguePanel extends egret.DisplayObjectContainer {
	public taskDesc: egret.TextField;
	private buttonYes: egret.Bitmap;
	public task: Task;
	public taskService: TaskService;
	private taskWindow: egret.Bitmap;


	public constructor() {

		super();

		this.taskWindow = this.createBitmapByName("talkwindow_png")
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

		this.buttonYes = this.createBitmapByName("button_png")
		this.buttonYes.x = 70;
		this.buttonYes.y = 80;
		this.buttonYes.touchEnabled = false;

		this.addChild(this.taskWindow);
		this.addChild(this.taskDesc);
		this.addChild(this.buttonYes);

		this.buttonYes.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.onButtonClick();
		}, this);
		this.alpha = 0;
	}

	public onButtonClick(): void {
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

	}

	public setButtonEnable() {
		this.buttonYes.touchEnabled = true;
	}

	private createBitmapByName(name: string): egret.Bitmap {
        var result = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}