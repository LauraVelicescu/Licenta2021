package ro.fii.licenta.api.dao;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import ro.fii.licenta.framework.NameDescriptionEntity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "ngo")
public class Ngo extends NameDescriptionEntity {

    private static final long serialVersionUID = 1L;

    private String acronym;

    private Date foundingDate;

    private String description;

    private String facebookLink;

    private String twitterLink;

    private String linkedinLink;

    private byte[] logo;
    @JsonBackReference
    private User admin;
    @JsonManagedReference
    private List<OrganizationalComponent> componentList = new ArrayList<>();

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    public User getAdmin() {
        return admin;
    }

    public void setAdmin(User admin) {
        this.admin = admin;
    }

	@OneToMany(mappedBy = "parentNgo", cascade = CascadeType.PERSIST, orphanRemoval = true)
    public List<OrganizationalComponent> getComponentList() {
        return componentList;
    }

    public void setComponentList(List<OrganizationalComponent> componentList) {
        this.componentList = componentList;
    }
}
