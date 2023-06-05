package ro.fii.licenta.api.dao;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import ro.fii.licenta.framework.NameDescriptionEntity;

@Entity
@Table(name = "task_history")
public class TaskHistory extends NameDescriptionEntity {

	private static final long serialVersionUID = 1L;

	private TaskStatus previousStatus;

	private TaskStatus currentStatus;

	private ProjectMember projectMember;
	
	private ProjectTask projectTask;

	private Date date;

	@Column(name = "previous_status")
	public TaskStatus getPreviousStatus() {
		return previousStatus;
	}

	public void setPreviousStatus(TaskStatus previousStatus) {
		this.previousStatus = previousStatus;
	}

	@Column(name = "current_status")
	public TaskStatus getCurrentStatus() {
		return currentStatus;
	}

	public void setCurrentStatus(TaskStatus currentStatus) {
		this.currentStatus = currentStatus;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "project_member_id")
	public ProjectMember getProjectMember() {
		return projectMember;
	}

	public void setProjectMember(ProjectMember projectMember) {
		this.projectMember = projectMember;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "project_task_id")
	public ProjectTask getProjectTask() {
		return projectTask;
	}

	public void setProjectTask(ProjectTask projectTask) {
		this.projectTask = projectTask;
	}

	@Column(name = "date")
	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

}
