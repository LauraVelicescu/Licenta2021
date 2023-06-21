package ro.fii.licenta.api.dao;

import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import ro.fii.licenta.framework.PersistableEntity;

@Entity
@Table(name = "user")
public class User extends PersistableEntity {

	private static final long serialVersionUID = 1L;

	private String emailAddress;

	private String password;

	private String firstName;

	private String lastName;
	
	private Date createdDate;

	private Date birthday;

	private String aboutMe;

	private String facebookLink;

	private String twitterLink;

	private String linkedinLink;

	private byte[] profilePicture;

	private boolean blocked;

	private int failAttemtps;
	
	private Set<Role> roles;

	private PersonType personType;
	
	@JsonManagedReference
	private List<Ngo> administeredNGOs;

	private List<MemberRequest> memberRequests;

	private List<Member> member;

	@Column(name = "password")
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Column(name = "blocked")
	public boolean isBlocked() {
		return blocked;
	}

	public void setBlocked(boolean blocked) {
		this.blocked = blocked;
	}

	@Column(name = "fail_attempts")
	public int getFailAttemtps() {
		return failAttemtps;
	}

	public void setFailAttemtps(int failAttemtps) {
		this.failAttemtps = failAttemtps;
	}

	@Column(name = "first_name")
	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	@Column(name = "last_name")
	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	@Column(name = "email_address")
	public String getEmailAddress() {
		return emailAddress;
	}

	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
	}

	@Column(name = "birthday")
	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	@Column(name = "about_me")
	public String getAboutMe() {
		return aboutMe;
	}

	public void setAboutMe(String aboutMe) {
		this.aboutMe = aboutMe;
	}

	@Column(name = "facebook_link")
	public String getFacebookLink() {
		return facebookLink;
	}

	public void setFacebookLink(String facebookLink) {
		this.facebookLink = facebookLink;
	}

	@Column(name = "twitter_link")
	public String getTwitterLink() {
		return twitterLink;
	}

	public void setTwitterLink(String twitterLink) {
		this.twitterLink = twitterLink;
	}

	@Column(name = "linkedin_link")
	public String getLinkedinLink() {
		return linkedinLink;
	}

	public void setLinkedinLink(String linkedinLink) {
		this.linkedinLink = linkedinLink;
	}

	@Lob
	@Column(name = "profile_picture")
	public byte[] getProfilePicture() {
		return profilePicture;
	}

	public void setProfilePicture(byte[] profilePicture) {
		this.profilePicture = profilePicture;
	}

	@Column(name = "person_type")
	public PersonType getPersonType() {
		return personType;
	}

	public void setPersonType(PersonType personType) {
		this.personType = personType;
	}
	
	@ManyToMany
	@JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	@OneToMany(mappedBy = "admin")
	public List<Ngo> getAdministeredNGOs() {
		return administeredNGOs;
	}

	public void setAdministeredNGOs(List<Ngo> administeredNGOs) {
		this.administeredNGOs = administeredNGOs;
	}

	@Column(name = "created_date")
	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	@OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
	public List<MemberRequest> getMemberRequests() {
		return memberRequests;
	}

	public void setMemberRequests(List<MemberRequest> memberRequests) {
		this.memberRequests = memberRequests;
	}
	@OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
	public List<Member> getMember() {
		return member;
	}

	public void setMember(List<Member> member) {
		this.member = member;
	}
}
