package ro.fii.licenta.api.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Date;

public class ProjectMemberDTO {

	private Long id;

	private String description;

	@JsonIgnore
	private ProjectDTO project;

	private MemberDTO member;

	private ProjectPositionDTO projectPosition;

	private Date since;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public MemberDTO getMember() {
		return member;
	}

	public void setMember(MemberDTO member) {
		this.member = member;
	}

	public ProjectPositionDTO getProjectPosition() {
		return projectPosition;
	}

	public void setProjectPosition(ProjectPositionDTO projectPosition) {
		this.projectPosition = projectPosition;
	}

	public Date getSince() {
		return since;
	}

	public void setSince(Date since) {
		this.since = since;
	}

}
