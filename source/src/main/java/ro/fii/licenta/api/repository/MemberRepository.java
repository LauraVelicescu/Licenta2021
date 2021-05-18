package ro.fii.licenta.api.repository;

import java.util.List;

import ro.fii.licenta.api.dao.Member;
import ro.fii.licenta.api.dao.Ngo;
import ro.fii.licenta.api.dao.User;
import ro.fii.licenta.framework.PersistableEntityRepository;

public interface MemberRepository extends PersistableEntityRepository<Member, Long>{
	
	public Member findByUserAndNgo(User user, Ngo ngo);
	
	
	public List<Member> findByNgo(Ngo ngo);

}
