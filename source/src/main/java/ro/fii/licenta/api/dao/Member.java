package ro.fii.licenta.api.dao;

import javax.persistence.*;

import ro.fii.licenta.framework.PersistableEntity;

import java.util.List;

@Entity
@Table(name = "member")
public class Member extends PersistableEntity {

	private static final long serialVersionUID = 1L;

	private User user;

	private Ngo ngo;

	private OrganizationalComponent organizationalComponent;

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


	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "organizational_component_id")
	public OrganizationalComponent getOrganizationalComponent() {
		return organizationalComponent;
	}

	public void setOrganizationalComponent(OrganizationalComponent organizationalComponent) {
		this.organizationalComponent = organizationalComponent;
	}
}
