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
@Table(name = "task_attachment")
public class TaskAttachment extends NameDescriptionEntity {

	private static final long serialVersionUID = 1L;

	private ProjectTask projectTask;

	private byte[] file;

	private String fileExtension;

	private String contentType;

	@Column(name = "content_type")
	public String getContentType() {
		return contentType;
	}

	public void setContentType(String contentType) {
		this.contentType = contentType;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "project_task_id")
	public ProjectTask getProjectTask() {
		return projectTask;
	}

	public void setProjectTask(ProjectTask projectTask) {
		this.projectTask = projectTask;
	}

	@Lob
	@Column(name = "file")
	public byte[] getFile() {
		return file;
	}

	public void setFile(byte[] file) {
		this.file = file;
	}

	@Column(name = "file_extension")
	public String getFileExtension() {
		return fileExtension;
	}

	public void setFileExtension(String fileExtension) {
		this.fileExtension = fileExtension;
	}

}
