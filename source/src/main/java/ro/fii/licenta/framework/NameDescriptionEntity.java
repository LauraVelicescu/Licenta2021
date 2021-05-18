package ro.fii.licenta.framework;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;


@MappedSuperclass
public abstract class NameDescriptionEntity extends PersistableEntity {

	private static final long serialVersionUID = 1L;
	
	public String name;

	protected String description;

	@Column(name = "name")
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "description")
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
}
