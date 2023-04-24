package ro.fii.licenta.api.dto;

import com.fasterxml.jackson.annotation.*;

import java.util.Date;
import java.util.List;

public class NgoDTO {
	
	private Long id;

    private String name;
    
    private String acronym;
    
    private Date foundingDate;

	private String description;
    
    private String facebookLink;
    
    private String twitterLink;
    
    private String linkedinLink;
    
    private byte[] logo;

	@JsonManagedReference
	private List<OrganizationalComponentDTO> componentList;

	@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
	@JsonIdentityReference(alwaysAsId = true)
	private UserDTO admin;

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

	public String getAcronym() {
		return acronym;
	}

	public void setAcronym(String acronym) {
		this.acronym = acronym;
	}

	public Date getFoundingDate() {
		return foundingDate;
	}

	public void setFoundingDate(Date foundingDate) {
		this.foundingDate = foundingDate;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getFacebookLink() {
		return facebookLink;
	}

	public void setFacebookLink(String facebookLink) {
		this.facebookLink = facebookLink;
	}

	public String getTwitterLink() {
		return twitterLink;
	}

	public void setTwitterLink(String twitterLink) {
		this.twitterLink = twitterLink;
	}

	public String getLinkedinLink() {
		return linkedinLink;
	}

	public void setLinkedinLink(String linkedinLink) {
		this.linkedinLink = linkedinLink;
	}

	public byte[] getLogo() {
		return logo;
	}

	public void setLogo(byte[] logo) {
		this.logo = logo;
	}

	public List<OrganizationalComponentDTO> getComponentList() {
		return componentList;
	}

	public void setComponentList(List<OrganizationalComponentDTO> componentList) {
		this.componentList = componentList;
	}

	public UserDTO getAdmin() {
		return admin;
	}

	public void setAdmin(UserDTO admin) {
		this.admin = admin;
	}
}
