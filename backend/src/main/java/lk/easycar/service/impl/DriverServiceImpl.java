package lk.easycar.service.impl;

import lk.easycar.dto.BookingDTO;
import lk.easycar.dto.DriverDTO;
import lk.easycar.entity.Booking;
import lk.easycar.entity.Driver;
import lk.easycar.repo.BookingRepo;
import lk.easycar.repo.DriverRepo;
import lk.easycar.service.DriverService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class DriverServiceImpl implements DriverService {

    @Autowired
    private DriverRepo driverRepo;

    @Autowired
    private BookingRepo bookingRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public void saveDriver(DriverDTO dto) {
        if (!driverRepo.existsById(dto.getDriverID())) {
            driverRepo.save(mapper.map(dto, Driver.class));
        } else {
            throw new RuntimeException("Driver already exist!");
        }
    }

    @Override
    public void deleteDriver(String id) {
        if (driverRepo.existsById(id)) {
            driverRepo.deleteById(id);
        } else {
            throw new RuntimeException("Please check the Driver ID.. No Such Driver..!");
        }
    }

    @Override
    public void updateDriver(DriverDTO dto) {
        if (driverRepo.existsById(dto.getDriverID())) {
            driverRepo.save(mapper.map(dto, Driver.class));
        } else {
            throw new RuntimeException("No Such Driver To Update..! Please Check the ID..!");
        }
    }

    @Override
    public DriverDTO searchDriver(String id) {
        if (driverRepo.existsById(id)) {
            return mapper.map(driverRepo.findById(id).get(), DriverDTO.class);
        } else {
            throw new RuntimeException("No Driver For " + id + " ..!");
        }
    }

    @Override
    public List<DriverDTO> getAllDrivers() {
        return mapper.map(driverRepo.findAll(),
                new TypeToken<List<DriverDTO>>() {
                }.getType());
    }

    @Override
    public List<BookingDTO> getSchedule(String id) {
        if (driverRepo.existsById(id)) {
            List<Booking> schedule = new ArrayList<>();
            List<Booking> bookingList = bookingRepo.findAll();
            for (Booking booking : bookingList) {
                if (booking.getDriver().getDriverID().equals(id)) {
                    schedule.add(booking);
                }
            }
            return mapper.map(schedule, new TypeToken<List<BookingDTO>>() {
            }.getType());
        } else {
            throw new RuntimeException("No Driver For " + id + " ..!");
        }
    }

    @Override
    public String getNewDriverID() {
        Driver lastDriver = driverRepo.getLastDriver();
        if (lastDriver!=null){
            int tempId = Integer.parseInt(lastDriver.getDriverID().split("D")[1]);
            tempId = tempId+1;
            if(tempId <= 9){return "D00"+tempId;}
            else if(tempId <= 99){return "D0"+tempId;}
            else {return "D"+tempId;}
        }else{return "D001";}
    }

}
