package ro.fii.licenta.api.dao;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import ro.fii.licenta.framework.NameDescriptionEntity;

@Entity
@Table(name = "project_expense")
public class ProjectExpense extends NameDescriptionEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Project project;
	private ProjectTask task;
	private Double amount;
	private ProjectExpenseType projectExpenseType;
	private ProjectMember expenseOwner;
	private byte[] documents;
	// 0 none
	// 1 accepted
	// 2 rejected
	private int status;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "project_id")
	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "task_id")
	public ProjectTask getTask() {
		return task;
	}

	public void setTask(ProjectTask task) {
		this.task = task;
	}

	@Column(name = "amount")
	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public ProjectExpenseType getProjectExpenseType() {
		return projectExpenseType;
	}

	public void setProjectExpenseType(ProjectExpenseType projectExpenseType) {
		this.projectExpenseType = projectExpenseType;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "project_member_id")
	public ProjectMember getExpenseOwner() {
		return expenseOwner;
	}

	public void setExpenseOwner(ProjectMember expenseOwner) {
		this.expenseOwner = expenseOwner;
	}

	@Lob
	@Column(name = "document")
	public byte[] getDocuments() {
		return documents;
	}

	public void setDocuments(byte[] documents) {
		this.documents = documents;
	}

	@Column(name = "status")
	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}
}
