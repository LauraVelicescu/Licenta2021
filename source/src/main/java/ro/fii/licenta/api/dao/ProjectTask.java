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
@Table(name = "project_task")
public class ProjectTask extends NameDescriptionEntity {

	private static final long serialVersionUID = 1L;

	private ProjectMember projectMember;

	private Project project;

	private TaskStatus taskStatus;

	private Date createdDate;

	private Date deadline;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "project_member_id")
	public ProjectMember getProjectMember() {
		return projectMember;
	}

	public void setProjectMember(ProjectMember projectMember) {
		this.projectMember = projectMember;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "project_id")
	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}

	@Column(name = "task_status")
	public TaskStatus getTaskStatus() {
		return taskStatus;
	}

	public void setTaskStatus(TaskStatus taskStatus) {
		this.taskStatus = taskStatus;
	}

	@Column(name = "created_date")
	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	@Column(name = "deadline")
	public Date getDeadline() {
		return deadline;
	}

	public void setDeadline(Date deadline) {
		this.deadline = deadline;
	}
}
