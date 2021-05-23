package ro.fii.licenta.api.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import ro.fii.licenta.api.dao.Member;
import ro.fii.licenta.api.dao.MemberRequest;
import ro.fii.licenta.api.dao.Ngo;
import ro.fii.licenta.api.dao.User;
import ro.fii.licenta.api.dto.MemberDTO;
import ro.fii.licenta.api.dto.MemberRequestDTO;
import ro.fii.licenta.api.dto.NgoDTO;
import ro.fii.licenta.api.repository.MemberRepository;
import ro.fii.licenta.api.repository.MemberRequestRepository;
import ro.fii.licenta.api.repository.NGORepository;
import ro.fii.licenta.api.service.NGOService;

public class NGOServiceImpl implements NGOService {

	@Autowired
	NGORepository ngoRepository;

	@Autowired
	MemberRepository memberRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private MemberRequestRepository memberRequestRepository;

	@Override
	public Ngo findByName(String name) {
		return ngoRepository.findByName(name);
	}

	@Override
	public Ngo findByAcronym(String acronym) {
		return ngoRepository.findByAcronym(acronym);
	}

	@Override
	public Ngo save(Ngo ngo) {
		return ngoRepository.save(ngo);
	}

	@Override
	public Ngo findById(int id) {
		return ngoRepository.findById(id);
	}

	@Override
	public List<Ngo> findAllNgosByAdmin(Integer pageNo, Integer pageSize, User user) {
		Pageable page = (pageNo != null && pageSize != null) ? PageRequest.of(pageNo, pageSize) : null;
		return page != null ? ngoRepository.findAll(new Specification<Ngo>() {

			private static final long serialVersionUID = 1L;

			@Override
			public Predicate toPredicate(Root<Ngo> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
				return criteriaBuilder.equal(root.get("admin"), user);
			}
		}, page).getContent() : ngoRepository.findAllByAdmin(user);
	}

	@Override
	public List<String> deleteNGOs(List<NgoDTO> ngosDtos) {
		List<String> list = new ArrayList<String>();
		for (NgoDTO n : ngosDtos) {
			Ngo ngo = ngoRepository.findById(n.getId()).get();
			ngoRepository.delete(ngo);
		}
		return list;
	}

	@Override
	public List<String> addMembers(List<MemberDTO> members) {
		List<String> errors = new ArrayList<String>();
		for (MemberDTO memberDTO : members) {
			Member member = memberRepository.findByUserAndNgo(memberDTO.getUser().getId(), memberDTO.getNgo().getId());
			if (member != null) {
				errors.add("Userul " + memberDTO.getUser().getEmailAddress() + " este deja in ONG ul "
						+ memberDTO.getNgo().getName());
			} else {
				member = modelMapper.map(memberDTO, Member.class);
				memberRepository.save(member);
			}
		}
		return errors;
	}

	@Override
	public List<MemberRequest> findAllMemberRequestsByNgo(Integer pageNo, Integer pageSize, Long ngoId) {
		Pageable page = (pageNo != null && pageSize != null) ? PageRequest.of(pageNo, pageSize) : null;
		return page != null ? memberRequestRepository.findAll(new Specification<MemberRequest>() {

			private static final long serialVersionUID = 1L;

			@Override
			public Predicate toPredicate(Root<MemberRequest> root, CriteriaQuery<?> query,
					CriteriaBuilder criteriaBuilder) {
				return criteriaBuilder.and(criteriaBuilder.equal(root.get("ngo").get("id"), ngoId),
						criteriaBuilder.equal(root.get("status"), 0));
			}
		}, page).getContent() : memberRequestRepository.findAllByNgoAndStatus(ngoId, 0);
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
					m.setFunction("-");
					memberRepository.save(m);
					members.add(m);
				}
			}

		}
		return members;
	}

}
