package lk.easycar.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BookingDTO {
    private String bookingId;
    private String vehicleId;
    private String cusID;
    private String driverId;
    private String leavingDate;
    private String returnDate;
    private String location;
    private double payment;
    private double lossDamageFee;
    private double rentalFee;
    private String status;
}