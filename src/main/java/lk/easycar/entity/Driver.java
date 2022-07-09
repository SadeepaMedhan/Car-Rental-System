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
public class Driver {
    @Id
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
