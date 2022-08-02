package lk.easycar.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ReportDTO {
    private String bookingDate;
    private String leavingDate;
    private String returnDate;
    private double payment;
    private double lossDamageFee;
    private double rentalFee;
}
