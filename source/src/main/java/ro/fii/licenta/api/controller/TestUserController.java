package ro.fii.licenta.api.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ro.fii.licenta.api.dao.User;

@RestController
@RequestMapping("/user-test")
public class TestUserController extends GenericRestController<User> {

    public TestUserController() {
        super();
    }
}