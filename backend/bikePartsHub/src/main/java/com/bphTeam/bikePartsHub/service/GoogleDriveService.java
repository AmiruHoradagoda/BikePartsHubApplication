package com.bphTeam.bikePartsHub.service;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.FileContent;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Value;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.security.GeneralSecurityException;
import java.util.Collections;

@Service
public class GoogleDriveService {

    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();

    @Value("${google.credentials.type}")
    private String type;

    @Value("${google.credentials.project_id}")
    private String projectId;

    @Value("${google.credentials.private_key_id}")
    private String privateKeyId;

    @Value("${google.credentials.private_key}")
    private String privateKey;

    @Value("${google.credentials.client_email}")
    private String clientEmail;

    @Value("${google.credentials.client_id}")
    private String clientId;

    @Value("${google.credentials.auth_uri}")
    private String authUri;

    @Value("${google.credentials.token_uri}")
    private String tokenUri;

    @Value("${google.credentials.auth_provider_x509_cert_url}")
    private String authProviderX509CertUrl;

    @Value("${google.credentials.client_x509_cert_url}")
    private String clientX509CertUrl;

    public String uploadImageToDrive(java.io.File file) throws GeneralSecurityException, IOException {
        String folderId = "1PGuBh8qr7yyYlQbA-j8hxDVqYWi8tcCq";
        Drive drive = createDriveService();

        com.google.api.services.drive.model.File fileMetaData = new com.google.api.services.drive.model.File();
        fileMetaData.setName(file.getName());
        fileMetaData.setParents(Collections.singletonList(folderId));

        FileContent mediaContent = new FileContent("image/jpeg", file);

        com.google.api.services.drive.model.File uploadedFile = drive.files().create(fileMetaData, mediaContent)
                .setFields("id").execute();
        String imageUrl = "https://drive.google.com/uc?export=view&id=" + uploadedFile.getId();
        return imageUrl;
    }

    public java.io.File convertMultiPartToFile(MultipartFile file) throws IOException {
        Path tempFile = Files.createTempFile("temp", file.getOriginalFilename());
        file.transferTo(tempFile);
        return tempFile.toFile();
    }

    private Drive createDriveService() throws GeneralSecurityException, IOException {
        String jsonContent = String.format(
                "{\n" +
                        "  \"type\": \"%s\",\n" +
                        "  \"project_id\": \"%s\",\n" +
                        "  \"private_key_id\": \"%s\",\n" +
                        "  \"private_key\": \"%s\",\n" +
                        "  \"client_email\": \"%s\",\n" +
                        "  \"client_id\": \"%s\",\n" +
                        "  \"auth_uri\": \"%s\",\n" +
                        "  \"token_uri\": \"%s\",\n" +
                        "  \"auth_provider_x509_cert_url\": \"%s\",\n" +
                        "  \"client_x509_cert_url\": \"%s\"\n" +
                        "}",
                type, projectId, privateKeyId, privateKey, clientEmail, clientId,
                authUri, tokenUri, authProviderX509CertUrl, clientX509CertUrl);

        GoogleCredential credential = GoogleCredential.fromStream(new ByteArrayInputStream(jsonContent.getBytes()))
                .createScoped(Collections.singleton(DriveScopes.DRIVE_FILE));

        return new Drive.Builder(GoogleNetHttpTransport.newTrustedTransport(), JSON_FACTORY, credential)
                .setApplicationName("Google Drive Image Upload")
                .build();
    }
}