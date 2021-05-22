package ro.fii.licenta.api.dto;

import ro.fii.licenta.api.dao.Ngo;
import ro.fii.licenta.api.dao.User;

public class MemberDTO {
	private Long id;

	private User user;

	private Ngo ngo;

	private String function;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Ngo getNgo() {
		return ngo;
	}

	public void setNgo(Ngo ngo) {
		this.ngo = ngo;
	}

	public String getFunction() {
		return function;
	}

	public void setFunction(String function) {
		this.function = function;
	}

	
}
