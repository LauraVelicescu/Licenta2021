package ro.fii.licenta.api.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ro.fii.licenta.api.dao.User;
import ro.fii.licenta.api.dto.LoginDTO;
import ro.fii.licenta.api.dto.UserDTO;
import ro.fii.licenta.api.repository.UserRepository;
import ro.fii.licenta.api.service.UserService;

@RestController
@RequestMapping(path = "/authentication")
public class SecurityController {

    @Resource(name = "authenticationManager")
    private AuthenticationManager authManager;

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private UserService userService;

    @Autowired
    private ModelMapper modelMapper;


    @PostMapping("/login")
    public String saveMessage(HttpServletRequest request, @RequestBody LoginDTO loginDTO) {
        User user = userRepository.findByUsername(loginDTO.getUsername());
        if (user == null) {
            return "Utilizator inexistent.";
        } else {
            if (!user.getPassword().equals(loginDTO.getPassword())) {
                return "Utilizator ori parola gresita.";
            } else {
                request.getSession().setAttribute("user", user);
            }
        }

        return request.getSession()
                .getAttribute("user").toString();
    }

    @GetMapping("/user")
    public String getUser(HttpServletRequest request) {
        request.getSession().getMaxInactiveInterval();
        return request.getSession().getAttribute("user").toString();
    }

    @PostMapping("/register")
    public UserDTO register(HttpServletRequest request, @RequestBody UserDTO userDto) {
        System.out.println(userDto);

        User user = this.modelMapper.map(userDto, User.class);
        //user = this.userRepository.save(user);

        return this.modelMapper.map(user, UserDTO.class);
    }

    @GetMapping("/logout")

    public String logout(HttpServletRequest request) {
        request.getSession().removeAttribute("user");
        return "";
    }
}

