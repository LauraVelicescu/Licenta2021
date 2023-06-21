package ro.fii.licenta.api.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.zip.DataFormatException;
import java.util.zip.Inflater;

public class ProjectDTO {

	private Long id;

	private String name;

	private String description;

	private Date startDate;

	private Date endDate;

	private NgoYearDTO ngoYear;

	private String facebookLink;

	private String twitterLink;

	private String linkedinLink;

	private Double budgetTreasury;

	private Double budgetPartners;

	private Double remainingBudget;

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

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public NgoYearDTO getNgoYear() {
		return ngoYear;
	}

	public void setNgoYear(NgoYearDTO ngoYear) {
		this.ngoYear = ngoYear;
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


	public Double getBudgetTreasury() {
		return budgetTreasury;
	}

	public void setBudgetTreasury(Double budgetTreasury) {
		this.budgetTreasury = budgetTreasury;
	}

	public Double getBudgetPartners() {
		return budgetPartners;
	}

	public void setBudgetPartners(Double budgetPartners) {
		this.budgetPartners = budgetPartners;
	}

	public Double getRemainingBudget() {
		return remainingBudget;
	}

	public void setRemainingBudget(Double remainingBudget) {
		this.remainingBudget = remainingBudget;
	}
}
