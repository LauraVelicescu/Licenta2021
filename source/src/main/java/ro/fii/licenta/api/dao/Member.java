package ro.fii.licenta.api.dao;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import ro.fii.licenta.framework.PersistableEntity;

@Entity
@Table(name = "member")
public class Member extends PersistableEntity {

	private static final long serialVersionUID = 1L;

	private User user;

	private Ngo ngo;
	
	private NgoFunction function;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ngo_id")
	public Ngo getNgo() {
		return ngo;
	}

	public void setNgo(Ngo ngo) {
		this.ngo = ngo;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "function_id")
	public NgoFunction getFunction() {
		return function;
	}

	public void setFunction(NgoFunction function) {
		this.function = function;
	}

	
}
