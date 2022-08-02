package lk.easycar.repo;

import lk.easycar.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReportRepo extends JpaRepository<Report, String> {

    @Query(value = "SELECT bookingDate, leavingDate, returnDate, SUM(payment), SUM(lossDamageFee), SUM(rentalFee) FROM booking GROUP BY bookingDate;", nativeQuery = true)
    List<Report> getDailyIncome();
}
