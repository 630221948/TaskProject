var Task = (function () {
    function Task(id, name, desc, fromNPCID, toNPCID) {
        this.status = TaskStatus.ACCEPTABLE;
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.fromNPCID = fromNPCID;
        this.toNPCID = toNPCID;
    }
    var d = __define,c=Task,p=c.prototype;
    return Task;
}());
egret.registerClass(Task,'Task');
//# sourceMappingURL=Task.js.map