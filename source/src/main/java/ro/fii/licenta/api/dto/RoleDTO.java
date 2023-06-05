package ro.fii.licenta.api.dto;

public class RoleDTO {

	private Long id;

	private String name;

	private String description;

	private boolean ngoEligible;

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

	public boolean isNgoEligible() {
		return ngoEligible;
	}

	public void setNgoEligible(boolean ngoEligible) {
		this.ngoEligible = ngoEligible;
	}

}
