package ro.fii.licenta.api.dto;

import java.util.Date;

import ro.fii.licenta.api.dao.TaskStatus;

public class ProjectTaskDTO {

	private Long id;

	private String name;

	private String description;

	private ProjectMemberDTO projectMember;

	private ProjectDTO project;

	private TaskStatus taskStatus;

	private Date createdDate;

	private Date deadline;

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

	public ProjectMemberDTO getProjectMember() {
		return projectMember;
	}

	public void setProjectMember(ProjectMemberDTO projectMember) {
		this.projectMember = projectMember;
	}

	public ProjectDTO getProject() {
		return project;
	}

	public void setProject(ProjectDTO project) {
		this.project = project;
	}

	public TaskStatus getTaskStatus() {
		return taskStatus;
	}

	public void setTaskStatus(TaskStatus taskStatus) {
		this.taskStatus = taskStatus;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Date getDeadline() {
		return deadline;
	}

	public void setDeadline(Date deadline) {
		this.deadline = deadline;
	}

}
