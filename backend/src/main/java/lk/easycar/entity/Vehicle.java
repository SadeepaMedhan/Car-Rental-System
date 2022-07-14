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
public class Vehicle {
    @Id
    private String vehicleId;
    private String regNo;
    private String brand;
    private String type;
    private int noOfPassenger;
    private String transmissionType;
    private String fuelType;
    private double dailyRate;
    private double monthlyRate;
    private double freeMileageDay;
    private double freeMileageMonth;
    private double priceExtraKM;
    private String color;
    private double maintenanceMileage;
    private String status;

}
