package ro.fii.licenta.api.dto;

import ro.fii.licenta.framework.PersistableEntity;

public class UserDTO extends PersistableEntity {

    private static final long serialVersionUID = 1L;

    protected Long id;

    protected String username;

    protected String password;

    protected boolean blocked;

    protected int failAttemtps;


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isBlocked() {
        return blocked;
    }

    public void setBlocked(boolean blocked) {
        this.blocked = blocked;
    }

    public int getFailAttemtps() {
        return failAttemtps;
    }

    public void setFailAttemtps(int failAttemtps) {
        this.failAttemtps = failAttemtps;
    }

}

