package ro.fii.licenta.framework;

import org.springframework.beans.factory.annotation.Autowired;

import ro.fii.licenta.api.dao.Role;
import ro.fii.licenta.api.repository.RoleRepository;

@InitializerClass(order = 1)
public class RoleInitializer implements Initializer {

	@Autowired
	RoleRepository roleRepository;
	
	@Override
	public void initialize() {
		Role role = new Role();
		role.setName("rol1");
		roleRepository.save(role);
	}

}
