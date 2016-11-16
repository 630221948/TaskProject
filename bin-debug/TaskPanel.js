var TaskPanel = (function (_super) {
    __extends(TaskPanel, _super);
    function TaskPanel() {
        _super.call(this);
        this.taskHint = new egret.TextField();
        this.taskHint.$setText("");
        this.taskHint.size = 48;
        this.taskHint.textColor = 0x000000;
        this.addChild(this.taskHint);
    }
    var d = __define,c=TaskPanel,p=c.prototype;
    p.onChange = function (task) {
        var taskService = TaskService.getInstance();
        var task = taskService.getTaskByCustomRole(taskService.Rule);
        if (task.status == TaskStatus.ACCEPTABLE) {
            this.taskHint.$setText("您有一个任务可以接受！");
        }
        else if (task.status == TaskStatus.DURING) {
            this.taskHint.$setText("您已接受" + task.name);
        }
        else if (task.status == TaskStatus.CAN_SUBMIT) {
            this.taskHint.$setText("您已完成" + task.name + ",可以提交！");
        }
        else if (task.status == TaskStatus.SUBMITTED) {
            this.taskHint.$setText(task.name + "提交完毕,经验+100！！！");
        }
    };
    return TaskPanel;
}(egret.DisplayObjectContainer));
egret.registerClass(TaskPanel,'TaskPanel',["Observer"]);
//# sourceMappingURL=TaskPanel.js.map