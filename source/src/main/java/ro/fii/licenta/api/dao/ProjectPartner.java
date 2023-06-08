package ro.fii.licenta.api.dao;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import ro.fii.licenta.framework.NameDescriptionEntity;

@Entity
@Table(name = "project_partner")
public class ProjectPartner extends NameDescriptionEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Project project;
	private Partner partner;
	private NgoPartnersType partnersType;
	private Double amount;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "project_id")
	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "partner_id")
	public Partner getPartner() {
		return partner;
	}

	public void setPartner(Partner partner) {
		this.partner = partner;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "partener_type_id")
	public NgoPartnersType getPartnersType() {
		return partnersType;
	}

	public void setPartnersType(NgoPartnersType partnersType) {
		this.partnersType = partnersType;
	}

	@Column(name = "amount")
	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

}
