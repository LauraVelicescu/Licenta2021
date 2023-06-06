package ro.fii.licenta.api.dto;

public class ProjectPartnerDTO {

	private Long id;
	private ProjectDTO project;
	private PartnerDTO partner;
	private NgoPartnersTypeDTO partnersType;
	private Double amount;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public ProjectDTO getProject() {
		return project;
	}

	public void setProject(ProjectDTO project) {
		this.project = project;
	}

	public PartnerDTO getPartner() {
		return partner;
	}

	public void setPartner(PartnerDTO partner) {
		this.partner = partner;
	}

	public NgoPartnersTypeDTO getPartnersType() {
		return partnersType;
	}

	public void setPartnersType(NgoPartnersTypeDTO partnersType) {
		this.partnersType = partnersType;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

}
