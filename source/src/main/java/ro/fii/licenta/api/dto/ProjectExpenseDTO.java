package ro.fii.licenta.api.dto;

import java.util.Date;

import ro.fii.licenta.api.dao.ProjectExpenseType;

public class ProjectExpenseDTO {

	private Long id;
	private String name;
	private String description;
	private ProjectDTO project;
	private ProjectTaskDTO task;
	private Double amount;
	private ProjectExpenseType projectExpenseType;
	private ProjectMemberDTO expenseOwner;
	// 0 none
	// 1 accepted
	// 2 rejected
	private int status;
	private Date date;
	private String fileName;
	private String fileExtension;
	private String contentType;

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

	public ProjectDTO getProject() {
		return project;
	}

	public void setProject(ProjectDTO project) {
		this.project = project;
	}

	public ProjectTaskDTO getTask() {
		return task;
	}

	public void setTask(ProjectTaskDTO task) {
		this.task = task;
	}

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

	public ProjectMemberDTO getExpenseOwner() {
		return expenseOwner;
	}

	public void setExpenseOwner(ProjectMemberDTO expenseOwner) {
		this.expenseOwner = expenseOwner;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFileExtension() {
		return fileExtension;
	}

	public void setFileExtension(String fileExtension) {
		this.fileExtension = fileExtension;
	}

	public String getContentType() {
		return contentType;
	}

	public void setContentType(String contentType) {
		this.contentType = contentType;
	}

}
