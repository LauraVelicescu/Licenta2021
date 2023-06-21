package ro.fii.licenta.api.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class ProjectPositionDTO {

    private Long id;
    private String name;
    private String description;
    @JsonIgnore
    private ProjectDTO project;

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
}
