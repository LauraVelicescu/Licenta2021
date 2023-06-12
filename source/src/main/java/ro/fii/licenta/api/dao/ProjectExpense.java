package ro.fii.licenta.api.dao;

import java.util.Date;

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
	private String fileName;
	private String fileExtension;
	private String contentType;
	// 0 none
	// 1 accepted
	// 2 rejected
	private int status;

	private Date date;

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

	@Column(name = "created_date")
	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	@Column(name = "file_name")
	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	@Column(name = "file_extension")
	public String getFileExtension() {
		return fileExtension;
	}

	public void setFileExtension(String fileExtension) {
		this.fileExtension = fileExtension;
	}

	@Column(name = "content_type")
	public String getContentType() {
		return contentType;
	}

	public void setContentType(String contentType) {
		this.contentType = contentType;
	}

}
