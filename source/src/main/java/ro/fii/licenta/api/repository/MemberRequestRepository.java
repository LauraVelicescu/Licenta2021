package ro.fii.licenta.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;

import ro.fii.licenta.api.dao.MemberRequest;
import ro.fii.licenta.framework.PersistableEntityRepository;

public interface MemberRequestRepository extends PersistableEntityRepository<MemberRequest, Long> {

	@Query("SELECT mr FROM MemberRequest mr WHERE mr.ngo.id=?1 AND mr.status=?2")
	public List<MemberRequest> findAllByNgoAndStatus(Long ngoId, int status);
}
