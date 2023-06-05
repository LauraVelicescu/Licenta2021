package ro.fii.licenta.api.dto;

public class UserRoleDTO {

	private Long id;
	private UserDTO user;
	private RoleDTO role;
	private NgoDTO ngo;

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

	public RoleDTO getRole() {
		return role;
	}

	public void setRole(RoleDTO role) {
		this.role = role;
	}

	public NgoDTO getNgo() {
		return ngo;
	}

	public void setNgo(NgoDTO ngo) {
		this.ngo = ngo;
	}

}
