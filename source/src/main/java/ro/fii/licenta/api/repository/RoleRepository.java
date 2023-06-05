package ro.fii.licenta.api.repository;

import ro.fii.licenta.api.dao.Role;
import ro.fii.licenta.framework.PersistableEntityRepository;

public interface RoleRepository extends PersistableEntityRepository<Role, Long>{

	Role findByName(String name);
}
