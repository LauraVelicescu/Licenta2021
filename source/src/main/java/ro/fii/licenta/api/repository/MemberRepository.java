package ro.fii.licenta.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;

import ro.fii.licenta.api.dao.Member;
import ro.fii.licenta.api.dao.NgoFunction;
import ro.fii.licenta.framework.PersistableEntityRepository;

public interface MemberRepository extends PersistableEntityRepository<Member, Long> {

	@Query("SELECT m FROM Member m WHERE m.user.id = ?1 and m.ngo.id = ?2")
	public Member findByUserAndNgo(Long userId, Long ngoId);

	public List<Member> findByNgo_Id(Long ngo);
	
	
	@Query("SELECT m.ngo.id FROM Member m WHERE m.user.id = ?1")
	public List<Long> findNgoIdsForUser(Long userId);
	
	public List<Member> findByFunction(NgoFunction ngoFunction);

}
