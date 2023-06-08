package ro.fii.licenta.api.dao;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.persistence.Table;

import ro.fii.licenta.framework.NameDescriptionEntity;

@Entity
@Table(name = "partner")
public class Partner extends NameDescriptionEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String phone;
	private String mail;
	private String address;
	private String representative;
	private byte[] logo;

	@Column(name = "phone")
	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	@Column(name = "mail")
	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	@Column(name = "address")
	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	@Column(name = "representative")
	public String getRepresentative() {
		return representative;
	}

	public void setRepresentative(String representative) {
		this.representative = representative;
	}


	@Lob
	@Column(name = "picture")
	public byte[] getLogo() {
		return logo;
	}

	public void setLogo(byte[] logo) {
		this.logo = logo;
	}
}
