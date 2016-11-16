class TaskService {

	public observerList: Observer[] = [];
	public taskList: Task[] = [];

	private static instance;
	private static count = 0;

	public constructor() {
		TaskService.count++;
		if (TaskService.count > 1) {
			throw 'Singleton!!!!!!!!';
		}
	}

	public static getInstance() {
		if (TaskService.instance == null) {
			TaskService.instance = new TaskService();
		}
		return TaskService.instance;
	}

	public finish(id: String): ErrorCode {
		if (!id) {
			return ErrorCode.TASK_MISSING;
		}

		var i: number;
		for (i = 0; i < this.taskList.length; i++) {
			if (this.taskList[i].id == id) {
				break;
			}
		}

		if (!this.taskList[i]) {
			return ErrorCode.TASK_MISSING;
		}

		this.taskList[i].status = TaskStatus.SUBMITTED;
		this.notify();
		return ErrorCode.SUCCEED;
	}

	public accept(id: String): ErrorCode {
		if (!id) {
			return ErrorCode.TASK_MISSING;
		}

		var i: number;
		for (i = 0; i < this.taskList.length; i++) {
			if (this.taskList[i].id == id) {
				break;
			}
		}

		if (!this.taskList[i]) {
			return ErrorCode.TASK_MISSING;
		}

		this.taskList[i].status = TaskStatus.DURING;
		this.notify();
		return ErrorCode.SUCCEED;
	}

	public during(id: String): ErrorCode {
		if (!id) {
			return ErrorCode.TASK_MISSING;
		}

		var i: number;
		for (i = 0; i < this.taskList.length; i++) {
			if (this.taskList[i].id == id) {
				break;
			}
		}

		if (!this.taskList[i]) {
			return ErrorCode.TASK_MISSING;
		}

		this.taskList[i].status = TaskStatus.CAN_SUBMIT;
		this.notify();
		return ErrorCode.SUCCEED;
	}

	public getTaskByCustomRole(Rule: Function): Task {
		return Rule(this.taskList);
	}

	public notify(): void {
		var i: number;
		for (i = 0; i < this.taskList.length; i++) {
			for (var observer of this.observerList) {
				observer.onChange(this.taskList[i]);
			}
		}


	}

	public Rule(taskList: any): Task {
		var i: number;
		for (i = 0; i < taskList.length; i++) {
			//if (taskList[i].status == TaskStatus.ACCEPTABLE || taskList[i].status == TaskStatus.CAN_SUBMIT || taskList[i].status == TaskStatus.DURING) {
			if (taskList[i].status != TaskStatus.UNACCEPTABLE) {
				console.log("TaskFound!!!!!!!!")
				return taskList[i];
			}
			else {
				console.log("TaskNotFound!!!!!!!!")
				return null;
			}
		}

	}

}



enum TaskStatus {
	UNACCEPTABLE = 0,
	ACCEPTABLE = 1,
	DURING = 2,
	CAN_SUBMIT = 3,
	SUBMITTED = 4
}

enum ErrorCode {
	TASK_MISSING = 0,
	SUCCEED = 1
}