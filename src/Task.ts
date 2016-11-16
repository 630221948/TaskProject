class Task {
	public id:String;
	public name:String;
	public desc:String;
	public status:TaskStatus;
	public fromNPCID:String;
	public toNPCID:String;

	public constructor(id:String,name:String,desc:String,fromNPCID:String,toNPCID:String) {
		this.status = TaskStatus.ACCEPTABLE;
		this.id = id;
		this.name = name;
		this.desc = desc;
		this.fromNPCID = fromNPCID;
		this.toNPCID = toNPCID;
	}	
}