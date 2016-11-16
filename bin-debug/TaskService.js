var TaskService = (function () {
    function TaskService() {
        this.observerList = [];
        this.taskList = [];
        TaskService.count++;
        if (TaskService.count > 1) {
            throw 'Singleton!!!!!!!!';
        }
    }
    var d = __define,c=TaskService,p=c.prototype;
    TaskService.getInstance = function () {
        if (TaskService.instance == null) {
            TaskService.instance = new TaskService();
        }
        return TaskService.instance;
    };
    p.finish = function (id) {
        if (!id) {
            return ErrorCode.TASK_MISSING;
        }
        var i;
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
    };
    p.accept = function (id) {
        if (!id) {
            return ErrorCode.TASK_MISSING;
        }
        var i;
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
    };
    p.during = function (id) {
        if (!id) {
            return ErrorCode.TASK_MISSING;
        }
        var i;
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
    };
    p.getTaskByCustomRole = function (Rule) {
        return Rule(this.taskList);
    };
    p.notify = function () {
        var i;
        for (i = 0; i < this.taskList.length; i++) {
            for (var _i = 0, _a = this.observerList; _i < _a.length; _i++) {
                var observer = _a[_i];
                observer.onChange(this.taskList[i]);
            }
        }
    };
    p.Rule = function (taskList) {
        var i;
        for (i = 0; i < taskList.length; i++) {
            //if (taskList[i].status == TaskStatus.ACCEPTABLE || taskList[i].status == TaskStatus.CAN_SUBMIT || taskList[i].status == TaskStatus.DURING) {
            if (taskList[i].status != TaskStatus.UNACCEPTABLE) {
                console.log("TaskFound!!!!!!!!");
                return taskList[i];
            }
            else {
                console.log("TaskNotFound!!!!!!!!");
                return null;
            }
        }
    };
    TaskService.count = 0;
    return TaskService;
}());
egret.registerClass(TaskService,'TaskService');
var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["UNACCEPTABLE"] = 0] = "UNACCEPTABLE";
    TaskStatus[TaskStatus["ACCEPTABLE"] = 1] = "ACCEPTABLE";
    TaskStatus[TaskStatus["DURING"] = 2] = "DURING";
    TaskStatus[TaskStatus["CAN_SUBMIT"] = 3] = "CAN_SUBMIT";
    TaskStatus[TaskStatus["SUBMITTED"] = 4] = "SUBMITTED";
})(TaskStatus || (TaskStatus = {}));
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["TASK_MISSING"] = 0] = "TASK_MISSING";
    ErrorCode[ErrorCode["SUCCEED"] = 1] = "SUCCEED";
})(ErrorCode || (ErrorCode = {}));
//# sourceMappingURL=TaskService.js.map