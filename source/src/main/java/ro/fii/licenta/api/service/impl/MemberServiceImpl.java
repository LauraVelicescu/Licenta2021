package ro.fii.licenta.api.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import ro.fii.licenta.api.dao.Member;
import ro.fii.licenta.api.dao.MemberRequest;
import ro.fii.licenta.api.dto.MemberRequestDTO;
import ro.fii.licenta.api.exception.EntityConflictException;
import ro.fii.licenta.api.exception.NotFoundException;
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
	public List<Member> findMembersByNgoId(Long ngoId) {
		return memberRepository.findByNgo_Id(ngoId);
	}

	@Override
	public Member save(Member member) {
		Member existingMember = memberRepository.findByUserAndNgo(member.getUser().getId(), member.getNgo().getId());
		if (existingMember != null && !existingMember.getId().equals(member.getId())) {
			throw new EntityConflictException("The user " + member.getUser().getEmailAddress()
					+ " is already in the NGO " + member.getNgo().getName());
		} else {
			return memberRepository.save(member);
		}
	}

	@Override
	public List<Member> saveMember(List<MemberRequestDTO> memberRequestDTOs, int status) {
		List<Member> members = new ArrayList<Member>();
		for (MemberRequestDTO mrd : memberRequestDTOs) {
			MemberRequest mr = memberRequestRepository.findById(mrd.getId()).orElse(null);
			if (mr != null) {
				mr.setStatus(status);
				memberRequestRepository.save(mr);
				if (status == 1) {
					Member m = new Member();
					m.setNgo(mr.getNgo());
					m.setUser(mr.getUser());
					m.setFunction(null);
					memberRepository.save(m);
					members.add(m);
				}
			}

		}
		return members;
	}

	@Override
	public Member findById(Long id) {
		return memberRepository.findById(id).get();
	}

	@Override
	public void deleteById(Long id) {
		if (this.memberRepository.existsById(id)) {
			this.memberRepository.deleteById(id);
		} else {
			throw new NotFoundException("Member with id " + id + " does not exist");
		}
	}

}
