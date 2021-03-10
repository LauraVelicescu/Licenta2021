package ro.fii.licenta.framework;

import javax.persistence.Column;

public abstract class NameDescriptionEntity extends PersistableEntity {

    private static final long serialVersionUID = 1L;


    private String name;


    private String description;

    public String getName() {
        return name;
    }

    @Column(name = "name")
    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}

