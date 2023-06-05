package ro.fii.licenta.api.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.sf.jasperreports.engine.JRException;
import ro.fii.licenta.api.service.JasperService;
import ro.fii.licenta.framework.Report;

@RestController
@CrossOrigin
@RequestMapping("/report")
public class ReportController {

	private final JasperService jasperService;

	@Autowired
	public ReportController(JasperService jasperService) {
		this.jasperService = jasperService;
	}

	@PostMapping("/export")
	public ResponseEntity<Resource> exportReport() {
		try {

			File outputFile = File.createTempFile("report", ".pdf");
			FileOutputStream outputStream = new FileOutputStream(outputFile);

			Map<String, Object> parameters = new HashMap<>();
			parameters.put("PROJECT_ID", Long.valueOf(14));
			jasperService.generateAndExportReport(Report.PROJECT_TEAM, parameters, outputStream);
			HttpHeaders headers = new HttpHeaders();
			headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=report.pdf");
			headers.setContentType(MediaType.APPLICATION_PDF);

			Resource resource = new FileSystemResource(outputFile);
			return new ResponseEntity<>(resource, headers, HttpStatus.OK);
		} catch (JRException | SQLException | IOException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

}
