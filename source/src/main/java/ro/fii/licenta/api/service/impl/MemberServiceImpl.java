package ro.fii.licenta.api.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import ro.fii.licenta.api.dao.Member;
import ro.fii.licenta.api.dao.MemberRequest;
import ro.fii.licenta.api.dao.Ngo;
import ro.fii.licenta.api.dao.User;
import ro.fii.licenta.api.repository.MemberRepository;
import ro.fii.licenta.api.repository.MemberRequestRepository;
import ro.fii.licenta.api.service.MemberService;

public class MemberServiceImpl implements MemberService {
	

	@Autowired
	MemberRepository memberRepository;
	
	@Autowired
	MemberRequestRepository memberRequestRepository;

	@Override
	public MemberRequest saveRequest(MemberRequest request) {
		return memberRequestRepository.save(request);
	}
	
	@Override
	public List<Long> findNgoByUser(Long userId) {
		return memberRepository.findNgoIdsForUser(userId);
	}

	@Override
	public List<Member> findAllMembersByNgo(Ngo ngo) {
		return memberRepository.findByNgo(ngo);
	}

	@Override
	public Member save(Member member) {
		return memberRepository.save(member);
	}
}
