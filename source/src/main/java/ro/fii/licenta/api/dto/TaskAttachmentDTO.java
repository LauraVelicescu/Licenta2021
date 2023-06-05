package ro.fii.licenta.api.dto;

public class TaskAttachmentDTO {

	private Long id;

	private String name;

	private String description;

	private String extension;

	private byte[] file;

	private ProjectTaskDTO projectTask;

	private String contentType;

	public String getContentType() {
		return contentType;
	}

	public void setContentType(String contentType) {
		this.contentType = contentType;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getExtension() {
		return extension;
	}

	public void setExtension(String extension) {
		this.extension = extension;
	}

	public byte[] getFile() {
		return file;
	}

	public void setFile(byte[] file) {
		this.file = file;
	}

	public ProjectTaskDTO getProjectTask() {
		return projectTask;
	}

	public void setProjectTask(ProjectTaskDTO projectTask) {
		this.projectTask = projectTask;
	}

}
