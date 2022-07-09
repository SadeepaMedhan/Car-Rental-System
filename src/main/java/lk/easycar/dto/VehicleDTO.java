package lk.easycar.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class VehicleDTO {
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
