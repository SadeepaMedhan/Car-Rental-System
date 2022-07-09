package lk.easycar.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class Booking {
    @Id
    private String bookingId;
    private String leavingDate;
    private String returnDate;
    private String location;
    private double payment;
    private double lossDamageFee;
    private double rentalFee;
    private String status;

    @ManyToOne(cascade = {CascadeType.REFRESH,CascadeType.DETACH})
    @JoinColumn(name = "cusID",referencedColumnName = "cusID",nullable = false)
    private Customer customer;

    @ManyToOne(cascade = {CascadeType.REFRESH,CascadeType.DETACH})
    @JoinColumn(name = "vehicleID",referencedColumnName = "vehicleId",nullable = false)
    private Vehicle vehicle;

    @ManyToOne(cascade = {CascadeType.REFRESH,CascadeType.DETACH})
    @JoinColumn(name = "driverID",referencedColumnName = "driverID")
    private Driver driver;

}
