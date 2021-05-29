package ro.fii.licenta.api.service;

import java.util.List;

import ro.fii.licenta.api.dao.Member;
import ro.fii.licenta.api.dao.MemberRequest;
import ro.fii.licenta.api.dao.Ngo;
import ro.fii.licenta.api.dao.User;


public interface MemberService {
	
	MemberRequest saveRequest (MemberRequest request);
	
	List<Long> findNgoByUser(Long userId);
	
	List<Member> findAllMembersByNgo(Ngo ngo);
	
	Member save(Member member);

}
