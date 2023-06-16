package ro.fii.licenta.framework;

public enum Report {

	PROJECT_TEAM("/project-team/Project_Team"), TASK_BACKLOG("project-backlog/Project_TaskBacklog"),
	PROJECT_FINANCIAL_SITUATION("project-financial-situation/Project_FinancialSituation"),
	TASK_PROGRESS("project-task/Project_Task");

	public String path;

	private Report(String path) {
		this.path = path;
	}

}
