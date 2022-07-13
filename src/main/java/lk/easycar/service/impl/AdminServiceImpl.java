package lk.easycar.service.impl;

import lk.easycar.dto.AdminDTO;
import lk.easycar.dto.BookingDTO;
import lk.easycar.entity.Admin;
import lk.easycar.entity.Booking;
import lk.easycar.repo.AdminRepo;
import lk.easycar.repo.BookingRepo;
import lk.easycar.service.AdminService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepo repo;

    @Autowired
    private BookingRepo bookingRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public void saveAdmin(AdminDTO dto) {
        if (!repo.existsById(dto.getAdminID())) {
            repo.save(mapper.map(dto, Admin.class));
        } else {
            throw new RuntimeException("Admin Already Exist..!");
        }
    }

    @Override
    public void deleteAdmin(String id) {
        if (repo.existsById(id)){
            repo.deleteById(id);
        }else{
            throw new RuntimeException("Please check the Admin ID!");
        }
    }

    @Override
    public void updateAdmin(AdminDTO dto) {
        if (repo.existsById(dto.getAdminID())) {
            repo.save(mapper.map(dto, Admin.class));
        } else {
            throw new RuntimeException("Please Check the ID!");
        }
    }

    @Override
    public AdminDTO searchAdmin(String id) {
        if (repo.existsById(id)){
            return mapper.map(repo.findById(id).get(), AdminDTO.class);
        }else{
            throw new RuntimeException("No Admin For "+id+" ..!");
        }
    }

    @Override
    public List<AdminDTO> getAllAdmins() {
        return mapper.map(repo.findAll(), new TypeToken<List<AdminDTO>>() {
        }.getType());
    }


    @Override
    public List<BookingDTO> getRentalRequestList() {
        List<Booking> requestList = new ArrayList<>();
        List<Booking> bookingList = bookingRepo.findAll();
        for (Booking booking : bookingList) {
            if (booking.getStatus().equals("Checking")){
                requestList.add(booking);
            }
        }
        return mapper.map(requestList, new TypeToken<List<BookingDTO>>() {
        }.getType());
    }

}
