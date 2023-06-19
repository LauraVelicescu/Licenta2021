package ro.fii.licenta.api.dao;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import ro.fii.licenta.framework.NameDescriptionEntity;

@Entity
@Table(name = "ngo")
public class Ngo extends NameDescriptionEntity {

	private static final long serialVersionUID = 1L;

	private String acronym;

	private Date foundingDate;
	
	private Date createdDate;

	private String facebookLink;

	private String twitterLink;

	private String linkedinLink;

	private byte[] logo;

	@JsonBackReference
	private User admin;

	@JsonManagedReference
	private List<OrganizationalComponent> componentList;

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
	
	@Column(name = "created_date")
	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
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

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	public User getAdmin() {
		return admin;
	}

	public void setAdmin(User admin) {
		this.admin = admin;
	}

	@OneToMany(mappedBy = "parentNgo", cascade = CascadeType.ALL, orphanRemoval = true)
	public List<OrganizationalComponent> getComponentList() {
		return componentList;
	}

	public void setComponentList(List<OrganizationalComponent> componentList) {
//		if (this.componentList != null) {
//			this.componentList.clear();
//			this.componentList.addAll(componentList);
//		} else {
			this.componentList = componentList;
//		}
	}
}
