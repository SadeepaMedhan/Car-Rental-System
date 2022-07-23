package lk.easycar.repo;

import lk.easycar.entity.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DriverRepo extends JpaRepository<Driver,String> {

    @Query(value = "SELECT * FROM `driver` ORDER BY driverID DESC LIMIT 1", nativeQuery = true)
    Driver getLastDriver();

}
