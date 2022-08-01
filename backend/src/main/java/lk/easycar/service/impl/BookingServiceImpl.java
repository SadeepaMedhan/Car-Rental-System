package lk.easycar.service.impl;

import lk.easycar.dto.BookingDTO;
import lk.easycar.entity.Booking;
import lk.easycar.entity.Customer;
import lk.easycar.entity.Driver;
import lk.easycar.entity.Vehicle;
import lk.easycar.repo.BookingRepo;
import lk.easycar.repo.DriverRepo;
import lk.easycar.repo.VehicleRepo;
import lk.easycar.service.BookingService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepo bookingRepo;

    @Autowired
    private VehicleRepo vehicleRepo;

    @Autowired
    private DriverRepo driverRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public void saveBooking(BookingDTO bookingData) {
        bookingData.setBookingId(getNewBookingId());
        if (!bookingRepo.existsById(bookingData.getBookingId())) {
            bookingRepo.save(mapper.map(bookingData, Booking.class));

            if (bookingData.getVehicle() == null) {
                throw new RuntimeException("No vehicle added the booking");
            }else {
                Vehicle vehicle = bookingData.getVehicle();
                vehicle.setStatus("Selected");
                vehicleRepo.save(vehicle);

                if (bookingData.getDriver() != null){
                    Driver driver = bookingData.getDriver();
                }
            }

        } else {
            throw new RuntimeException("Booking Already Exist..!");
        }
    }

    @Override
    public void deleteBooking(String id) {
        if (bookingRepo.existsById(id)){
            bookingRepo.deleteById(id);
        }else{
            throw new RuntimeException("Please check the Booking ID, Not Found Booking!");
        }
    }

    @Override
    public void updateBooking(BookingDTO bookingData) {
        if (bookingRepo.existsById(bookingData.getBookingId())){
            bookingRepo.save(mapper.map(bookingData, Booking.class));
        }else{
            throw new RuntimeException("No Such Booking To Update..! Please Check the ID..!");
        }
    }

    @Override
    public BookingDTO searchBooking(String id) {
        return null;
    }

    @Override
    public List<BookingDTO> getAllBookings() {
        return mapper.map(bookingRepo.findAll(), new TypeToken<List<BookingDTO>>() {
        }.getType());
    }

    @Override
    public String getNewBookingId() {
        Booking lastBooking = bookingRepo.getLastBooking();
        if (lastBooking!=null){
            int tempId = Integer.parseInt(lastBooking.getBookingId().split("B")[1]);
            tempId = tempId+1;
            if(tempId <= 9){return "B00"+tempId;}
            else if(tempId <= 99){return "B0"+tempId;}
            else {return "B"+tempId;}
        }else{return "B001";}
    }


}
