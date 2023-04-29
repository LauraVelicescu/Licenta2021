package ro.fii.licenta.api.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
import ro.fii.licenta.api.dao.MemberRequest;
import ro.fii.licenta.api.dao.Ngo;
import ro.fii.licenta.api.dao.NgoFunction;
import ro.fii.licenta.api.dao.User;
import ro.fii.licenta.api.dto.MemberDTO;
import ro.fii.licenta.api.dto.MemberRequestDTO;
import ro.fii.licenta.api.dto.NgoDTO;
import ro.fii.licenta.api.dto.NgoFunctionDTO;
import ro.fii.licenta.api.exception.EntityConflictException;
import ro.fii.licenta.api.exception.NotFoundException;
import ro.fii.licenta.api.service.MemberService;
import ro.fii.licenta.api.service.NGOService;
import ro.fii.licenta.api.service.UserService;

@RestController
@CrossOrigin
@RequestMapping("/ngo")
public class NGOController {

	private NGOService ngoService;

	private ModelMapper modelMapper;

	private UserService userService;

	private MemberService memberService;

	@Autowired
	public NGOController(NGOService ngoService, ModelMapper modelMapper, UserService userService,
			MemberService memberService) {
		super();
		this.ngoService = ngoService;
		this.modelMapper = modelMapper;
		this.userService = userService;
		this.memberService = memberService;
	}

	@PostMapping
	public ResponseEntity<NgoDTO> create(@RequestBody NgoDTO ngoDTO, HttpServletRequest request) {

		User user = userService.getCurrentUser(request);

		Ngo ngo = ngoService.findByName(ngoDTO.getName());

		if (ngo != null) {
			throw new EntityConflictException(String.format("This name is already used by another NGO"));
		}

		ngo = this.modelMapper.map(ngoDTO, Ngo.class);
		ngo.setAdmin(user);
		ngo = this.ngoService.save(ngo);

		return new ResponseEntity<NgoDTO>(modelMapper.map(ngo, NgoDTO.class), HttpStatus.OK);

	}

	@PutMapping("/{id}")
	public ResponseEntity<NgoDTO> updateNGO(@PathVariable Long id, @RequestBody NgoDTO ngoDTO,
			HttpServletRequest request) throws Exception {
		Ngo secondNgo = modelMapper.map(ngoDTO, Ngo.class);
		
		return new ResponseEntity<NgoDTO>(modelMapper.map(ngoService.save(secondNgo), NgoDTO.class), HttpStatus.OK);

	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		ngoService.deleteById(id);
		return ResponseEntity.noContent().build();
	}

	@DeleteMapping(value = "/ids")
	public ResponseEntity<Void> deleteNGOs(@RequestParam List<Long> ids) throws Exception {
		for (Long id : ids) {
			this.ngoService.deleteById(id);
		}
		return ResponseEntity.noContent().build();
	}

	@GetMapping("/{id}")
	public ResponseEntity<NgoDTO> getById(@PathVariable Long id) {
		Ngo ngo = this.ngoService.findById(id);
		if (ngo != null) {
			new ResponseEntity<>(modelMapper.map(ngo, NgoDTO.class), HttpStatus.OK);
		}
		return null;

	}

	@GetMapping(value = "/findNGOs")
	public ResponseEntity<List<NgoDTO>> findManagedNGOs(@RequestParam(name = "page", required = false) Integer page,
			@RequestParam(name = "pageNo", required = false) Integer pageNo, HttpServletRequest request) {
		List<NgoDTO> ngos = new ArrayList<NgoDTO>();
		User currentUser = userService.getCurrentUser(request);
		ngoService.findAllNgosByAdmin(page, pageNo, currentUser).forEach(e -> {
			ngos.add(modelMapper.map(e, NgoDTO.class));
		});
		return ResponseEntity.ok(ngos);
	}

	@GetMapping(value = "/findNGOs/count")
	public ResponseEntity<Integer> findManagedNGOsCount(HttpServletRequest request) {
		User currentUser = userService.getCurrentUser(request);
		return ResponseEntity.ok(ngoService.findAllNgosByAdmin(null, null, currentUser).size());
	}

	// TODO logic moved to member controller to remove when validated with frontend
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
	public ResponseEntity<List<NgoDTO>> findUserNGOs(HttpServletRequest request) {
		User currentUser = userService.getCurrentUser(request);
		List<NgoDTO> ngos = new ArrayList<NgoDTO>();
		List<Long> ngoIds = memberService.findNgoByUser(currentUser.getId());
		for (Long id : ngoIds) {
			ngos.add(modelMapper.map(ngoService.findById(id), NgoDTO.class));
		}
		return ResponseEntity.ok(ngos);
	}

