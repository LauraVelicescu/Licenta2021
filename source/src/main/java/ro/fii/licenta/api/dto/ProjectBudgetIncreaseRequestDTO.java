package ro.fii.licenta.api.dto;

import ro.fii.licenta.api.dao.ProjectBudgetIncreaseRequestStatus;

public class ProjectBudgetIncreaseRequestDTO {

	private Long id;
	private String name;
	private String description;
	private Double amount;
	private ProjectMemberDTO requestOwner;
	private String motivation;
	private ProjectBudgetIncreaseRequestStatus status;
	private ProjectDTO projectDTO;

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

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public ProjectMemberDTO getRequestOwner() {
		return requestOwner;
	}

	public void setRequestOwner(ProjectMemberDTO requestOwner) {
		this.requestOwner = requestOwner;
	}

	public String getMotivation() {
		return motivation;
	}

	public void setMotivation(String motivation) {
		this.motivation = motivation;
	}

	public ProjectBudgetIncreaseRequestStatus getStatus() {
		return status;
	}

	public void setStatus(ProjectBudgetIncreaseRequestStatus status) {
		this.status = status;
	}

	public ProjectDTO getProjectDTO() {
		return projectDTO;
	}

	public void setProjectDTO(ProjectDTO projectDTO) {
		this.projectDTO = projectDTO;
	}
}
