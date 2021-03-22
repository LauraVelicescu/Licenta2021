package ro.fii.licenta.api.dao;

import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import ro.fii.licenta.framework.PersistableEntity;

@Entity
@Table(name = "user")
public class User extends PersistableEntity {

    private static final long serialVersionUID = 1L;
  
    private Long id;
    
    private String emailAddress;

    private String password;
    
    private String firstName;

    private String lastName;
    
    private Date birthDay;

    private boolean blocked;

    private int failAttemtps;

    private PersonType personType;

    @Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	private Set<Group> groups;


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
    public Date getBirthDay() {
		return birthDay;
	}
    
    public void setBirthDay(Date birthDay) {
		this.birthDay = birthDay;
	}

    @Column(name = "person_type")
    public PersonType getPersonType() {
        return personType;
    }

    public void setPersonType(PersonType personType) {
        this.personType = personType;
    }

    @ManyToMany
    @JoinTable(name = "user_group", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "group_id"))
    public Set<Group> getGroups() {
        return groups;
    }

    public void setGroups(Set<Group> groups) {
        this.groups = groups;
    }

	

	
}

