package ro.fii.licenta.api.dto;

import java.util.Date;

public class NgoYearDTO {

	private Long id;
	private String name;
	private String description;
	private Date startDate;

	private Date endDate;

	private NgoDTO ngo;

	private Double treasury;

	private Double remainingTreasury;

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

	public NgoDTO getNgo() {
		return ngo;
	}

	public void setNgo(NgoDTO ngo) {
		this.ngo = ngo;
	}

	public Double getTreasury() {
		return treasury;
	}

	public void setTreasury(Double treasury) {
		this.treasury = treasury;
	}

	public Double getRemainingTreasury() {
		return remainingTreasury;
	}

	public void setRemainingTreasury(Double remainingTreasury) {
		this.remainingTreasury = remainingTreasury;
	}

}
