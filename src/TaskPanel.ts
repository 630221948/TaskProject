class TaskPanel extends egret.DisplayObjectContainer implements Observer {

	private taskHint: egret.TextField;


	public constructor() {
		super();
		this.taskHint = new egret.TextField();
		this.taskHint.$setText("");
		this.taskHint.size = 48;
		this.taskHint.textColor = 0x000000;
		this.addChild(this.taskHint);
	}

	public onChange(task: Task) {
		var taskService: TaskService = TaskService.getInstance();
		var task: Task = taskService.getTaskByCustomRole(taskService.Rule);

		if (task.status == TaskStatus.ACCEPTABLE) {                        /////先要接受任务！！！！！！
			this.taskHint.$setText("您有一个任务可以接受！");
		}
		else if (task.status == TaskStatus.DURING) {             ////////////////////该去点击目标NPC了！！！！
			this.taskHint.$setText("您已接受" + task.name);
		}
		else if (task.status == TaskStatus.CAN_SUBMIT) {                                         /////////可以交任务了！！！！
			this.taskHint.$setText("您已完成" + task.name + ",可以提交！")
		}
		else if (task.status == TaskStatus.SUBMITTED) {
			this.taskHint.$setText(task.name + "提交完毕,经验+100！！！")
		}


	}
}