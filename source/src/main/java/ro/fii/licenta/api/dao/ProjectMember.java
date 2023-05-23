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
@Table(name = "project_member")
public class ProjectMember extends NameDescriptionEntity {


    private static final long serialVersionUID = 1L;

    private Project project;
    
    private Member member;
    
    private ProjectPosition projectPosition;
    
    private Date since;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
	public Member getMember() {
		return member;
	}


	public void setMember(Member member) {
		this.member = member;
	}


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_position_id")
	public ProjectPosition getProjectPosition() {
		return projectPosition;
	}

	public void setProjectPosition(ProjectPosition projectPosition) {
		this.projectPosition = projectPosition;
	}

	@Column(name = "since")
	public Date getSince() {
		return since;
	}

	public void setSince(Date since) {
		this.since = since;
	}
    
}
