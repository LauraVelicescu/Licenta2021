package ro.fii.licenta.api.dto;

public class MemberDTO {
	private Long id;

	private UserDTO user;

	private NgoDTO ngo;

	private NgoFunctionDTO function;

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

	public NgoFunctionDTO getFunction() {
		return function;
	}

	public void setFunction(NgoFunctionDTO function) {
		this.function = function;
	}

	
}
