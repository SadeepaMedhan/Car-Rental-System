package lk.easycar.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class Customer {
    @Id
    private String cusID;
    private String cusName;
    private String cusEmail;
    private String cusPassword;
    private String cusNIC;
    private String cusDrivingLicenseNo;
    private String cusAddress;
    private String cusContactNo;
    private String nicUrl;

}
