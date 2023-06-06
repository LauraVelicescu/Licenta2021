package ro.fii.licenta.api.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ro.fii.licenta.api.dto.NgoPartnersTypeDTO;
import ro.fii.licenta.api.dto.NgoYearDTO;
import ro.fii.licenta.api.dto.PartnerDTO;

@RestController
@CrossOrigin
@RequestMapping("/financial")
public class FinancialController {

	public void createNgoYear(NgoYearDTO ngoYearDTO) {

	}

	public void deleteNgoYear(Long ngoYearId) {

	}

	public void updateNgoYear(NgoYearDTO ngoYearDTO) {

	}

	public List<NgoYearDTO> getNgoYear() {
		return null;
	}

	////////////////////////////////////////////////////

	public void createPartnerType(NgoPartnersTypeDTO ngoPartnersTypeDTO) {

	}

	public void deletePartnerType(Long partnerTypeId) {

	}

	public void updatePartnerType(NgoPartnersTypeDTO ngoPartnersTypeDTO) {

	}

	public List<NgoPartnersTypeDTO> getPartnerType() {
		return null;
	}

	////////////////////////////////////////////////////

	public void createPartner(PartnerDTO partnerDTO) {

	}

	public void deletePartner(Long partnerId) {

	}

	public void updatePartner(PartnerDTO partnerDTO) {

	}

	public List<NgoPartnersTypeDTO> getPartner() {
		return null;
	}
}
