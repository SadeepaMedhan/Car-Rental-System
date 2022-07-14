package lk.easycar.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDTO {
    private String cusID;
    private String cusName;
    private String cusEmail;
    private String cusPassword;
    private String cusNIC;
    private String cusDrivingLicenseNo;
    private String cusAddress;
    private String cusContactNo;
}
