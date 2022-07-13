package lk.easycar.service;

import lk.easycar.dto.AdminDTO;
import lk.easycar.dto.BookingDTO;

import java.util.List;

public interface AdminService {
    void saveAdmin(AdminDTO dto);
    void deleteAdmin(String id);
    void updateAdmin(AdminDTO dto);
    AdminDTO searchAdmin(String id);
    List<AdminDTO> getAllAdmins();

    List<BookingDTO> getRentalRequestList();
}
