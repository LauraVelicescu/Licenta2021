package ro.fii.licenta.api.service;

import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.export.JRPdfExporter;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;
import ro.fii.licenta.framework.Report;

@Service
public class JasperService {

	private final DataSource dataSource;

	private final ResourceLoader resourceLoader;

	@Autowired
	public JasperService(DataSource dataSource, ResourceLoader resourceLoader) {
		this.dataSource = dataSource;
		this.resourceLoader = resourceLoader;
	}

	public void generateAndExportReport(Report report, Map<String, Object> parameters, FileOutputStream outputStream)
			throws JRException, IOException, SQLException {

		String reportPath = "reports/" + report.path + ".jasper";
		Resource jasperResource = resourceLoader.getResource("classpath:" + reportPath);
		String jasperFilePath = jasperResource.getFile().getAbsolutePath();
		Connection connection = dataSource.getConnection();

		// Fill the report with data from the JDBC connection
		JasperPrint jasperPrint = JasperFillManager.fillReport(jasperFilePath, parameters, connection);

		JRPdfExporter exporter = new JRPdfExporter();
		exporter.setExporterInput(new SimpleExporterInput(jasperPrint));
		exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(outputStream));
		exporter.exportReport();

		connection.close();
	}
}
