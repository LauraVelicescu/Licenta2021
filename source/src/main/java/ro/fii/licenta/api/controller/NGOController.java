package ro.fii.licenta.api.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javassist.NotFoundException;
import ro.fii.licenta.api.dao.MemberRequest;
import ro.fii.licenta.api.dao.Ngo;
import ro.fii.licenta.api.dao.User;
import ro.fii.licenta.api.dto.MemberDTO;
import ro.fii.licenta.api.dto.MemberRequestDTO;
import ro.fii.licenta.api.dto.NgoDTO;
import ro.fii.licenta.api.service.MemberService;
import ro.fii.licenta.api.service.NGOService;
import ro.fii.licenta.api.service.UserService;

@RestController
@CrossOrigin
public class NGOController {

	@Autowired
	private NGOService ngoService;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private UserService userService;
	
	@Autowired
	private MemberService memberService;

	@PostMapping(value = "/createNGO")
	public ResponseEntity<?> createNGO(@RequestBody NgoDTO ngoDTO, HttpServletRequest request) throws Exception {

		User user = userService.getCurrentUser(request);

		Ngo ngo = ngoService.findByName(ngoDTO.getName());

		if (ngo != null) {
			throw new Exception(String.format("This name is already used by another NGO"));
		}

		ngo = this.modelMapper.map(ngoDTO, Ngo.class);
		ngo.setAdmin(user);
		ngo = this.ngoService.save(ngo);
//		modelMapper.getConfiguration().setSkipNullEnabled(true);
//		modelMapper.map(ngoDTO, ngo);
//		modelMapper.getConfiguration().setSkipNullEnabled(false);

		return new ResponseEntity<>(modelMapper.map(ngo, NgoDTO.class), HttpStatus.OK);

	}

	@PostMapping(value = "/updateNGO")
	public ResponseEntity<?> updateNGO(@RequestBody NgoDTO ngoDTO, HttpServletRequest request) throws Exception {
		Ngo ngo = ngoService.findByName(ngoDTO.getName());

		if (ngo != null) {
			new NotFoundException(String.format("NGO with name %s was not found", ngoDTO.getName()));
		}

		modelMapper.getConfiguration().setSkipNullEnabled(true);
		modelMapper.map(ngoDTO, ngo);
		modelMapper.getConfiguration().setSkipNullEnabled(false);
		return new ResponseEntity<>(modelMapper.map(ngoService.save(ngo), NgoDTO.class), HttpStatus.OK);

	}

	@PostMapping(value = "/deleteNGO")
	public void deleteNGO(@RequestBody List<NgoDTO> ngoDTO, HttpServletRequest request) throws Exception {
		ngoService.deleteNGOs(ngoDTO);
	}

	@GetMapping(value = "/getNGO")
	public ResponseEntity<?> getNGO(HttpServletRequest request) {
		return null;

	}

	@GetMapping(value = "/findNGOs")
	public ResponseEntity<List<NgoDTO>> findNGOs(@RequestParam(name = "page", required = false) Integer page,
			@RequestParam(name = "pageNo", required = false) Integer pageNo, HttpServletRequest request) {
		List<NgoDTO> ngos = new ArrayList<NgoDTO>();
		User currentUser = userService.getCurrentUser(request);
		ngoService.findAllNgosByAdmin(page, pageNo, currentUser).forEach(e -> {
			ngos.add(modelMapper.map(e, NgoDTO.class));
		});
		return ResponseEntity.ok(ngos);
	}

	@GetMapping(value = "/findNGOs/count")
	public ResponseEntity<Integer> findNGOsCount(HttpServletRequest request) {
		User currentUser = userService.getCurrentUser(request);
		return ResponseEntity.ok(ngoService.findAllNgosByAdmin(null, null, currentUser).size());
	}

	@PostMapping(value = "/addMembers")
	public ResponseEntity<List<String>> addMembers(@RequestBody List<MemberDTO> members) {
		return ResponseEntity.ok(ngoService.addMembers(members));
	}

	@GetMapping(value = "/getNgoRequests/number/{ngoId}")
	public ResponseEntity<Integer> getNgoRequestsNumber(@PathVariable(value = "ngoId") Long ngoId) {
		return ResponseEntity.ok(ngoService.findAllMemberRequestsByNgo(null, null, ngoId).size());
	}

	@GetMapping(value = "/getNgoRequests/{ngoId}")
	public ResponseEntity<List<MemberRequestDTO>> getNgoRequests(@PathVariable(value = "ngoId") Long ngoId,
			@RequestParam(name = "page", required = false) Integer page,
			@RequestParam(name = "pageNo", required = false) Integer pageNo) {
		List<MemberRequest> memberRequests = ngoService.findAllMemberRequestsByNgo(pageNo, pageNo, ngoId);
		List<MemberRequestDTO> memberRequestDTOs = new ArrayList<MemberRequestDTO>();
		for (MemberRequest mr : memberRequests) {
			memberRequestDTOs.add(modelMapper.map(mr, MemberRequestDTO.class));
		}
		return ResponseEntity.ok(memberRequestDTOs);
	}

	@PostMapping(value = "/saveNgoRequestStatus/{status}")
	public void getNgoRequests(@PathVariable(value = "status") Integer status,
			@RequestBody List<MemberRequestDTO> memberRequestDTOs) {
		ngoService.saveMember(memberRequestDTOs, status);
	}
	
	
	@GetMapping(value = "/findNGOsNotMemberOf")
	public ResponseEntity<List<NgoDTO>> findNGOsNotMemberOf(@RequestParam(name = "page", required = false) Integer page,
			@RequestParam(name = "pageNo", required = false) Integer pageNo, HttpServletRequest request) {
		List<NgoDTO> ngos = new ArrayList<NgoDTO>();
		User currentUser = userService.getCurrentUser(request);
		ngoService.findNgosNotMemberOf(page, pageNo, currentUser).forEach(e -> {
			ngos.add(modelMapper.map(e, NgoDTO.class));
		});
		return ResponseEntity.ok(ngos);
	}

	@GetMapping(value = "/findNGOsNotMemberOf/count")
	public ResponseEntity<Integer> findNGOsNotMemberOfCount(HttpServletRequest request) {
		User currentUser = userService.getCurrentUser(request);
		return ResponseEntity.ok(ngoService.findNgosNotMemberOf(null, null, currentUser).size());
	}
	
	@GetMapping(value = "/findMyNGOs")
	public ResponseEntity<List<NgoDTO>> findUserNGOs(HttpServletRequest request){
		User currentUser = userService.getCurrentUser(request);
		List<NgoDTO> ngos = new ArrayList<NgoDTO>();
		List<Long> ngoIds = memberService.findNgoByUser(currentUser.getId());
		for(Long id : ngoIds) {
			ngos.add(modelMapper.map(ngoService.findById(id), NgoDTO.class));
		}
		return ResponseEntity.ok(ngos);
	}

}
