package ro.fii.licenta.api.dao;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import ro.fii.licenta.framework.NameDescriptionEntity;

@Entity
@Table(name = "role")
public class Role extends NameDescriptionEntity {

	private static final long serialVersionUID = 1L;

	private boolean ngoEligible;

	@Column(name = "ngo_eligible")
	public boolean isNgoEligible() {
		return ngoEligible;
	}

	public void setNgoEligible(boolean ngoEligible) {
		this.ngoEligible = ngoEligible;
	}

}
