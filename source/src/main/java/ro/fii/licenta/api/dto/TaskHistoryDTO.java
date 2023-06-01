package ro.fii.licenta.api.dto;

import java.util.Date;

import ro.fii.licenta.api.dao.TaskStatus;

public class TaskHistoryDTO {

	private Long id;

	private String name;

	private String description;

	private TaskStatus previousStatus;

	private TaskStatus currentStatus;

	private ProjectMemberDTO projectMember;

	private ProjectTaskDTO projectTask;

	private Date date;

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

	public TaskStatus getPreviousStatus() {
		return previousStatus;
	}

	public void setPreviousStatus(TaskStatus previousStatus) {
		this.previousStatus = previousStatus;
	}

	public TaskStatus getCurrentStatus() {
		return currentStatus;
	}

	public void setCurrentStatus(TaskStatus currentStatus) {
		this.currentStatus = currentStatus;
	}

	public ProjectMemberDTO getProjectMember() {
		return projectMember;
	}

	public void setProjectMember(ProjectMemberDTO projectMember) {
		this.projectMember = projectMember;
	}

	public ProjectTaskDTO getProjectTask() {
		return projectTask;
	}

	public void setProjectTask(ProjectTaskDTO projectTask) {
		this.projectTask = projectTask;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

}
