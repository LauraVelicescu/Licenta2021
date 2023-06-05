package ro.fii.licenta.framework;

public enum Report {

	PROJECT_TEAM("/project-team/Project_Team");

	public String path;

	private Report(String path) {
		this.path = path;
	}

}
