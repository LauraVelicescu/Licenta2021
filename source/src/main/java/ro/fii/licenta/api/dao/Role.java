package ro.fii.licenta.api.dao;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import ro.fii.licenta.framework.NameDescriptionEntity;

@Entity
@Table(name = "role")
public class Role extends NameDescriptionEntity {

	private static final long serialVersionUID = 1L;

	private boolean valid;

	private Set<Group> groups;

	@Column(name = "valid")
	public boolean isValid() {
		return valid;
	}

	public void setValid(boolean valid) {
		this.valid = valid;
	}

	@ManyToMany
	@JoinTable(name = "group_role", joinColumns = @JoinColumn(name = "role_id"), inverseJoinColumns = @JoinColumn(name = "group_id"))
	public Set<Group> getGroups() {
		return groups;
	}

	public void setGroups(Set<Group> groups) {
		this.groups = groups;
	}

}
