package lk.easycar.repo;

import lk.easycar.entity.Booking;
import lk.easycar.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepo extends JpaRepository<Booking, String> {

    List<Booking> findAllByCustomer(Customer customer);
}
