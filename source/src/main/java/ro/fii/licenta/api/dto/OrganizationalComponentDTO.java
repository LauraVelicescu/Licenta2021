package ro.fii.licenta.api.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;

public class OrganizationalComponentDTO {

    private Long id;

    private String name;

    private String description;

    private boolean lead;

    @JsonBackReference
    private NgoDTO parentNgo;

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

    public boolean isLead() {
        return lead;
    }

    public void setLead(boolean lead) {
        this.lead = lead;
    }

    public NgoDTO getParentNgo() {
        return parentNgo;
    }

    public void setParentNgo(NgoDTO parentNgo) {
        this.parentNgo = parentNgo;
    }

}
