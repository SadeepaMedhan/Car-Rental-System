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
public class Report {
    @Id
    private String bookingDate;
    private String leavingDate;
    private String returnDate;
    private String payment;
    private String lossDamageFee;
    private String rentalFee;
}
