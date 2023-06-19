package ro.fii.licenta.api.repository;

import java.util.List;

import ro.fii.licenta.api.dao.UserRole;
import ro.fii.licenta.framework.PersistableEntityRepository;

public interface UserRoleRepoistory extends PersistableEntityRepository<UserRole, Long> {

	UserRole findByUser_IdAndRole_IdAndNgo_Id(Long userId, Long role_Id, Long ngo_Id);
	
	List<UserRole> findByRole_Id(Long roleId);
}
