package lk.easycar.service;

import lk.easycar.dto.BookingDTO;
import lk.easycar.dto.DriverDTO;

import java.util.List;

public interface DriverService {
    void saveDriver(DriverDTO entity);
    void deleteDriver(String id);
    void updateDriver(DriverDTO entity);
    DriverDTO searchDriver(String id);
    List<DriverDTO> getAllDrivers();

    List<BookingDTO> getSchedule(String id);
}
