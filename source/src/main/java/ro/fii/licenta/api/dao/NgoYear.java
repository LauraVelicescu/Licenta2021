package ro.fii.licenta.api.dao;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import ro.fii.licenta.framework.NameDescriptionEntity;

@Entity
@Table(name = "ngo_year")
public class NgoYear extends NameDescriptionEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private Date startDate;

	private Date endDate;

	private Ngo ngo;

	private Double treasury;

	private Double remainingTreasury;

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

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ngo_id")
	public Ngo getNgo() {
		return ngo;
	}

	public void setNgo(Ngo ngo) {
		this.ngo = ngo;
	}

	@Column(name = "treasury")
	public Double getTreasury() {
		return treasury;
	}

	public void setTreasury(Double treasury) {
		this.treasury = treasury;
	}

	@Column(name = "remaining_treasury")
	public Double getRemainingTreasury() {
		return remainingTreasury;
	}

	public void setRemainingTreasury(Double remainingTreasury) {
		this.remainingTreasury = remainingTreasury;
	}

}
