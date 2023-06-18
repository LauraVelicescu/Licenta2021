package ro.fii.licenta.api.dao;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.ColumnDefault;
import ro.fii.licenta.framework.NameDescriptionEntity;

@Entity
@Table(name = "ngo_partners_type")
public class NgoPartnersType extends NameDescriptionEntity {

	private static final long serialVersionUID = 1L;
	private Double minAmount;
	private Double maxAmount;
	private Ngo ngo;

	@Column(name = "min_amount")
	@ColumnDefault(value = "0")
	public Double getMinAmount() {
		return minAmount;
	}

	public void setMinAmount(Double minAmount) {
		this.minAmount = minAmount;
	}

	@Column(name = "max_amount")
	@ColumnDefault(value = "0")
	public Double getMaxAmount() {
		return maxAmount;
	}

	public void setMaxAmount(Double maxAmount) {
		this.maxAmount = maxAmount;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ngo_id")
	public Ngo getNgo() {
		return ngo;
	}

	public void setNgo(Ngo ngo) {
		this.ngo = ngo;
	}

}
