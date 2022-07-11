package lk.easycar.controller;

import lk.easycar.dto.BookingDTO;
import lk.easycar.entity.Booking;
import lk.easycar.repo.BookingRepo;
import lk.easycar.service.BookingService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class BookingController implements BookingService {

    @Autowired
    private BookingRepo repo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public void saveBooking(BookingDTO dto) {
        if (!repo.existsById(dto.getBookingId())) {
            repo.save(mapper.map(dto, Booking.class));
        } else {
            throw new RuntimeException("Already Exist Booking-ID!");
        }
    }

    @Override
    public void deleteBooking(String id) {

    }

    @Override
    public void updateBooking(BookingDTO dto) {

    }

    @Override
    public BookingDTO searchBooking(String id) {
        return null;
    }

    @Override
    public List<BookingDTO> getAllBookings() {
        return mapper.map(repo.findAll(), new TypeToken<List<BookingDTO>>() {
        }.getType());
    }
}
