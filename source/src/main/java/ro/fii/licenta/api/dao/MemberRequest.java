package ro.fii.licenta.api.dao;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import ro.fii.licenta.framework.PersistableEntity;

@Entity
@Table(name ="member_request")
public class MemberRequest extends PersistableEntity{

	private static final long serialVersionUID = 1L; 

	private User user;
	
	private Ngo ngo;
	
	private String motivation;
	
	// 0 pending
	// 1 accepted
	// 2 declined
	private int status;

	@ManyToOne
	@JoinColumn(name = "user_id")
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@ManyToOne
	@JoinColumn(name = "ngo_id")
	public Ngo getNgo() {
		return ngo;
	}

	public void setNgo(Ngo ngo) {
		this.ngo = ngo;
	}

	@Column(name = "motivation")
	public String getMotivation() {
		return motivation;
	}

	public void setMotivation(String motivation) {
		this.motivation = motivation;
	}

	@Column(name = "status")
	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}
	
	
}
