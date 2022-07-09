package lk.easycar.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DriverDTO {
    private String driverID;
    private String name;
    private String address;
    private String nic;
    private String email;
    private String password;
    private String contact;
    private String age;
    private double salary;
    private String status;
}
