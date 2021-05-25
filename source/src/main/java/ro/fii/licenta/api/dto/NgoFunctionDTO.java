package ro.fii.licenta.api.dto;

import ro.fii.licenta.api.dao.Ngo;

public class NgoFunctionDTO {
	
	private Long id;
	
	private String name;

	private String description;
	
	private NgoDTO ngoDTO;

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

	public NgoDTO getNgoDTO() {
		return ngoDTO;
	}

	public void setNgoDTO(NgoDTO ngoDTO) {
		this.ngoDTO = ngoDTO;
	}
	
	


}