	@GetMapping(value = "/findNgoFunctions/{ngoId}")
	public ResponseEntity<List<NgoFunctionDTO>> findNgoFunctions(
			@RequestParam(name = "page", required = false) Integer page,
			@RequestParam(name = "pageNo", required = false) Integer pageNo,
			@PathVariable(value = "ngoId") Long ngoId) {

		List<NgoFunctionDTO> ngoFunctionDtos = new ArrayList<NgoFunctionDTO>();
		List<NgoFunction> ngoFunctions = ngoService.findAllNgoFunctions(page, pageNo, ngoId);
		for (NgoFunction function : ngoFunctions) {
			ngoFunctionDtos.add(modelMapper.map(function, NgoFunctionDTO.class));
		}

		return ResponseEntity.ok(ngoFunctionDtos);
	}

	@GetMapping(value = "/findNgoFunctions/count/{ngoId}")
	public ResponseEntity<Integer> findNgoFunctionCount(@PathVariable(value = "ngoId") Long ngoId) {
		List<NgoFunction> ngoFunctions = ngoService.findAllNgoFunctions(null, null, ngoId);

		return ResponseEntity.ok(ngoFunctions.size());
	}

	@PostMapping(value = "/addNGOFunction/{ngoId}")
	public ResponseEntity<NgoFunctionDTO> addNgoFunction(@RequestBody NgoFunctionDTO ngoFunctionDto,
			@PathVariable(value = "ngoId") Long ngoId) {
		ngoFunctionDto.setNgoDTO(modelMapper.map(ngoService.findById(ngoId), NgoDTO.class));
		return ResponseEntity.ok(modelMapper.map(ngoService.save(modelMapper.map(ngoFunctionDto, NgoFunction.class)),
				NgoFunctionDTO.class));
	}

	@PostMapping(value = "/updateNGOFunction")
	public ResponseEntity<NgoFunctionDTO> updateNgoFunction(@RequestBody NgoFunctionDTO ngoFunctionDto) {

		NgoFunction dbFunction = ngoService.findNgoFunctionById(ngoFunctionDto.getId());

		if (dbFunction != null) {
			new NotFoundException(String.format("Function with name %s was not found", ngoFunctionDto.getName()));
		}

		modelMapper.getConfiguration().setSkipNullEnabled(true);
		modelMapper.map(ngoFunctionDto, dbFunction);
		modelMapper.getConfiguration().setSkipNullEnabled(false);

		return ResponseEntity.ok(modelMapper.map(ngoService.save(dbFunction), NgoFunctionDTO.class));
	}

	@PostMapping(value = "/deleteNGOFunction")
	public void deleteNGOFunction(@RequestBody List<NgoFunctionDTO> ngoFunctionsDTO, HttpServletRequest request)
			throws Exception {

		List<NgoFunction> ngoFunctions = new ArrayList<NgoFunction>();
		for (NgoFunctionDTO function : ngoFunctionsDTO)
			ngoFunctions.add(modelMapper.map(function, NgoFunction.class));

	}

	// TODO to be deleted once the logic is moved
//	@GetMapping(value = "/getNGOMembers/{ngoId}")
//	public ResponseEntity<List<MemberDTO>> getNGOMembers(@PathVariable(value = "ngoId") Long ngoId) {
//		Ngo ngo = ngoService.findById(ngoId);
//		List<Member> members = memberService.findAllMembersByNgo(ngo);
//		List<MemberDTO> membersDto = new ArrayList<MemberDTO>();
//		for (Member m : members) {
//			membersDto.add(modelMapper.map(m, MemberDTO.class));
//		}
//		return ResponseEntity.ok(membersDto);
//
//	}

	// TODO moved to controller member
	@PostMapping(value = "/setMemberFunction/{functionId}")
	public ResponseEntity<MemberDTO> setMemberFunction(@RequestBody MemberDTO memberDto,
			@PathVariable(value = "functionId") Long functionId) {

		memberDto.setFunction(modelMapper.map(ngoService.findNgoFunctionById(functionId), NgoFunctionDTO.class));
		return ResponseEntity
				.ok(modelMapper.map(memberService.save(modelMapper.map(memberDto, Member.class)), MemberDTO.class));

	}
}
