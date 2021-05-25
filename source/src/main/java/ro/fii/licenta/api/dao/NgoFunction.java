package ro.fii.licenta.api.dao;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import ro.fii.licenta.framework.NameDescriptionEntity;
import ro.fii.licenta.framework.PersistableEntity;

@Entity
@Table(name = "ngo_function")
public class NgoFunction extends NameDescriptionEntity {

	private static final long serialVersionUID = 1L;

	private Ngo ngo;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ngo_id")
	public Ngo getNgo() {
		return ngo;
	}

	public void setNgo(Ngo ngo) {
		this.ngo = ngo;
	}

}
