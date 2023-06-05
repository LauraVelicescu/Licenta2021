package ro.fii.licenta.api.service;

import java.util.List;

import ro.fii.licenta.api.dao.Member;
import ro.fii.licenta.api.dao.MemberRequest;
import ro.fii.licenta.api.dao.Ngo;
import ro.fii.licenta.api.dao.NgoFunction;
import ro.fii.licenta.api.dao.User;
import ro.fii.licenta.api.dto.MemberDTO;
import ro.fii.licenta.api.dto.MemberRequestDTO;
import ro.fii.licenta.api.dto.NgoDTO;

public interface NGOService {

	Ngo findByName(String name);

	Ngo findByAcronym(String acronym);

	Ngo findById(Long id);

	void deleteById(Long id);

	Ngo save(Ngo ngo);

	List<Ngo> findAllNgosByAdmin(Integer pageNo, Integer pageSize, User user);
	
	List<Ngo> findAllNgos(Integer pageNo, Integer pageSize);

	List<String> deleteNGOs(List<NgoDTO> ngosDtos);

	List<String> addMembers(List<MemberDTO> members);

	List<MemberRequest> findAllMemberRequestsByNgo(Integer pageNo, Integer pageSize, Long ngoId);

	List<Member> saveMember(List<MemberRequestDTO> memberRequestDTOs, int status);

	List<Ngo> findNgosNotMemberOf(Integer pageNo, Integer pageSize, User user);

	List<NgoFunction> findAllNgoFunctions(Integer pageNo, Integer pageSize, Long ngoId);

	List<String> deleteNGOFunctions(List<NgoFunction> ngoFunctions);

	NgoFunction save(NgoFunction ngoFunction);

	NgoFunction findNgoFunctionById(Long id);

}
