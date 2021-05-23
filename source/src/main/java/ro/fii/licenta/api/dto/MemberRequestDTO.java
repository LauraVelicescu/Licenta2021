package ro.fii.licenta.api.dto;

public class MemberRequestDTO {

	private Long id;

	private UserDTO user;

	private NgoDTO ngo;

	private String motivation;

	private int status;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public UserDTO getUser() {
		return user;
	}

	public void setUser(UserDTO user) {
		this.user = user;
	}

	public NgoDTO getNgo() {
		return ngo;
	}

	public void setNgo(NgoDTO ngo) {
		this.ngo = ngo;
	}

	public String getMotivation() {
		return motivation;
	}

	public void setMotivation(String motivation) {
		this.motivation = motivation;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

}
