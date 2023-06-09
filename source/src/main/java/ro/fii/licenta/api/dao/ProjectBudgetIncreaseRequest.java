package ro.fii.licenta.api.dao;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import ro.fii.licenta.framework.NameDescriptionEntity;

@Entity
@Table(name = "project_budget_increase_request")
public class ProjectBudgetIncreaseRequest extends NameDescriptionEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Double amount;
	private ProjectMember requestOwner;
	private String motivation;
	private ProjectBudgetIncreaseRequestStatus status;
	private Project project;

	@Column(name = "amount")
	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "project_member_id")
	public ProjectMember getRequestOwner() {
		return requestOwner;
	}

	public void setRequestOwner(ProjectMember requestOwner) {
		this.requestOwner = requestOwner;
	}

	@Column(name = "motivation")
	public String getMotivation() {
		return motivation;
	}

	public void setMotivation(String motivation) {
		this.motivation = motivation;
	}

	@Column(name = "status")
	public ProjectBudgetIncreaseRequestStatus getStatus() {
		return status;
	}

	public void setStatus(ProjectBudgetIncreaseRequestStatus status) {
		this.status = status;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "project_id")
	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}
	
	
}