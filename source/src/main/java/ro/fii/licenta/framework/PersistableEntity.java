package ro.fii.licenta.framework;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.Transient;

@MappedSuperclass
public class PersistableEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    protected Long id;

    protected PersistableEntity() {

    }

    protected PersistableEntity(Long id) {
        this.id = id;
    }

    @Transient
    public boolean isNew() {
        return id == null;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("[");
        sb.append(getClass().getSimpleName());
        sb.append("(");
        sb.append("id: ");
        sb.append(id != null ? String.valueOf(id) : " ?");
        sb.append(")");
        sb.append("]");
        return sb.toString();
    }

}

