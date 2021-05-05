package ro.fii.licenta.api.dao;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.util.List;

@Entity
@Table(name = "ngo")
public class NGO {
	
	private static final long serialVersionUID = 1L;
	  
    private Long id;

    private String name;
    
    private String acronym;
    
    private Date foundingDate;

	private String description;
    
    private String facebookLink;
    
    private String twitterLink;
    
    private String linkedinLink;
    
    private byte[] logo;

    private List<User> admins;

    @Id
   	@Column(name = "id")
   	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Column(name = "name")
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	@Column(name = "acronym")
	public String getAcronym() {
		return acronym;
	}

	public void setAcronym(String acronym) {
		this.acronym = acronym;
	}

	@Column(name = "founding_date")
	public Date getFoundingDate() {
		return foundingDate;
	}

	public void setFoundingDate(Date foundingDate) {
		this.foundingDate = foundingDate;
	}

	@Column(name = "description")
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	@Column(name = "facebook_link")
	public String getFacebookLink() {
		return facebookLink;
	}

	public void setFacebookLink(String facebookLink) {
		this.facebookLink = facebookLink;
	}

	@Column(name = "twitter_link")
	public String getTwitterLink() {
		return twitterLink;
	}

	public void setTwitterLink(String twitterLink) {
		this.twitterLink = twitterLink;
	}

	@Column(name = "linkedin_link")
	public String getLinkedinLink() {
		return linkedinLink;
	}

	public void setLinkedinLink(String linkedinLink) {
		this.linkedinLink = linkedinLink;
	}
	@Lob
	@Column(name = "logo")
	public byte[] getLogo() {
		return logo;
	}

	public void setLogo(byte[] logo) {
		this.logo = logo;
	}
	
	
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(name = "ngo_admin", joinColumns = @JoinColumn(name = "ngo_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
	public List<User> getAdmins() {
		return admins;
	}

	public void setAdmins(List<User> admins) {
		this.admins = admins;
	}
    
    

}
