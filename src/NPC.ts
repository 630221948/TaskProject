class NPC extends egret.DisplayObjectContainer implements Observer {
	private NPCBitmap: egret.Bitmap;
	private NPCID: String;
	private emoji0: egret.Bitmap;
	private emoji1: egret.Bitmap;
	private dialoguePanel: TaskDialoguePanel;

	public constructor(NPCID: String, dialoguePanel: TaskDialoguePanel, npcTexture:egret.Bitmap) {
		super();
		this.NPCBitmap = npcTexture;
		this.emoji0 = this.createBitmapByName("emoji0_png");
		this.emoji1 = this.createBitmapByName("emoji1_png");
		this.addChild(this.emoji0);
		this.addChild(this.emoji1);
		this.addChild(this.NPCBitmap);
		this.NPCBitmap.y = 50;
		this.emoji0.x = 40;
		this.emoji1.x = 40;
		this.emoji1.alpha = 0;
		this.emoji0.alpha = 0;
		this.NPCID = NPCID;
		this.dialoguePanel = dialoguePanel;
		this.$touchEnabled = true;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.onNPCClick();
		}, this)
	}

	public onNPCClick() {
		var taskService: TaskService = TaskService.getInstance();
		var task = taskService.getTaskByCustomRole(taskService.Rule);               /////////////完成任务后，再次进入回调时，task为空，因为状态为submitted
		if (task != null) {
			console.log(task.desc);
		}


		if (task == null) {
			console.log("Nothing here!!!");
		}
		else if (this.NPCID == task.fromNPCID && task.status == TaskStatus.ACCEPTABLE) {
			this.dialoguePanel.alpha = 1;
			this.dialoguePanel.task = task;
			this.dialoguePanel.taskDesc.$setText("嘿！"+task.desc);
			this.dialoguePanel.setButtonEnable();
			this.emoji0.alpha = 0;
			this.emoji1.alpha = 0;
		}
		else if (this.NPCID == task.fromNPCID && task.status == TaskStatus.CAN_SUBMIT) {
			this.dialoguePanel.alpha = 1;
			this.dialoguePanel.task = task;
			this.dialoguePanel.taskDesc.$setText("厉害了，我的哥，你做到了！！！");
			this.dialoguePanel.setButtonEnable();
			this.emoji0.alpha = 0;
			this.emoji1.alpha = 0;
		}
		else if (this.NPCID == task.toNPCID && task.status == TaskStatus.DURING) {
			taskService.during("00");
		}
		else if (task.status == TaskStatus.SUBMITTED) {
			console.log("I Got Nothing To Do With You Right Now!!!")
		}

	}

	public onChange(task: Task) {
		if (task.status == TaskStatus.ACCEPTABLE) {                        /////先要接受任务！！！！！！
			if (this.NPCID == task.fromNPCID) {
				console.log("From NPC IN!");
				console.log(task.status);
				this.emoji0.alpha = 1;
				this.emoji1.alpha = 0;
			}
			else if (this.NPCID == task.toNPCID) {
				console.log("To NPC IN!");
				console.log(task.status);
				this.emoji0.alpha = 0;
				this.emoji1.alpha = 0;
			}

		}
		else if (task.status == TaskStatus.DURING) {             ////////////////////该去点击目标NPC了！！！！
			if (this.NPCID == task.fromNPCID) {
				console.log("From NPC IN!");
				console.log(task.status);
				this.emoji0.alpha = 0;
				this.emoji1.alpha = 0;
			}
			else if (this.NPCID == task.toNPCID) {
				console.log("To NPC IN!");
				console.log(task.status);
				this.emoji0.alpha = 1;
				this.emoji1.alpha = 0;
			}
		}
		else if (task.status == TaskStatus.CAN_SUBMIT) {                                         /////////可以交任务了！！！！
			if (this.NPCID == task.fromNPCID) {
				console.log("From NPC IN!");
				console.log(task.status);
				this.emoji0.alpha = 0;
				this.emoji1.alpha = 1;
			}
			else if (this.NPCID == task.toNPCID) {
				console.log("To NPC IN!");
				console.log(task.status);
				this.emoji0.alpha = 0;
				this.emoji1.alpha = 0;
			}
		}

	}

	private createBitmapByName(name: string): egret.Bitmap {
        var result = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}