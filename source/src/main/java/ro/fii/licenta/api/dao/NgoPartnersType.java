package ro.fii.licenta.api.dao;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import ro.fii.licenta.framework.PersistableEntity;

@Entity
@Table(name = "ngo_partners_type")
public class NgoPartnersType extends PersistableEntity{

	private static final long serialVersionUID = 1L;
	private Double minAmount;
	private Double maxAmount;

	@Column(name = "min_amount")
	public Double getMinAmount() {
		return minAmount;
	}

	public void setMinAmount(Double minAmount) {
		this.minAmount = minAmount;
	}

	@Column(name = "max_amount")
	public Double getMaxAmount() {
		return maxAmount;
	}

	public void setMaxAmount(Double maxAmount) {
		this.maxAmount = maxAmount;
	}

}
