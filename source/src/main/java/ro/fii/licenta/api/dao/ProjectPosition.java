package ro.fii.licenta.api.dao;

import ro.fii.licenta.framework.NameDescriptionEntity;

import javax.persistence.*;

@Entity
@Table(name = "project_position")
public class ProjectPosition extends NameDescriptionEntity {

    private static final long serialVersionUID = 1L;

    private Project project;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }
}
