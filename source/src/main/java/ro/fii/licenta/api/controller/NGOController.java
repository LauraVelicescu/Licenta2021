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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javassist.NotFoundException;
import ro.fii.licenta.api.dao.Ngo;
import ro.fii.licenta.api.dao.User;
import ro.fii.licenta.api.dto.MemberDTO;
import ro.fii.licenta.api.dto.NgoDTO;
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

}
