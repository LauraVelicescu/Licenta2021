package ro.fii.licenta.api.dao;

import ro.fii.licenta.framework.NameDescriptionEntity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "project_position")
public class ProjectPosition extends NameDescriptionEntity {

    private static final long serialVersionUID = 1L;

    @JsonBackReference
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
