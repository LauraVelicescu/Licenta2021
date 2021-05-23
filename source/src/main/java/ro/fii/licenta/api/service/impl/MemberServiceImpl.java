package ro.fii.licenta.api.service.impl;

import org.springframework.beans.factory.annotation.Autowired;

import ro.fii.licenta.api.dao.MemberRequest;
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
	
	

}
