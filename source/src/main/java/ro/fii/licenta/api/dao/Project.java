package ro.fii.licenta.api.dao;

import java.util.ArrayList;
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

import com.fasterxml.jackson.annotation.JsonManagedReference;

import ro.fii.licenta.framework.NameDescriptionEntity;

@Entity
@Table(name = "project")
public class Project extends NameDescriptionEntity {

	private static final long serialVersionUID = 1L;

	private Date startDate;

	private Date endDate;

	private NgoYear ngoYear;

	private String facebookLink;

	private String twitterLink;

	private String linkedinLink;

	private byte[] logo;

	private Double budgetTreasury;

	private Double budgetPartners;

	@JsonManagedReference
	private List<ProjectPartner> projectPartners = new ArrayList<>();

	@JsonManagedReference
	private List<ProjectTask> projectTasks = new ArrayList<>();

	@JsonManagedReference
	private List<ProjectMember> projectMembers = new ArrayList<>();

	@JsonManagedReference
	private List<ProjectPosition> projectPositions = new ArrayList<>();

	private List<ProjectExpense> projectExpenses = new ArrayList<>();

	private Double remainingBudget;

	@Column(name = "start_date")
	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	@Column(name = "end_date")
	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	@Column(name = "facebook_link")
	public String getFacebookLink() {
		return facebookLink;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ngo_year_id")
	public NgoYear getNgoYear() {
		return ngoYear;
	}

	public void setNgoYear(NgoYear ngoYear) {
		this.ngoYear = ngoYear;
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
	@Column(name = "picture")
	public byte[] getLogo() {
		return logo;
	}

	public void setLogo(byte[] logo) {
		this.logo = logo;
	}

	@Column(name = "budget_treasury")
	public Double getBudgetTreasury() {
		return budgetTreasury;
	}

	public void setBudgetTreasury(Double budgetTreasury) {
		this.budgetTreasury = budgetTreasury;
	}

	@Column(name = "budget_partners")
	public Double getBudgetPartners() {
		return budgetPartners;
	}

	public void setBudgetPartners(Double budgetPartners) {
		this.budgetPartners = budgetPartners;
	}

	@OneToMany(mappedBy = "project", cascade = CascadeType.REMOVE, orphanRemoval = true)
	public List<ProjectPartner> getProjectPartners() {
		return projectPartners;
	}

	public void setProjectPartners(List<ProjectPartner> projectPartners) {
		this.projectPartners = projectPartners;
	}

	@OneToMany(mappedBy = "project", cascade = CascadeType.REMOVE, orphanRemoval = true)
	public List<ProjectTask> getProjectTasks() {
		return projectTasks;
	}

	public void setProjectTasks(List<ProjectTask> projectTasks) {
		this.projectTasks = projectTasks;
	}

	@OneToMany(mappedBy = "project", cascade = CascadeType.REMOVE, orphanRemoval = true)
	public List<ProjectMember> getProjectMembers() {
		return projectMembers;
	}

	public void setProjectMembers(List<ProjectMember> projectMembers) {
		this.projectMembers = projectMembers;
	}

	@OneToMany(mappedBy = "project", cascade = CascadeType.REMOVE, orphanRemoval = true)
	public List<ProjectPosition> getProjectPositions() {
		return projectPositions;
	}

	public void setProjectPositions(List<ProjectPosition> projectPositions) {
		this.projectPositions = projectPositions;
	}

	@Column(name = "remaining_budget")
	public Double getRemainingBudget() {
		return remainingBudget;
	}

	public void setRemainingBudget(Double remainingBudget) {
		this.remainingBudget = remainingBudget;
	}

	@OneToMany(mappedBy = "project", cascade = CascadeType.REMOVE, orphanRemoval = true)
	public List<ProjectExpense> getProjectExpenses() {
		return projectExpenses;
	}

	public void setProjectExpenses(List<ProjectExpense> projectExpenses) {
		this.projectExpenses = projectExpenses;
	}

}
