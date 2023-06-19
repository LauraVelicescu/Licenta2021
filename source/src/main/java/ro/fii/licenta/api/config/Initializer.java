package ro.fii.licenta.api.config;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import ro.fii.licenta.api.dao.Role;
import ro.fii.licenta.api.dao.User;
import ro.fii.licenta.api.dao.UserRole;
import ro.fii.licenta.api.repository.RoleRepository;
import ro.fii.licenta.api.repository.UserRepository;
import ro.fii.licenta.api.repository.UserRoleRepoistory;

@Component
public class Initializer {

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	UserRoleRepoistory userRoleRepoistory;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@EventListener(ApplicationReadyEvent.class)
	public void initializeDB() {
		createRolesIfDoesNotExist();
		createAdminIfDoesNotExist();
	}

	private void createAdminIfDoesNotExist() {

		User user = this.userRepository.findByEmailAddress("mangongoadm@gmail.com");
		if (user == null) {
			user = new User();
			user.setEmailAddress("mangongoadm@gmail.com");
			user.setFirstName("Web App");
			user.setLastName("Admin");
			user.setCreatedDate(new Date());
			user.setPassword(passwordEncoder.encode("admin"));
			user.setAboutMe("Default administrator account.");
			this.userRepository.save(user);

		}
		UserRole userRole = this.userRoleRepoistory.findByUser_IdAndRole_IdAndNgo_Id(user.getId(),
				this.roleRepository.findByName("ADMIN").getId(), null);

		if (userRole == null) {
			userRole = new UserRole();
			userRole.setRole(this.roleRepository.findByName("ADMIN"));
			userRole.setUser(user);
			this.userRoleRepoistory.save(userRole);
		}
	}

	private void createRolesIfDoesNotExist() {
		createRoleIfDoesNotExists("ADMIN", "Administrate the application", false);
		createRoleIfDoesNotExists("NGO_ADMIN", "Can administrate NGOs", false);
		createRoleIfDoesNotExists("REPORTS", "Can issue reports for a project", true);
		createRoleIfDoesNotExists("ACTIVE_MEMBER", "Can access the projects board", true);
	}

	private void createRoleIfDoesNotExists(String name, String description, boolean ngoEligible) {

		Role role = this.roleRepository.findByName(name);
		if (role == null) {
			role = new Role();
			role.setName(name);
			role.setDescription(description);
			role.setNgoEligible(ngoEligible);
			this.roleRepository.save(role);
		}

	}
}
