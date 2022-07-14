package lk.easycar.dto;

import lk.easycar.entity.Customer;
import lk.easycar.entity.Driver;
import lk.easycar.entity.Vehicle;
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
    private String leavingDate;
    private String returnDate;
    private String location;
    private double payment;
    private double lossDamageFee;
    private double rentalFee;
    private String status;

    private Customer customer;
    private Vehicle vehicle;
    private Driver driver;

}
