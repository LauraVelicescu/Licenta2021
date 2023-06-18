package ro.fii.licenta.api.controller;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

import javax.servlet.http.HttpServletRequest;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javassist.NotFoundException;
import ro.fii.licenta.api.dao.MemberRequest;
import ro.fii.licenta.api.dao.User;
import ro.fii.licenta.api.dao.UserRole;
import ro.fii.licenta.api.dto.*;
import ro.fii.licenta.api.exception.BusinessException;
import ro.fii.licenta.api.exception.EntityConflictException;
import ro.fii.licenta.api.repository.RoleRepository;
import ro.fii.licenta.api.repository.UserRepository;
import ro.fii.licenta.api.repository.UserRoleRepoistory;
import ro.fii.licenta.api.service.MailingService;
import ro.fii.licenta.api.service.MemberService;
import ro.fii.licenta.api.service.UserService;

@RestController
@CrossOrigin
@RequestMapping(path = "/user")
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private MailingService mailingService;

	@Autowired
	private JavaMailSender mailSender;

	@Autowired
	private MemberService memberService;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private UserRoleRepoistory userRoleRepoistory;

	@GetMapping(value = "/getUser")
	public ResponseEntity<UserDTO> getUser(HttpServletRequest request) throws NotFoundException {

		User user = userService.getCurrentUser(request);

		if (user == null) {
			throw new NotFoundException(String.format("User ith email %s was not found", "acadele"));
		}
		return new ResponseEntity<>(modelMapper.map(user, UserDTO.class), HttpStatus.OK);

	}

	@GetMapping(value = "/getUser/image")
	public ResponseEntity<UserDTOImage> getUserImage(HttpServletRequest request) throws NotFoundException {

		User user = userService.getCurrentUser(request);

		if (user == null) {
			throw new NotFoundException(String.format("User ith email %s was not found", ""));
		}
		return ResponseEntity.ok(this.modelMapper.map(user, UserDTOImage.class));
	}


	@GetMapping(value = "/findUsers")
	public ResponseEntity<List<UserDTO>> findUsers(@RequestParam(name = "page", required = false) Integer page,
			@RequestParam(name = "pageNo", required = false) Integer pageNo) {
		List<UserDTO> users = new ArrayList<UserDTO>();
		userService.findAllUsers(page, pageNo).forEach(e -> {
			users.add(modelMapper.map(e, UserDTO.class));
		});
		return ResponseEntity.ok(users);
	}

	@GetMapping(value = "/findUsers/count")
	public ResponseEntity<Integer> findUsersCount() {
		return ResponseEntity.ok(userService.findAllUsers(null, null).size());
	}

	@PostMapping(value = "/updateUser")
	public ResponseEntity<?> updateUserInformation(@RequestBody UserDTO userDTO, HttpServletRequest request)
			throws Exception {
		User user = userService.findUserByEmail(userDTO.getEmailAddress());

		if (user != null && !user.getId().equals(userDTO.getId())) {
			throw new EntityConflictException(String.format("Already exists an user with email %s", userDTO.getEmailAddress()));
		}
		return new ResponseEntity<>(modelMapper.map(userService.save(this.modelMapper.map(userDTO, User.class)), UserDTO.class), HttpStatus.OK);

	}

	@PostMapping(value = "/uploadImage")
	public ResponseEntity<?> uploadImage(@RequestParam("imageFile") MultipartFile file, HttpServletRequest request)
			throws IOException {
		User user = userService.getCurrentUser(request);

		user.setProfilePicture(compressBytes(file.getBytes()));
		return new ResponseEntity<>(modelMapper.map(userService.save(user), UserDTOImage.class), HttpStatus.OK);

	}

	public static byte[] compressBytes(byte[] data) {
		Deflater deflater = new Deflater();
		deflater.setInput(data);
		deflater.finish();
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
		byte[] buffer = new byte[1024];
		while (!deflater.finished()) {
			int count = deflater.deflate(buffer);
			outputStream.write(buffer, 0, count);
		}
		try {
			outputStream.close();
		} catch (IOException e) {

		}
		return outputStream.toByteArray();

	}

	@PostMapping(value = "/delete")
	public ResponseEntity<List<String>> deleteUsers(@RequestBody List<UserDTO> usersDTO, HttpServletRequest request) {
		User user = userService.getCurrentUser(request);
		List<String> errors = this.userService.deleteUser(usersDTO, user);
		return ResponseEntity.ok(errors);
	}

	@PostMapping(value = "/block")
	public void blockUsers(@RequestBody List<UserDTO> usersDTO) throws BusinessException {
		userService.blockUsers(usersDTO);
	}

	@PostMapping(value = "/sendMassEmail")
	public void sendEmailToUsers(@RequestBody EmailPayloadDTO body) {
		for (UserDTO u : body.getUsers()) {
			User user = modelMapper.map(u, User.class);
			mailSender.send(mailingService.constructEmail(body.getSubject(), body.getBody(), user));
		}
	}

	@PostMapping(value = "/apply")
	public ResponseEntity<MemberRequestDTO> applyToNgo(@RequestBody MemberRequestDTO memberRequest,
			HttpServletRequest request) {
		User user = userService.getCurrentUser(request);
		memberRequest.setUser(modelMapper.map(user, UserDTO.class));
		memberRequest.setStatus(0);
		return new ResponseEntity<>(
				modelMapper.map(memberService.saveRequest(modelMapper.map(memberRequest, MemberRequest.class)),
						MemberRequestDTO.class),
				HttpStatus.OK);

	}

	@GetMapping(value = "/roles")
	public ResponseEntity<List<RoleDTO>> getRoles() {

		List<RoleDTO> roles = new ArrayList<RoleDTO>();
		this.roleRepository.findAll().forEach(e -> {
			roles.add(this.modelMapper.map(e, RoleDTO.class));
		});
		return ResponseEntity.ok(roles);
	}

	@GetMapping(value = "/roles/usersRole/{roleId}")
	public ResponseEntity<List<UserRoleDTO>> getUserRolesByRole(@PathVariable(value = "roleId") Long roleId) {

		List<UserRoleDTO> roles = new ArrayList<UserRoleDTO>();
		this.userRoleRepoistory.findByRole_Id(roleId).forEach(e -> {
			roles.add(this.modelMapper.map(e, UserRoleDTO.class));
		});
		return ResponseEntity.ok(roles);
	}

	@DeleteMapping(value = "/roles/usersRole/{userRoleId}")
	public void deleteUserRoles(@PathVariable(value = "userRoleId") Long roleId) {

		this.userRoleRepoistory.deleteById(roleId);
	}

	@PostMapping(value = "/roles/member")
	public void setRolesForMember(@RequestBody List<UserRoleDTO> userRoleDTOs, HttpServletRequest request) {

		userRoleDTOs.forEach(ur -> {
			UserRole userRole = this.userRoleRepoistory.findByUser_IdAndRole_IdAndNgo_Id(ur.getUser().getId(),
					ur.getRole().getId(), ur.getNgo() != null ? ur.getNgo().getId() : null);
			if (userRole == null) {
				this.userRoleRepoistory.save(this.modelMapper.map(ur, UserRole.class));
			}
		});
	}

}
