package ro.fii.licenta.api.dto;

import java.util.List;

public class EmailPayloadDTO {

	private List<UserDTO> users;
	
	private String subject;
	
	private String body;

	public List<UserDTO> getUsers() {
		return users;
	}

	public void setUsers(List<UserDTO> users) {
		this.users = users;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}
	
	
}
