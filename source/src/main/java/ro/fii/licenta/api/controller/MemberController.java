package ro.fii.licenta.api.controller;

import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ro.fii.licenta.api.dao.Member;
import ro.fii.licenta.api.dto.MemberDTO;
import ro.fii.licenta.api.exception.NotFoundException;
import ro.fii.licenta.api.service.MemberService;

@RestController
@CrossOrigin
@RequestMapping("/member")
public class MemberController {

	private MemberService memberService;

	private ModelMapper modelMapper;

	@Autowired
	public MemberController(MemberService memberService, ModelMapper modelMapper) {
		super();
		this.memberService = memberService;
		this.modelMapper = modelMapper;
	}

	@PostMapping
	public ResponseEntity<MemberDTO> create(@RequestBody MemberDTO memberDto, HttpServletRequest request) {

		Member member = this.memberService.save(this.modelMapper.map(memberDto, Member.class));

		return ResponseEntity.ok(this.modelMapper.map(member, MemberDTO.class));
	}

	@PutMapping("/{id}")
	public ResponseEntity<MemberDTO> update(@PathVariable Long id, @RequestBody MemberDTO memberDTO) throws Exception {

		Member member = memberService.findById(id);

		if (member == null) {
			throw new NotFoundException(String.format("member with id %s was not found", id));
		} else {
			return ResponseEntity.ok(this.modelMapper
					.map(this.memberService.save(this.modelMapper.map(memberDTO, Member.class)), MemberDTO.class));
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		memberService.deleteById(id);
		return ResponseEntity.noContent().build();
	}

	@DeleteMapping(value = "/ids")
	public ResponseEntity<Void> deleteMembers(@RequestParam List<Long> ids) throws Exception {
		for (Long id : ids) {
			this.memberService.deleteById(id);
		}
		return ResponseEntity.noContent().build();
	}

	@GetMapping(value = "/{ngoId}")
	public ResponseEntity<List<MemberDTO>> getMembersByNgo(@PathVariable(value = "ngoId") Long ngoId) {
		List<Member> members = memberService.findMembersByNgoId(ngoId);
		return ResponseEntity.ok(members.stream().map(m -> {
			return this.modelMapper.map(m, MemberDTO.class);
		}).collect(Collectors.toList()));

	}

}
