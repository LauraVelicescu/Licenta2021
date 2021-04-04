package ro.fii.licenta.api.dto;

import java.util.Date;

import ro.fii.licenta.framework.PersistableEntity;

public class UserDTO {

	protected Long id;

	protected String emailAddress;

	protected String password;

	protected String firstName;
	
	protected String lastName;
	
	protected Date birthDay;

	protected boolean blocked;

	protected int failAttemtps;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmailAddress() {
		return emailAddress;
	}

	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Date getBirthDay() {
		return birthDay;
	}

	public void setBirthDay(Date birthDay) {
		this.birthDay = birthDay;
	}

	public boolean isBlocked() {
		return blocked;
	}

	public void setBlocked(boolean blocked) {
		this.blocked = blocked;
	}

	public int getFailAttemtps() {
		return failAttemtps;
	}

	public void setFailAttemtps(int failAttemtps) {
		this.failAttemtps = failAttemtps;
	}

}
