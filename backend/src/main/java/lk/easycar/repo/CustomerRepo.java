package lk.easycar.repo;

import lk.easycar.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CustomerRepo extends JpaRepository<Customer, String> {
    @Query(value = "SELECT * FROM `customer` ORDER BY cusID DESC LIMIT 1", nativeQuery = true)
    Customer getLastCustomer();

}
