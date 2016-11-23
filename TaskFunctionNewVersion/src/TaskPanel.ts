class TaskPanel extends egret.DisplayObjectContainer implements Observer {

	private taskHint: egret.TextField;


	public constructor() {
		super();
		this.taskHint = new egret.TextField();
		this.taskHint.$setText("");
		this.taskHint.size = 24;
		this.taskHint.textColor = 0x000000;
		this.addChild(this.taskHint);
	}

	public onChange(task: TaskConditionContext) {
		var taskID: String = task.getTaskID();
		// var taskService: TaskService = TaskService.getInstance();
		// var task = taskService.getTaskByCustomRole(taskService.Rule);

		// var sceneService: SceneService = SceneService.getInstance();
		// var task1 = sceneService.getTaskByCustomRole(sceneService.Rule);

		// if (task.status == TaskStatus.ACCEPTABLE) {                        /////先要接受任务！！！！！！
		// 	this.taskHint.$setText("您有一个任务可以接受！");
		// }
		// else if (task.status == TaskStatus.DURING) {             ////////////////////该去点击目标NPC了！！！！
		// 	this.taskHint.$setText("您已接受" + task.name);
		// }
		// else if (task.status == TaskStatus.CAN_SUBMIT) {                                         /////////可以交任务了！！！！
		// 	this.taskHint.$setText("您已完成" + task.name + ",可以提交！")
		// }
		// else if (task.status == TaskStatus.SUBMITTED) {
		// 	this.taskHint.$setText(task.name + "提交完毕,经验+100！！！")
		// }

		// if (task.getCurrent == TaskStatus.ACCEPTABLE) {                        /////先要接受任务！！！！！！
		// 	this.taskHint.$setText("您有一个任务可以接受！");
		// }
		// else if 
		if (taskID == "00" && task.getCurrent() == 0) {             ////////////////////该去点击目标NPC了！！！！
			this.taskHint.$setText("您已接受新手任务");
		}
		else if (taskID == "00" && task.getCurrent() == 1) {                                         /////////可以交任务了！！！！
			this.taskHint.$setText("您已完成新手任务,可以提交！")
		}
		else if (taskID == "00" && task.getCurrent() > 1) {
			this.taskHint.$setText("新手任务提交完毕！！！")
		}
		else if (taskID == "01" && task.getCurrent() == -1) {               /////////////npc02先notify再onaccept
			this.taskHint.$setText("您已接受杀怪任务！");
		}
		else if (taskID == "01" && task.getCurrent() > 0 && task.getCurrent() <= 5) {
			this.taskHint.$setText("杀死怪物：" + task.getCurrent() + "/5");
		}
		else if (taskID == "01" && task.getCurrent() > 5) {
			this.taskHint.$setText("您已完成杀怪任务！！！");
		}

		console.log("233333333")

	}
}