package ro.fii.licenta.api.dao;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import ro.fii.licenta.framework.NameDescriptionEntity;

@Entity
@Table(name = "component")
public class OrganizationalComponent extends NameDescriptionEntity {

	private static final long serialVersionUID = 1L;
	private boolean lead;
    @JsonBackReference
    private Ngo parentNgo;

    @Column(name = "isLead")
    public boolean isLead() {
        return lead;
    }

    public void setLead(boolean lead) {
        this.lead = lead;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_ngo_id")
    public Ngo getParentNgo() {
        return parentNgo;
    }

    public void setParentNgo(Ngo parentNgo) {
        this.parentNgo = parentNgo;
    }
}
