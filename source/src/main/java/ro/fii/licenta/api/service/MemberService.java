package ro.fii.licenta.api.service;

import java.util.List;

import ro.fii.licenta.api.dao.Member;
import ro.fii.licenta.api.dao.MemberRequest;

public interface MemberService {

	MemberRequest saveRequest(MemberRequest request);

	List<Long> findNgoByUser(Long userId);

	List<Member> findMembersByNgoId(Long id);

	Member save(Member member);

	Member findById(Long id);

	void deleteById(Long id);

}
